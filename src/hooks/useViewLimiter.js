import { useEffect, useState } from 'react'
import { useViewport } from './useViewport'

export const useViewLimiter = () => {
	const [limit, setLimit] = useState(7)
	const [width] = useViewport()

	useEffect(() => {
		let limit

		if (width > 1760) {
			limit = 8
		}
		if (width >= 1200 && width < 1760) {
			limit = 7
		}
		if (width >= 900 && width < 1200) {
			limit = 5
		}
		if (width >= 600 && width < 900) {
			limit = 4
		}
		if (width < 600) {
			limit = 2
		}

		setLimit(limit)
	}, [width])

	return limit
}
