import React from 'react'

import TimerDisplay from './TimerDisplay'
import PlayBack from './PlayBack'

import Slider from './elements/Slider'
const { SliderContainer, StyledSlider, Thumb, Track } = Slider

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
				<PlayBack />

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
