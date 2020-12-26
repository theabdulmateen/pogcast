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
			console.error(err)
			throw err
		}
	}

	getPogcastById = async pogId => {
		try {
			const resp = await this.client.get('/podcasts/' + pogId)
			const pog = resp.data
			return pog
		} catch (err) {
			console.error(err)
			throw err
		}
	}
}
