import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeDown, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import Container from '../elements/Container'
import Slider from './elements/Slider'
import { usePlayerContext } from '../../contexts/PlayerContext'

const { ControlsContainer } = Container
const { SliderContainer, StyledSlider, Thumb, Track } = Slider

export default function PlayerControls({ volume }) {
	const [playerState, playerDispatch] = usePlayerContext()

	const handleChange = value => {
		const volume = value
		playerDispatch({ type: 'SET_VOLUME', payload: { volume } })
	}

	return (
		<ControlsContainer>
			<div>playlist</div>

			<MuteButton
				onClick={() => {
					playerDispatch({ type: 'TOGGLE_MUTE' })
				}}>
				{playerState.volume === 0 || playerState.isMuted ? (
					<FontAwesomeIcon icon={faVolumeMute} />
				) : playerState.volume < 50 ? (
					<FontAwesomeIcon icon={faVolumeDown} />
				) : (
					<FontAwesomeIcon icon={faVolumeUp} />
				)}
			</MuteButton>

			<VolumeSliderContainer>
				<VolumeSlider
					active={true}
					value={playerState.isMuted ? 0 : playerState.volume}
					renderTrack={Track}
					renderThumb={Thumb}
					onChange={handleChange}
					thumbActiveClassName='active-thumb'
				/>
			</VolumeSliderContainer>
		</ControlsContainer>
	)
}

const MuteButton = styled.div`
	width: 10px;
	margin: 0 15px;
	cursor: pointer;

	&:hover {
		svg {
			color: #bdbdbd;
		}
	}
`
const VolumeSliderContainer = styled(SliderContainer)`
	flex-basis: 100px;
	display: flex;
	flex-direction: column;
`
const VolumeSlider = styled(StyledSlider)`
	margin-bottom: 0;
`
