import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useGenres = options => {
	const { topOnly } = options || { topOnly: 1 }
	return useQuery('genres', () => api.getGenres(topOnly))
}
