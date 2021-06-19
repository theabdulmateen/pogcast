import React from 'react'
import {
	PlayCircleFilled,
	StepBackwardFilled,
	StepForwardFilled,
	PauseCircleFilled,
} from '@ant-design/icons'

import PlayBackElements from './elements/PlayBack'

import { usePlayerContext } from '../../contexts/PlayerContext'
import constants from '../../constants'

const { PlayBackContainer, PlayerButton } = PlayBackElements
const { PLAY, PAUSE } = constants

export default function PlayBack({ playNextInQueue }) {
	const [playerState, playerDispatch] = usePlayerContext()

	return (
		<PlayBackContainer>
			<PlayerButton className='back'>
				<StepBackwardFilled />
			</PlayerButton>
			<PlayerButton
				onClick={() => playerDispatch({ type: playerState.isPlaying ? PAUSE : PLAY })}>
				{playerState.isPlaying ? (
					<PauseCircleFilled className='play-pause' />
				) : (
					<PlayCircleFilled className='play-pause' />
				)}
			</PlayerButton>
			<PlayerButton onClick={playNextInQueue}>
				<StepForwardFilled className='forward' />
			</PlayerButton>
		</PlayBackContainer>
	)
}
