import { createContext, useReducer } from 'react'

const initialState = {
	isPlaying: false,
	audioLists: [{ name: '', cover: '', musicSrc: '' }],
	title: null,
	description: null,
	thumbnail: null,
	playing: false,
	loaded: false,
	loop: false,
	mute: false,
	volume: 1.0,
	seek: 0.0,
	isSeeking: false,
}

const playerReducer = (state, action) => {
	switch (action.type) {
		case 'play': {
			return {
				...state,
			}
		}

		default: {
			return state
		}
	}
}

export const PlayerContext = createContext()

export default function PlayerProvider({ children }) {
	const [playerState, playerDispatch] = useReducer(playerReducer, initialState)

	return (
		<PlayerContext.Provider value={[playerState, playerDispatch]}>
			{children}
		</PlayerContext.Provider>
	)
}
