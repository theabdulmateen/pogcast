import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const usePogcast = pogId => {
	return useQuery(['pogcast', pogId], () => api.getPogcastById(pogId))
}
