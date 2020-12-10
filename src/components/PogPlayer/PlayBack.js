import React from 'react'
import {
	PlayCircleFilled,
	StepBackwardFilled,
	StepForwardFilled,
	PauseCircleFilled,
} from '@ant-design/icons'

import { usePlayerContext } from '../../contexts/PlayerContext'

import PlayBackElements from './elements/PlayBack'
const { PlayBackContainer, PlayerButton } = PlayBackElements

export default function PlayBack() {
	const [playerState, playerDispatch] = usePlayerContext()

	return (
		<PlayBackContainer>
			<PlayerButton className='back'>
				<StepBackwardFilled />
			</PlayerButton>
			<PlayerButton
				onClick={() => playerDispatch({ type: playerState.isPlaying ? 'PAUSE' : 'PLAY' })}>
				{playerState.isPlaying ? (
					<PauseCircleFilled className='play-pause' />
				) : (
					<PlayCircleFilled className='play-pause' />
				)}
			</PlayerButton>
			<PlayerButton>
				<StepForwardFilled className='forward' />
			</PlayerButton>
		</PlayBackContainer>
	)
}
