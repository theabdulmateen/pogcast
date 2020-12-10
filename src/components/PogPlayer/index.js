import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactHowler from 'react-howler'

import { usePlayerContext } from '../../contexts/PlayerContext'
import Progress from './Progress'
import Thumbnail from './Thumbnail'
import Container from '../elements/Container'
import PlayerControls from './PlayerControls'

const { PogPlayerContainer, ControlsContainer } = Container

let timer = null

export default function PogPlayer() {
	const [playerState, playerDispatch] = usePlayerContext()
	const [sliderActive, setSliderActive] = useState(false)
	const [duration, setDuration] = useState()
	const [current, setCurrent] = useState()
	const [progress, setProgress] = useState()
	const [playable, setPlayable] = useState(false)

	const audioRef = useRef()

	const handleBeforeSeekChange = value => {
		setSliderActive(true)
	}

	const onChange = value => {
		console.log(value)
	}

	const handleAfterSeekChange = value => {
		setSliderActive(false)
		const seekValue = (value * audioRef.current.duration()) / 100

		audioRef.current.seek(seekValue)
	}

	const handleLoad = () => {
		const duration = audioRef.current.duration()
		setDuration(duration)
		setPlayable(true)
	}

	const updateProgress = () => {
		const seek = audioRef.current.seek()
		setCurrent(seek)

		const percentage = (seek / audioRef.current.duration()) * 100
		setProgress(percentage)
	}

	const handleStop = () => {
		clearInterval(timer)
		setPlayable(false)
	}

	return (
		<>
			{playerState.src && (
				<ReactHowler
					html5={true}
					ref={audioRef}
					volume={parseFloat(playerState.volume / 100).toPrecision(2)}
					mute={playerState.isMuted}
					playing={playerState.isPlaying}
					src={playerState.src}
					onLoad={handleLoad}
					onPlay={() => (timer = setInterval(updateProgress, 10))}
					onEnd={handleStop}
				/>
			)}
			<PogPlayerContainer>
				<Thumbnail
					thumbnail={playerState.thumbnail}
					title={playerState.title}
					showName={playerState.showName}
				/>
				<Progress
					sliderActive={sliderActive}
					playable={playable}
					progress={progress}
					onBeforeChange={handleBeforeSeekChange}
					onAfterChange={handleAfterSeekChange}
					current={current}
					duration={duration}
				/>

				<PlayerControls />
			</PogPlayerContainer>
		</>
	)
}
