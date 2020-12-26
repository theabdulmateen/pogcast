import React, { useState } from 'react'

import TimerDisplay from './TimerDisplay'
import PlayBack from './PlayBack'

import Slider from './elements/Slider'
const { SliderContainer, StyledSlider, Thumb, Track } = Slider

export default function Progress({
	playable,
	progress,
	playNextInQueue,
	handleAfterSeekChange,
	current,
	duration,
}) {
	const [sliderActive, setSliderActive] = useState(false)

	const onBeforeChange = value => {
		setSliderActive(true)
	}

	const onAfterChange = value => {
		setSliderActive(false)
		handleAfterSeekChange(value)
	}

	return (
		<>
			<TimerDisplay position='left' timer={current} />

			<SliderContainer>
				<PlayBack playNextInQueue={playNextInQueue} />

				<StyledSlider
					active={sliderActive}
					disabled={!playable}
					value={progress}
					renderTrack={Track}
					renderThumb={Thumb}
					onBeforeChange={onBeforeChange}
					onAfterChange={onAfterChange}
					thumbActiveClassName='active-thumb'
				/>
			</SliderContainer>

			<TimerDisplay position='right' timer={duration} />
		</>
	)
}
