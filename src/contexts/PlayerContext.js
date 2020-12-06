import { createContext, useContext, useReducer } from 'react'

const initialState = {
	isPlaying: false,
	audioLists: [{ title: '', thumbnail: '', src: '' }],
	title: null,
	showName: null,
	thumbnail: null,
	src: null,
}

const playerReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case 'PLAY_EPISODE': {
			return {
				...state,
				title: payload.title,
				src: payload.src,
				thumbnail: payload.thumbnail,
				showName: payload.showName,
				isPlaying: true,
			}
		}

		default: {
			return state
		}
	}
}

const PlayerContext = createContext()
export const usePlayerContext = () => useContext(PlayerContext)

export default function PlayerProvider({ children }) {
	const [playerState, playerDispatch] = useReducer(playerReducer, initialState)

	return (
		<PlayerContext.Provider value={[playerState, playerDispatch]}>
			{children}
		</PlayerContext.Provider>
	)
}
