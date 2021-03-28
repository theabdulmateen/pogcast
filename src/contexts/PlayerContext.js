import { createContext, useContext, useReducer } from 'react'

import constants from '../constants'

const {
	PLAY_EPISODE,
	ADD_TO_QUEUE,
	POP_FROM_QUEUE,
	UPDATE_QUEUE,
	TOGGLE_MUTE,
	SET_VOLUME,
	PLAY,
	PAUSE,
} = constants

const initialState = {
	epId: null,
	isPlaying: false,
	isLoaded: false,
	volume: 30,
	isMuted: false,
	epQueue: [],
	title: null,
	showName: null,
	thumbnail: null,
	src: null,
}

const playerReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case PLAY_EPISODE: {
			return {
				...state,
				epId: payload.epId,
				isLoaded: true,
				epQueue: payload.epQueue,
				title: payload.title,
				src: payload.src,
				thumbnail: payload.thumbnail,
				showName: payload.showName,
				isPlaying: true,
			}
		}

		case ADD_TO_QUEUE: {
			return {
				...state,
				epQueue: [{ ...payload }, ...state.epQueue],
			}
		}

		case POP_FROM_QUEUE: {
			const newQueue = state.epQueue
			newQueue.splice(payload.index, 1)

			return {
				...state,
				epQueue: newQueue,
			}
		}

		case UPDATE_QUEUE: {
			return {
				...state,
				epQueue: payload.epQueue,
			}
		}

		case SET_VOLUME: {
			return {
				...state,
				isMuted: false,
				volume: payload.volume,
			}
		}

		case TOGGLE_MUTE: {
			return {
				...state,
				isMuted: !state.isMuted,
			}
		}

		case PLAY: {
			return {
				...state,
				isPlaying: true,
			}
		}

		case PAUSE: {
			return {
				...state,
				isPlaying: false,
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
