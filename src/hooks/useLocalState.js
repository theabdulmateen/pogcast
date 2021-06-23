import { useState } from 'react'

export const useLocalState = (key, initialState) => {
	const [ state, setState ] = useState(() => {
		try {
			const stored = window.localStorage.getItem(key)
			return stored ? JSON.parse(stored) : initialState
		} catch (err) {
			return initialState
		}
	})

	const setValue = (value) => {
		const valueToStore = value instanceof Function ? value(state) : value
		setState(valueToStore)
		window.localStorage.setItem(key, JSON.stringify(valueToStore))
	}

	return [ state, setValue ]
}
