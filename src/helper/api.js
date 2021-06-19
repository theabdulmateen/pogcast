import axios from 'axios'
import { db, auth, firebase } from '../firebase'

import { generateEpQueue } from './generateEpQueue'

export default class Api {
	constructor() {
		// this.apiKey = process.env.REACT_APP_API_KEY
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
				pogId: ep.podcast.id,
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
			if (localStorage.getItem('genres')) {
				return JSON.parse(localStorage.getItem('genres'))
			}
			const result = await this.client.get(`/genres?top_level_only=${topOnly}`)
			const genres = result.data.genres
			localStorage.setItem('genres', JSON.stringify(genres))
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
			if (localStorage.getItem('episode-' + epId)) {
				return JSON.parse(localStorage.getItem('episode-' + epId))
			}
			const resp = await this.client.get('/episodes/' + epId)
			const ep = resp.data

			const episode = {
				pogId: ep.podcast.id,
				title: ep.title,
				src: ep.audio,
				thumbnail: ep.thumbnail,
				showName: ep.podcast.title,
			}

			localStorage.setItem('episode-' + epId, JSON.stringify(episode))
			return {
				pogId: ep.podcast.id,
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
			if (localStorage.getItem('pogcast-' + pogId)) {
				return JSON.parse(localStorage.getItem('pogcast-' + pogId))
			}
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
			localStorage.setItem('pogcast-' + pogId, JSON.stringify(pog))
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
			if (localStorage.getItem('pogcastIdFromEpId-' + epId)) {
				return JSON.parse(localStorage.getItem('pogcastIdFromEpId-' + epId))
			}
			const result = await this.client.get('/episodes/' + epId)
			const ep = result.data
			localStorage.setItem('pogcastIdFromEpId-' + epId, JSON.stringify(ep.podcast.id))
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
			if (localStorage.getItem('bestPodcasts-' + genreId)) {
				return JSON.parse(localStorage.getItem('bestPodcasts-' + genreId))
			}
			const result = await this.client.get(`/best_podcasts?genre_id=${genreId}`)
			localStorage.setItem('bestPodcasts-' + genreId, JSON.stringify(result.data.podcasts))
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
				throw new Error('User is not logged in')
			}
			const userFeedsRef = db.collection('feeds').doc(auth.currentUser.uid)

			const doc = await userFeedsRef.get()
			if (doc.exists) {
				const userFeeds = doc.data()
				// console.log('Document data:', userFeeds)

				const saved = userFeeds.saved
				const isSaved = saved[pogId]
				await userFeedsRef.set(
					{
						saved: {
							[pogId]: !isSaved,
						},
					},
					{ merge: true }
				)
				return !isSaved
			}

			// console.log('doc created')
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

	markPogress = async (pogId, epId, seek, completed = false) => {
		try {
			if (!auth.currentUser) {
				throw new Error('User is not logged in')
			}
			const episodeRef = db.collection('episodes').doc(auth.currentUser.uid)
			await episodeRef.set(
				{
					pogId,
					epId,
					seek,
					completed,
				},
				{ merge: true }
			)
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
