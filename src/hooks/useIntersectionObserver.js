import { useEffect } from 'react'

export const useIntersectionObserver = ({
	target,
	onIntersect,
	rootMargin = '0px',
	threshold = 0.1,
}) => {
	useEffect(() => {
		const observer = new IntersectionObserver(onIntersect, { rootMargin, threshold })
		const entity = target.current
		observer.observe(entity)

		return () => {
			observer.unobserve(entity)
		}
	})
}
