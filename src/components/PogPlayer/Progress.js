import React, { useCallback, useMemo, useRef, useState } from 'react'
import ReactHowler from 'react-howler'

import TimerDisplay from './TimerDisplay'
import PlayBack from './PlayBack'
import constants from '../../constants'

import Slider from './elements/Slider'
import { usePlayerContext } from '../../contexts/PlayerContext'
import Api from '../../helper/api'

const { SliderContainer, StyledSlider, Thumb, Track } = Slider
const { PLAY_EPISODE, SEEK } = constants
const api = new Api()

let timer = null

export default function Progress() {
	const [sliderActive, setSliderActive] = useState(false)
	const [playerState, playerDispatch] = usePlayerContext()
	const [progress, setProgress] = useState()
	const [playable, setPlayable] = useState(false)

	const audioRef = useRef()

	const handleAfterSeekChange = value => {
		const seekValue = (value * audioRef.current.duration()) / 100

		audioRef.current.seek(seekValue)
		playerDispatch({ type: SEEK, payload: { seek: seekValue } })
	}

	const handleLoad = useCallback(() => {
		setPlayable(true)
	}, [setPlayable])

	const updateProgress = useCallback(() => {
		if (audioRef.current && audioRef.current.howlerState() === 'loaded') {
			const seek = audioRef.current.seek()
			playerDispatch({ type: SEEK, payload: { seek: seek } })

			const percentage = (seek / audioRef.current.duration()) * 100
			setProgress(percentage)
		}
	}, [playerDispatch])

	const playNextInQueue = useCallback(() => {
		if (playerState.epQueue.length > 0) {
			api.getEpisodeById(playerState.epQueue[0]).then(ep => {
				playerDispatch({
					type: PLAY_EPISODE,
					payload: {
						epId: ep.id,
						pogId: ep.pogcast.id,
						seek: 0,
						duration: ep.audio_length_sec,
						epQueue: playerState.epQueue.slice(1),
						title: ep.title,
						thumbnail: ep.thumbnail,
						src: ep.src,
						showName: ep.showName,
					},
				})
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
					updateProgress,
				]
			)}
			<TimerDisplay position='left' timer={playerState.seek} />

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

			<TimerDisplay position='right' timer={playerState.duration} />
		</>
	)
}
