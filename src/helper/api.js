import axios from 'axios'
import { db, auth } from '../firebase'

import { generateEpQueue } from './generateEpQueue'

export default class Api {
	constructor() {
		this.apiKey = process.env.REACT_APP_API_KEY
		this.apiURL = process.env.REACT_APP_API_ENDPOINT
		this.client = axios.create({
			baseURL: this.apiURL,
			timeout: 31000,
			headers: {
				'X-ListenAPI-Key': this.apiKey,
			},
		})
	}

	getRandomEpisode = async () => {
		try {
			const resp = await this.client.get('/just_listen')
			const ep = resp.data

			const res = await this.client.get('/podcasts/' + ep.podcast.id)
			const epQueue = generateEpQueue(res.data.episodes, ep.podcast.title)

			return {
				id: ep.id,
				title: ep.title,
				src: ep.audio,
				thumbnail: ep.thumbnail,
				epQueue: epQueue.slice(1),
				showName: ep.podcast.title,
			}
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	getGenres = async topOnly => {
		try {
			const result = await this.client.get(`/genres?top_level_only=${topOnly}`)
			return result.data.genres
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	getEpisodeById = async epId => {
		try {
			const resp = await this.client.get('/episodes/' + epId)
			const ep = resp.data
			return {
				title: ep.title,
				src: ep.audio,
				thumbnail: ep.thumbnail,
				showName: ep.podcast.title,
			}
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	getPogcastById = async (pogId, nextEpisodePubDate) => {
		try {
			let result
			if (nextEpisodePubDate) {
				result = await this.client.get(
					'/podcasts/' + pogId + '?next_episode_pub_date=' + nextEpisodePubDate
				)
			} else {
				result = await this.client.get('/podcasts/' + pogId)
			}

			if (!result) {
				throw new Error('Invalid request')
			}
			const pog = result.data
			return pog
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	getPogcastIdFromEpId = async epId => {
		try {
			const result = await this.client.get('/episodes/' + epId)
			const ep = result.data
			return ep.podcast.id
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	getBestPogcasts = async genreId => {
		try {
			const result = await this.client.get(`/best_podcasts?genre_id=${genreId}`)
			return result.data.podcasts
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	searchCatalogs = async (searchTerm, searchType = 'episode', filter = {}) => {
		try {
			let options = `?q=${searchTerm}&type=${searchType}`
			for (const key in Object.keys(filter)) {
				options += `&${key}=${filter[key]}`
			}

			const result = await this.client.get('/search' + options)
			return result.data.results
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.error(err)
				throw err
			}
		}
	}

	toggleSavePogcast = async pogId => {
		try {
			if (!auth.currentUser) {
				throw new Error('User not logged in')
			}
			const userFeedsRef = db.collection('feeds').doc(auth.currentUser.uid)

			const doc = await userFeedsRef.get()
			if (doc.exists) {
				const userFeeds = doc.data()
				console.log('Document data:', userFeeds)

				const pogcasts = userFeeds.pogcasts
				const isSaved = pogcasts[pogId]
				if (isSaved) {
					await userFeedsRef.set(
						{
							pogcasts: {
								[pogId]: !isSaved,
							},
						},
						{ merge: true }
					)
					return !isSaved
				}
			}

			console.log('doc created')
			await userFeedsRef.set(
				{
					pogcasts: {
						[pogId]: true,
					},
				},
				{ merge: true }
			)
			return true
		} catch (err) {
			if (err.response) {
				console.error(err.response.data)
				throw err.response.data
			} else if (err.request) {
				console.error(err.request.data)
				throw err.request.data
			} else {
				console.log('Error getting document:', err)
				console.error(err)
				throw err
			}
		}
	}
}
