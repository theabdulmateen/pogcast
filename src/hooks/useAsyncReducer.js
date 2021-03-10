import { useState } from 'react'

export const useAsyncReducer = (reducer, initialState = null) => {
	const [state, setState] = useState(initialState)

	const dispatch = async action => {
		const result = reducer(action, initialState)
		if (typeof result.then === 'function') {
			try {
				const newState = await result
				setState(newState)
			} catch (err) {
				setState({ ...result, error: err })
			}
		} else {
			setState(result)
		}
	}

	return [state, dispatch]
}
