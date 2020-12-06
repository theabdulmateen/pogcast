import React, { useEffect, useState } from 'react'
import { Button, Skeleton } from 'antd'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'
import PlayButtonSvg from './static/PlayButton.svg'

import constants from '../constants'
import { usePlayerContext } from '../contexts/PlayerContext'

const { BASE_URL } = constants
const { Header, Title, Description } = Typography
const { BaseContainer } = Container
const { PogCard, Cover, PogButton, Content } = StyledCard

const PogDetailsContainer = styled(BaseContainer)``
const CardContainer = styled.div`
	display: flex;
`
const BaseCard = styled.div``

const PogcastDetails = () => {
	const { pogId } = useParams()
	const [playerState, playerDispatch] = usePlayerContext()

	const [loading, setLoading] = useState(false)
	const [pog, setPog] = useState()

	const playEpisode = (title, src, thumbnail, showName) => {
		playerDispatch({ type: 'PLAY_EPISODE', payload: { title, src, thumbnail, showName } })
	}

	const fetchPogFromApi = async () => {
		axios
			.get(BASE_URL + '/podcasts/' + pogId, {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			})
			.then(response => {
				const pog = response.data
				setPog(pog)
			})
			.catch(err => console.error(err))
	}

	useEffect(() => {
		fetchPogFromApi()
	}, [])

	useEffect(() => {
		console.log(playerState)
	}, [playerState])

	return (
		<PogDetailsContainer>
			<CardContainer>
				<BaseCard>
					<Skeleton loading={loading} active>
						<Cover>
							<img
								src={pog?.thumbnail}
								alt='https://source.unsplash.com/random/400x400'
							/>
							<PogButton className='play-button'>
								<img src={PlayButtonSvg} alt='Play'></img>
							</PogButton>
						</Cover>
					</Skeleton>
				</BaseCard>
				<Content style={{ alignSelf: 'flex-end' }}>
					<Title>{pog?.title}</Title>
					<Description>{pog && pog.description.replace(/(<([^>]+)>)/gi, '')}</Description>
				</Content>
			</CardContainer>

			{pog &&
				pog.episodes.map(ep => (
					<div key={ep.id}>
						<div>{ep.title}</div>
						<div>{ep.description.replace(/(<([^>]+)>)/gi, '')}</div>
						<Button
							Button
							type='primary'
							onClick={() =>
								playEpisode(ep.title, ep.audio, ep.thumbnail, pog.title)
							}>
							Play
						</Button>
					</div>
				))}
		</PogDetailsContainer>
	)
}

export default PogcastDetails
