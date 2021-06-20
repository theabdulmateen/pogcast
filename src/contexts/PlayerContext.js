import { createContext, useContext, useReducer } from 'react'

import constants from '../constants'
import Api from '../helper/api'

const {
	PLAY_EPISODE,
	ADD_TO_QUEUE,
	POP_FROM_QUEUE,
	UPDATE_QUEUE,
	TOGGLE_MUTE,
	SET_VOLUME,
	PLAY,
	PAUSE,
	SEEK,
	SET_SEEK,
} = constants

const initialState = {
	epId: null,
	pogId: null,
	seek: 0,
	toSeek: 0,
	duration: 0,
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

const api = new Api()

const playerReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case PLAY_EPISODE: {
			if (state.pogId && state.pogId) {
				api.markPogress(state.pogId, state.epId, state.seek, state.duration)
			}

			return {
				...state,
				...payload,
				seek: 0,
				isLoaded: true,
				isPlaying: true,
			}
		}

		case ADD_TO_QUEUE: {
			return {
				...state,
				epQueue: [ { ...payload }, ...state.epQueue ],
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
			if (state.pogId && state.pogId) {
				api.markPogress(state.pogId, state.epId, state.seek, state.duration)
			}

			return {
				...state,
				isPlaying: false,
			}
		}

		case SEEK: {
			return {
				...state,
				seek: payload.seek,
			}
		}

		case SET_SEEK: {
			return {
				...state,
				seek: state.toSeek,
				toSeek: 0,
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
	const [ playerState, playerDispatch ] = useReducer(playerReducer, initialState)

	return <PlayerContext.Provider value={[ playerState, playerDispatch ]}>{children}</PlayerContext.Provider>
}
