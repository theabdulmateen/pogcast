import axios from 'axios'
import { db, auth, provider, firebase } from '../firebase'

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
			const episodes = res.data.episodes.map(epInList => ({
				epId: epInList.id,
				title: epInList.title,
				thumbnail: epInList.thumbnail,
				showName: ep.podcast.title,
			}))
			// console.log(episodes)
			// console.log('this epId: ', ep.id)

			return {
				id: ep.id,
				title: ep.title,
				src: ep.audio,
				thumbnail: ep.thumbnail,
				epQueue: episodes.slice(1),
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

	getPogcastById = async pogId => {
		try {
			const resp = await this.client.get('/podcasts/' + pogId)
			const pog = resp.data
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
			const resp = await this.client.get('/episodes/' + epId)
			const ep = resp.data
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

	searchCatalogs = async (searchTerm, searchType = 'episode', filter = {}) => {
		try {
			let options = `?q=${searchTerm}&type=${searchType}`
			for (const key in Object.keys(filter)) {
				options += `&${key}=${filter[key]}`
			}

			const resp = await this.client.get('/search' + options)
			return resp.data.results
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
