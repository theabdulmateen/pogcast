import { useQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const useSearch = (searchText, enabled) => {
	return useQuery(
		['search', searchText],
		() => {
			api.searchCatalogs(searchText).then(results => {
				let pogs = []
				results.forEach(res => {
					const podcast = {
						id: res.id,
						title: res.title_original,
						thumbnail: res.thumbnail,
						description: res.description_original,
					}

					pogs = [...pogs, podcast]
				})
				return pogs
			})
		},
		{ enabled }
	)
}
