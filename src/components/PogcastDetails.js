import React from 'react'
import { useParams } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Skeleton } from 'antd'
import styled from 'styled-components'

import Image from './Image'
import EpisodeCard from './EpisodeCard'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'
import Episode from './elements/Episode'

import Api from '../helper/api'
import { usePogcast } from '../hooks/usePogcast'
import { useIsSavedPogcast } from '../hooks/useIsSavedPogcast'

const { Title } = Typography
const { BaseContainer } = Container
const { Content } = StyledCard
const { IconButton, LinkButton } = StyledButton
const { EpisodesContainer } = Episode

const api = new Api()

const PogcastDetails = () => {
	const { pogId } = useParams()

	const [isSaved] = useIsSavedPogcast(null, pogId)
	const { data, error, fetchNextPage, hasNextPage, isLoading, isError } = usePogcast(pogId)

	if (isLoading)
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

	if (isError)
		return (
			<PogDetailsContainer>
				<Skeleton active />

				<ContentContainer>Error: {error}</ContentContainer>
			</PogDetailsContainer>
		)

	return (
		<PogDetailsContainer>
			<HeaderContainer>
				<HeaderCover>
					<Image source={data.pages[0].thumbnail} alt='cover' />
				</HeaderCover>
				<HeaderContent>
					<Title style={{ fontSize: 40, lineHeight: 2 }}>{data.pages[0].title}</Title>
					<div style={{ display: 'flex' }}>
						<Title style={{ fontSize: 20 }}>{data.pages[0].publisher}</Title>
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
					{data.pages[0] && data.pages[0].description.replace(/(<([^>]+)>)/gi, '')}
				</About>
				<EpisodesContainer>
					<Title style={{ fontSize: 18, paddingLeft: 10 }}>All Episodes</Title>
					{data.pages.map(pogs =>
						pogs.episodes.map((ep, index) => (
							<EpisodeCard
								key={ep.id}
								ep={ep}
								pogId={pogs.id}
								pogcastTitle={data.pages[0].title}
								epQueue={data.pages[0].episodes.slice(0, index)}
							/>
						))
					)}

					{hasNextPage && (
						<LoadMoreButton onClick={() => fetchNextPage()}>
							Load more...
						</LoadMoreButton>
					)}
				</EpisodesContainer>
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
const HeaderCover = styled.div`
	margin-bottom: 10px;
	min-width: 225px;
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
const LoadMoreButton = styled(LinkButton)`
	font-size: 1.2em;
	position: relative;
	align-self: center;
	&::before {
		content: '';
		border-top: 1px solid gray;
		top: 50%;
		width: 55px;
		position: absolute;
		left: -100%;
	}
	&::after {
		content: '';
		border-top: 1px solid gray;
		top: 50%;
		width: 55px;
		position: absolute;
		right: -100%;
	}
`
