import { useInfiniteQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useSearch = (searchText, filters, enabled) => {
	return useInfiniteQuery(
		[ 'search', searchText + JSON.stringify(filters) ],
		async ({ pageParam = 0 }) => {
			const results = await api.searchCatalogs(searchText, filters, pageParam)
			let pogs = []
			results.forEach((res) => {
				const podcast = {
					id: res.id,
					title: res.title_original,
					thumbnail: res.thumbnail,
					description: res.description_original,
				}
				pogs = [ ...pogs, podcast ]
			})
			return pogs
		},
		{
			getNextPageParam: (lastPage) => {
				return lastPage.next_offset
			},
			enabled,
		},
	)
}
