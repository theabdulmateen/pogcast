import React, { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import ReactHowler from 'react-howler'
import { Typography as AntTypography } from 'antd'
import ReactSlider from 'react-slider'

import { PlayerContext } from '../contexts/PlayerContext'

const { Title, Text } = AntTypography

const PogPlayerContainer = styled.div`
	background-color: #282828;
	padding: 10px;
	height: 85px;
	position: fixed;
	z-index: 2;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-content: space-between;
	justify-content: space-between;
`

const ThumbnailContainer = styled.div`
	display: flex;
	flex-basis: 20%;
`
const Thumbnail = styled.div`
	display: flex;
	position: relative;
	width: 60px;
	margin-right: 2em;

	&::before {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: -2px;
		background-color: #a2a2a2;
	}

	img {
		width: 100%;
	}
`
const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	h4 {
		margin: 0;
	}
`

const SliderContainer = styled.div`
	display: flex;
	flex-basis: 40%;
	flex-direction: column;

	.track-0 {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.track-1 {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
`
const StyledSlider = styled(ReactSlider)`
	width: 100%;
	height: 6px;
	margin-top: auto;
	margin-bottom: 10px;

	${props =>
		props.active &&
		css`
			.thumb {
				display: block !important;
			}

			.track-0 {
				background-color: #824a4a;
			}
		`}
`

const StyledThumb = styled.div`
	display: none;
	height: 15px;
	width: 15px;
	background-color: #ddd;
	border-radius: 50%;
	transform: translateY(calc(-50% + 3px));
	cursor: normal;
`
const Thumb = (props, state) => <StyledThumb className='slider-thumb' {...props} />

const StyledTrack = styled.div`
	top: 0;
	bottom: 0;
	background: ${props =>
		props.index === 2 ? '#424242' : props.index === 1 ? '#757575' : '#BDBDBD'};
	border-radius: 999px;
`
const Track = (props, state) => (
	<StyledTrack className='slider-track' {...props} index={state.index} />
)

const PlayerControls = styled.div`
	display: flex;
	align-self: center;
`
const PlayerButton = styled.div`
	margin: 5px;
`

const ControlsContainer = styled.div`
	display: flex;
	flex-basis: 20%;
`

export default function PogPlayer() {
	const [playerState, playerDispatch] = useContext(PlayerContext)
	const [active, setActive] = useState(false)

	const onBeforeChange = value => {
		setActive(true)
	}

	const onChange = value => {
		console.log(value)
	}

	const onAfterChange = value => {
		setActive(false)
	}

	return (
		<PogPlayerContainer>
			<ThumbnailContainer>
				<Thumbnail>
					<img src='https://source.unsplash.com/random/400x400' alt='thumbnail' />
				</Thumbnail>
				<Details>
					<Title level={4}>{playerState.title}</Title>
					<Text>{playerState.description}</Text>
				</Details>
			</ThumbnailContainer>
			<div
				style={{
					alignSelf: 'end',
					marginLeft: 'auto',
					marginRight: '10px',
					marginBottom: '2px',
				}}>
				4:23
			</div>
			<SliderContainer>
				<PlayerControls>
					<PlayerButton>previous</PlayerButton>
					<PlayerButton>play</PlayerButton>
					<PlayerButton>next</PlayerButton>
				</PlayerControls>
				<StyledSlider
					active={active}
					renderTrack={Track}
					renderThumb={Thumb}
					onBeforeChange={onBeforeChange}
					onChange={val => console.log('onChange value:', val)}
					onAfterChange={onAfterChange}
					thumbActiveClassName='active-thumb'
				/>
			</SliderContainer>
			<div
				style={{
					alignSelf: 'end',
					marginRight: 'auto',
					marginLeft: '10px',
					marginBottom: '2px',
				}}>
				5:42
			</div>

			<ControlsContainer>controls</ControlsContainer>

			<ReactHowler src='http://goldfirestudios.com/proj/howlerjs/sound.ogg' playing={false} />
		</PogPlayerContainer>
	)
}
