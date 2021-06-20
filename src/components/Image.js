import React, { useRef, useState } from 'react'

import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function Image({ source, alt }) {
	const [ isVisible, setIsVisible ] = useState(false)
	const ref = useRef()

	useIntersectionObserver({
		target: ref,
		onIntersect: ([ { isIntersecting } ], observer) => {
			if (isIntersecting) {
				setIsVisible(true)
				if (observer && ref.current) {
					observer.unobserve(ref.current)
				}
			}
		},
	})

	return (
		<div style={{ position: 'relative' }} ref={ref}>
			{isVisible ? <img src={source} alt={alt} /> : <div style={{ backgroundColor: 'gray' }} />}
		</div>
	)
}
