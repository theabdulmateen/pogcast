import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useBestPogcast = genreId => {
	return useQuery(['bestPodcast', genreId], () => api.getBestPogcast(genreId))
}
