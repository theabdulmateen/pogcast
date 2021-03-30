import React, { useRef, useState } from 'react'

import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Image({ source, alt }) {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef()

	useIntersectionObserver({
		target: ref,
		onIntersect: ([{ isIntersecting }], observer) => {
			if (isIntersecting) {
				setIsVisible(true)
				observer.unobserve(ref.current)
			}
		},
	})

	return (
		<div style={{ paddingBottom: '100%', position: 'relative' }} ref={ref}>
			{isVisible ? (
				<img src={source} alt={alt} style={{ position: 'absolute' }} />
			) : (
				<div style={{ backgroundColor: 'gray' }} />
			)}
		</div>
	)
}
