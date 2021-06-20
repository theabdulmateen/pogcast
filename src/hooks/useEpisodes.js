import { usePlayerContext } from '../contexts/PlayerContext'
import { generateEpQueue } from '../helper/generateEpQueue'
import constants from '../constants'

const { PLAY_EPISODE } = constants

export const useEpisodes = () => {
	const [ , playerDispatch ] = usePlayerContext()

	const playEpisode = ({ epId, pogId, toSeek, duration, title, src, thumbnail, showName, epQueueList }) => {
		const epQueue = generateEpQueue(epQueueList, showName)

		playerDispatch({
			type: PLAY_EPISODE,
			payload: {
				epId,
				pogId,
				toSeek,
				duration,
				title,
				src,
				thumbnail,
				showName,
				epQueue,
			},
		})
	}

	return [ playEpisode ]
}
