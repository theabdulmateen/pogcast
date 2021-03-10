import { MenuUnfoldOutlined } from '@ant-design/icons'
import { faVolumeDown, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown, Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'
import constants from '../../constants'
import { usePlayerContext } from '../../contexts/PlayerContext'
import Container from '../elements/Container'
import StyledButtons from '../elements/StyledButton'
import Slider from './elements/Slider'

const { ControlsContainer } = Container
const { SliderContainer, StyledSlider, Thumb, Track } = Slider
const { ControlsButton } = StyledButtons
const { SET_VOLUME, TOGGLE_MUTE } = constants

export default function PlayerControls() {
	const [playerState, playerDispatch] = usePlayerContext()

	const handleChange = value => {
		const volume = parseInt(value)
		playerDispatch({ type: SET_VOLUME, payload: { volume } })
	}

	const QueueList = (
		<Menu>
			{!playerState.epQueue || playerState.epQueue.length === 0 ? (
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

const VolumeSliderContainer = styled(SliderContainer)`
	flex-basis: 100px;
	display: flex;
	flex-direction: column;
`
const VolumeSlider = styled(StyledSlider)`
	margin-bottom: 0;
`
