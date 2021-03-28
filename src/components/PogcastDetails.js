import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { PlayCircleFilled } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'

import Api from '../helper/api'
import constants from '../constants'
import { usePlayerContext } from '../contexts/PlayerContext'
import { useIsSavedPogcast } from '../hooks/useIsSavedPogcast'

const { PLAY_EPISODE, ADD_TO_QUEUE } = constants
const { Title, Description } = Typography
const { BaseContainer } = Container
const { Content } = StyledCard
const { IconButton } = StyledButton
const api = new Api()

const PogcastDetails = () => {
	const { pogId } = useParams()
	const [playerState, playerDispatch] = usePlayerContext()
	const [isSaved] = useIsSavedPogcast(null, pogId)

	const [loading, setLoading] = useState(true)
	const [pog, setPog] = useState()

	const playEpisode = (epId, title, src, thumbnail, showName, epQueueList) => {
		const epQueue = epQueueList.map(ep => ({
			epId: ep.id,
			title: ep.title,
			thumbnail: ep.thumbnail,
			showName,
		}))
		playerDispatch({
			type: PLAY_EPISODE,
			payload: { epId, title, src, thumbnail, showName, epQueue },
		})
	}

	const AddToQueue = (ep, showName) => {
		let epQueue = playerState.epQueue

		if (epQueue.findIndex(epInQ => epInQ.epId === ep.id) === -1) {
			playerDispatch({
				type: ADD_TO_QUEUE,
				payload: { epId: ep.id, title: ep.title, thumbnail: ep.thumbnail, showName },
			})
		}
	}

	useEffect(() => {
		api.getPogcastById(pogId).then(pog => {
			setPog(pog)
			setLoading(false)
		})
	}, [pogId])

	if (loading)
		return (
			<PogDetailsContainer>
				<Skeleton active />

				<ContentContainer>
					<div>
						<Skeleton active />
						<Skeleton active />
						<Skeleton active />
						<Skeleton active />
					</div>
					<div>
						<Skeleton active />
					</div>
				</ContentContainer>
			</PogDetailsContainer>
		)

	return (
		<PogDetailsContainer>
			<HeaderContainer>
				<HeaderThumbnail>
					<HeaderCover>
						<img src={pog?.thumbnail} alt='cover' />
					</HeaderCover>
				</HeaderThumbnail>
				<HeaderContent>
					<Title style={{ fontSize: 40, lineHeight: 2 }}>{pog?.title}</Title>
					<div style={{ display: 'flex' }}>
						<Title style={{ fontSize: 20 }}>{pog?.publisher}</Title>
						<IconButton
							onClick={() => api.toggleSavePogcast(pogId)}
							style={{ marginLeft: '20px' }}>
							{!isSaved ? <HeartOutlined /> : <HeartFilled />}
						</IconButton>
					</div>
				</HeaderContent>
			</HeaderContainer>

			<ContentContainer>
				<About>
					<Title style={{ fontSize: 18 }}>About</Title>
					{pog && pog.description.replace(/(<([^>]+)>)/gi, '')}
				</About>
				<Episodes>
					<Title style={{ fontSize: 18, paddingLeft: 10 }}>All Episodes</Title>
					{pog &&
						pog.episodes.map((ep, index) => (
							<EpisodeCard key={ep.id}>
								<EpisodeCover>
									<img src={ep.thumbnail} alt='episode cover' />
								</EpisodeCover>
								<EpisodeContent>
									<Title style={{ fontSize: 16, color: '#A3A3A3' }}>
										{ep.title}
									</Title>
									<Description style={{ fontSize: 14, lineHeight: '17px' }}>
										{ep.description.replace(/(<([^>]+)>)/gi, '')}
									</Description>
									<IconButton
										onClick={() =>
											playEpisode(
												ep.id,
												ep.title,
												ep.audio,
												ep.thumbnail,
												pog.title,
												pog.episodes.slice(0, index)
											)
										}>
										<PlayCircleFilled />
									</IconButton>

									<IconButton onClick={() => AddToQueue(ep, pog.title)}>
										Add to Queue
									</IconButton>
								</EpisodeContent>
							</EpisodeCard>
						))}
				</Episodes>
			</ContentContainer>
		</PogDetailsContainer>
	)
}

export default PogcastDetails

const PogDetailsContainer = styled(BaseContainer)``
const HeaderContainer = styled.div`
	display: flex;
	padding-left: 30px;
`
const HeaderThumbnail = styled.div`
	max-width: 250px;
`
const HeaderCover = styled.div`
	margin-bottom: 10px;
	img {
		min-width: 200px;
		max-width: 100%;
		height: auto;
		border-radius: 10px;
		position: contain;
	}
`
const HeaderContent = styled(Content)`
	margin: 2em;
	align-self: flex-end;
	-webkit-line-clamp: 6;
	font-size: 15px;
	h4 {
		margin-bottom: 0;
	}
`
const ContentContainer = styled.div`
	margin-top: 50px;
	padding: 30px;
	background-color: ${props => props.theme.background.content};
	border-radius: 15px;

	${props => props.theme.desktopUp} {
		display: grid;
		gap: 75px;
		grid-template-columns: 2fr 1fr;
	}
`
const Episodes = styled.div``
const EpisodeCard = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-areas: 'cover content';
	gap: 15px;

	background-color: ${props => props.theme.background.card};
	border-radius: 10px;
	padding: 10px;
	margin: 20px 0;
`
const EpisodeCover = styled.div`
	margin-bottom: 10px;
	grid-area: cover;

	img {
		min-width: 125px;
		max-width: 100%;
		height: auto;
		border-radius: 10px;
		position: contain;
	}
`
const EpisodeContent = styled.div`
	grid-area: content;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`
const About = styled.div`
	order: 1;
	padding-left: 10px;
	margin-bottom: 20px;
	font-size: 14px;
	line-height: 17px;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;

	${props => props.theme.desktopUp} {
		padding-left: 0;
		order: 2;
	}
`
