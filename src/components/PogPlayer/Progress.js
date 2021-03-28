import React, { useCallback, useMemo, useRef, useState } from 'react'
import ReactHowler from 'react-howler'

import TimerDisplay from './TimerDisplay'
import PlayBack from './PlayBack'
import constants from '../../constants'

import Slider from './elements/Slider'
import { usePlayerContext } from '../../contexts/PlayerContext'
import Api from '../../helper/api'

const { SliderContainer, StyledSlider, Thumb, Track } = Slider
const { PLAY_EPISODE } = constants
const api = new Api()

let timer = null

export default function Progress() {
	const [sliderActive, setSliderActive] = useState(false)
	const [playerState, playerDispatch] = usePlayerContext()
	const [duration, setDuration] = useState()
	const [current, setCurrent] = useState()
	const [progress, setProgress] = useState()
	const [playable, setPlayable] = useState(false)

	const audioRef = useRef()

	const handleAfterSeekChange = value => {
		const seekValue = (value * audioRef.current.duration()) / 100

		audioRef.current.seek(seekValue)
	}

	const handleLoad = useCallback(() => {
		const duration = audioRef.current.duration()
		setDuration(duration)
		setPlayable(true)
	}, [audioRef, setDuration, setPlayable])

	const updateProgress = () => {
		if (audioRef.current && audioRef.current.howlerState() === 'loaded') {
			const seek = audioRef.current.seek()
			setCurrent(seek)

			const percentage = (seek / audioRef.current.duration()) * 100
			setProgress(percentage)
		}
	}

	const playNextInQueue = useCallback(() => {
		if (playerState.epQueue.length > 0) {
			api.getEpisodeById(playerState.epQueue[0]).then(ep => {
				playerDispatch({
					type: PLAY_EPISODE,
					payload: {
						epId: ep.id,
						epQueue: playerState.epQueue.slice(1),
						title: ep.title,
						thumbnail: ep.thumbnail,
						src: ep.src,
						showName: ep.showName,
					},
				})
				// playerDispatch({ type: POP_FROM_QUEUE, payload: { index: 0 } })
			})
		}
	}, [playerState.epQueue, playerDispatch])

	const handleEnd = useCallback(() => {
		clearInterval(timer)
		playNextInQueue()
		setPlayable(false)
	}, [playNextInQueue, setPlayable])

	const onBeforeChange = value => {
		setSliderActive(true)
	}

	const onAfterChange = value => {
		setSliderActive(false)
		handleAfterSeekChange(value)
	}

	return (
		<>
			{useMemo(
				() =>
					playerState.src && (
						<ReactHowler
							html5={true}
							ref={audioRef}
							volume={parseFloat(playerState.volume / 100).toPrecision(2)}
							mute={playerState.isMuted}
							playing={playerState.isPlaying}
							src={playerState.src}
							onLoad={handleLoad}
							onPlay={() => {
								clearInterval(timer)
								timer = setInterval(updateProgress, 10)
							}}
							onEnd={handleEnd}
						/>
					),
				[
					playerState.src,
					playerState.isPlaying,
					playerState.isMuted,
					playerState.volume,
					handleLoad,
					handleEnd,
				]
			)}
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
