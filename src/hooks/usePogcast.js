import { useInfiniteQuery } from 'react-query'

import Api from '../helper/api'
const api = new Api()

export const usePogcast = (pogId) => {
	return useInfiniteQuery([ 'pogcast', pogId ], ({ pageParam = null }) => api.getPogcastById(pogId, pageParam), {
		getNextPageParam: (lastPage, pages) => {
			return lastPage.next_episode_pub_date
		},
	})
}
