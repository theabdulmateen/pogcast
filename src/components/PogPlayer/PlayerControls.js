import React from 'react'
import styled from 'styled-components'
import { Menu, Dropdown, Button } from 'antd'
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeUp, faVolumeDown, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import Container from '../elements/Container'
import Slider from './elements/Slider'
import { usePlayerContext } from '../../contexts/PlayerContext'
import constants from '../../constants'

const { ControlsContainer } = Container
const { SliderContainer, StyledSlider, Thumb, Track } = Slider
const { SET_VOLUME, TOGGLE_MUTE } = constants

export default function PlayerControls({ volume }) {
	const [playerState, playerDispatch] = usePlayerContext()

	const handleChange = value => {
		const volume = value
		playerDispatch({ type: SET_VOLUME, payload: { volume } })
	}

	const QueueList = (
		<Menu>
			{playerState.epQueue.length === 0 ? (
				<Menu.Item>Queue is empty, Saj</Menu.Item>
			) : (
				playerState.epQueue.map(ep => <Menu.Item>{ep}</Menu.Item>)
			)}
		</Menu>
	)

	return (
		<ControlsContainer>
			<Dropdown overlay={QueueList} placement='topCenter' trigger='click' arrow>
				<ControlsButton>
					<MenuUnfoldOutlined />
				</ControlsButton>
			</Dropdown>

			<ControlsButton
				onClick={() => {
					playerDispatch({ type: TOGGLE_MUTE })
				}}>
				{playerState.volume === 0 || playerState.isMuted ? (
					<FontAwesomeIcon icon={faVolumeMute} />
				) : playerState.volume < 50 ? (
					<FontAwesomeIcon icon={faVolumeDown} />
				) : (
					<FontAwesomeIcon icon={faVolumeUp} />
				)}
			</ControlsButton>

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

const ControlsButton = styled.div`
	width: 10px;
	margin: 0 10px;
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
