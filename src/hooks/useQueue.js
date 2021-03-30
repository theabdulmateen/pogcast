import { usePlayerContext } from '../contexts/PlayerContext'
import constants from '../constants'

const { ADD_TO_QUEUE } = constants

export const useQueue = () => {
	const [playerState, playerDispatch] = usePlayerContext()

	const addToQueue = (ep, showName) => {
		let epQueue = playerState.epQueue

		if (epQueue.findIndex(epInQ => epInQ.epId === ep.id) === -1) {
			playerDispatch({
				type: ADD_TO_QUEUE,
				payload: { epId: ep.id, title: ep.title, thumbnail: ep.thumbnail, showName },
			})
		}
	}

	return [addToQueue]
}
