import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useBestPogcasts = genreId => {
	return useQuery(['bestPodcasts', genreId], () => api.getBestPogcasts(genreId))
}
