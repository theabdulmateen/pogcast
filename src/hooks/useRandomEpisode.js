import Api from '../helper/api'
import constants from '../constants'
import { usePlayerContext } from '../contexts/PlayerContext'

const { PLAY_EPISODE } = constants
const api = new Api()

export const useRandomEpisode = () => {
	const [, playerDispatch] = usePlayerContext()

	const playRandomEpisode = async () => {
		api.getRandomEpisode()
			.then(ep =>
				playerDispatch({
					type: PLAY_EPISODE,
					payload: { ...ep, epId: ep.id },
				})
			)
			.catch(err => console.error(err))
	}

	return playRandomEpisode
}
