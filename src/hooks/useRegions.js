import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useRegions = () => {
	return useQuery('regions', () => api.getRegions())
}
