import axios from 'axios'

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
}
