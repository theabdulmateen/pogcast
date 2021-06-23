import { useInfiniteQuery, useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useSearch = (searchText, searchType = 'episode', enabled) => {
	return useInfiniteQuery(
		[ 'search', searchText ],
		async ({ pageParam = 0 }) => {
			const results = await api.searchCatalogs(searchText, searchType, pageParam)
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
