import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useLanguages = () => {
	return useQuery('languages', () => api.getLanguages())
}
