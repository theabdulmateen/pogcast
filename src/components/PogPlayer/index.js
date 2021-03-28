import React from 'react'
import Container from '../elements/Container'
import PlayerControls from './PlayerControls'
import Progress from './Progress'
import Thumbnail from './Thumbnail'

const { PogPlayerContainer } = Container

export default function PogPlayer() {
	return (
		<>
			<PogPlayerContainer>
				<Thumbnail />
				<Progress />
				<PlayerControls />
			</PogPlayerContainer>
		</>
	)
}
