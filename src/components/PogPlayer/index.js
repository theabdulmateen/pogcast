import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactHowler from 'react-howler'

import { usePlayerContext } from '../../contexts/PlayerContext'
import Api from '../../helper/api'
import constants from '../../constants'
import Progress from './Progress'
import Thumbnail from './Thumbnail'
import Container from '../elements/Container'
import PlayerControls from './PlayerControls'

const { PogPlayerContainer } = Container
const { PLAY_EPISODE, POP_FROM_QUEUE } = constants
const api = new Api()

let timer = null

export default function PogPlayer() {
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
						epQueue: playerState.epQueue.slice(1),
						title: ep.title,
						thumbnail: ep.thumbnail,
						src: ep.src,
						showName: ep.showName,
					},
				})
				playerDispatch({ type: POP_FROM_QUEUE, payload: { index: 0 } })
			})
		}
	}, [playerState.epQueue, playerDispatch])

	const handleEnd = useCallback(() => {
		clearInterval(timer)
		playNextInQueue()
		setPlayable(false)
	}, [playNextInQueue, setPlayable])

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
			<PogPlayerContainer>
				<Thumbnail
					thumbnail={playerState.thumbnail}
					title={playerState.title}
					showName={playerState.showName}
				/>
				<Progress
					playable={playable}
					progress={progress}
					playNextInQueue={playNextInQueue}
					handleAfterSeekChange={handleAfterSeekChange}
					current={current}
					duration={duration}
				/>

				<PlayerControls />
			</PogPlayerContainer>
		</>
	)
}
