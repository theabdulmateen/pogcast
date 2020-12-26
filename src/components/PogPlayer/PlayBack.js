import React from 'react'
import {
	PlayCircleFilled,
	StepBackwardFilled,
	StepForwardFilled,
	PauseCircleFilled,
} from '@ant-design/icons'

import constants from '../../constants'
import { usePlayerContext } from '../../contexts/PlayerContext'

import PlayBackElements from './elements/PlayBack'
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
