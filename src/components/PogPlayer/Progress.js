import React from 'react'
import styled, { css } from 'styled-components'
import { PlayCircleFilled, StepBackwardFilled, StepForwardFilled } from '@ant-design/icons'
import ReactSlider from 'react-slider'
import TimerDisplay from './TimerDisplay'

export default function Progress({
	sliderActive,
	playable,
	progress,
	onBeforeChange,
	onAfterChange,
	current,
	duration,
}) {
	return (
		<>
			<TimerDisplay position='left' timer={current} />

			<SliderContainer>
				<PlayerControls>
					<PlayerButton className='back'>
						<StepBackwardFilled />
					</PlayerButton>
					<PlayerButton>
						<PlayCircleFilled className='play' />
					</PlayerButton>
					<PlayerButton>
						<StepForwardFilled className='forward' />
					</PlayerButton>
				</PlayerControls>

				<StyledSlider
					active={sliderActive}
					disabled={!playable}
					value={progress}
					renderTrack={Track}
					renderThumb={Thumb}
					onBeforeChange={onBeforeChange}
					onChange={val => console.log('onChange value:', val)}
					onAfterChange={onAfterChange}
					thumbActiveClassName='active-thumb'
				/>
			</SliderContainer>

			<TimerDisplay position='right' timer={duration} />
		</>
	)
}

const SliderContainer = styled.div`
	display: flex;
	flex-basis: 40%;
	flex-direction: column;
`
const StyledSlider = styled(ReactSlider)`
	width: 100%;
	height: 6px;
	margin-top: auto;
	margin-bottom: 10px;

	.active-thumb:focus {
		outline: none !important;
	}

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
	background-color: #bdbdbd;
	border-radius: 100%;
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
	display: flex;
	align-self: center;
	margin: 5px;
	cursor: pointer;

	svg {
		color: #757575;
		height: 17px;
		width: 17px;
	}

	.play > svg {
		height: 30px;
		width: 30px;
		transition: transform 100ms linear;
	}

	&:hover {
		svg {
			color: #bdbdbd;
		}

		.play > svg {
			transform: scale(1.1);
		}
	}
`
