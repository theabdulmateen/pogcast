import { Button, Divider, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { PlayCircleFilled } from '@ant-design/icons'
import axios from 'axios'

import Container from './elements/Container'
import Typography from './elements/Typography'
import constants from '../constants'
const { BASE_URL } = constants
const { Header, Title, Description } = Typography

const PogListContainer = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: repeat(7, minmax(200px, 1fr));
	gap: 20px;
`
const PogCard = styled.div`
	background-color: ${props => props.theme.background.main};
	border-radius: 10px;
	padding: 7px;
	min-height: 300px;
`
const Cover = styled.div`
	margin-bottom: 10px;
	img {
		width: 100%;
		border-radius: 10px;
	}
`
const Content = styled.div``

export default function PodcastListing() {
	const [loading, setLoading] = useState(true)
	const [bestPodcasts, setBestPodcasts] = useState([])
	const [errorMessage, setErrorMessage] = useState('')
	const [viewLimiter, setViewLimiter] = useState(7)

	const { width } = useViewport()
	const theme = useTheme()

	const fetchCuratedList = async () => {
		axios
			.get(BASE_URL + '/best_podcasts', {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			})
			.then(response => {
				setBestPodcasts(response.data.podcasts.slice(0, 7))
				setLoading(false)
			})
			.catch(err => setErrorMessage(err.response.data.message))
	}

	useEffect(() => {
		let limit

		if (width < 1500) {
			limit = 6
		}
		if (width < 1200 && width > 900) {
			limit = 5
		}
		if (width < 900 && width > 600) {
			limit = 4
		}
		if (width < 600) {
			limit = 2
		}

		setViewLimiter(limit)
	}, [width])

	useEffect(() => {
		fetchCuratedList()
	}, [])

	return (
		<Container>
			<Header size='large' color={theme.primary}>
				EXPLORE PODCASTS
			</Header>

			<Divider />

			<Header size='medium' color={theme.text.secondary}>
				Trending
				<Button>show all</Button>
			</Header>
			<PogListContainer>
				{bestPodcasts.slice(0, viewLimiter).map(pog => (
					<PogCard key={pog.id}>
						<Skeleton loading={loading} active>
							<Cover>
								<img src={pog.thumbnail} alt='podcast cover' />
								{/* <Button
									type='primary'
									shape='circle'
									icon={<PlayCircleFilled />}
									size='large'
								/> */}
							</Cover>
							<Content>
								<Title>{pog.title.substring(0, 17) + '...'}</Title>
								<Description>
									{pog.description.length > 100
										? pog.description
												.replace(/(<([^>]+)>)/gi, '')
												.substring(0, 90) + '...'
										: pog.description.replace(/(<([^>]+)>)/gi, '')}
								</Description>
							</Content>
						</Skeleton>
					</PogCard>
				))}
			</PogListContainer>
		</Container>
	)
}

const useViewport = () => {
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)

	useEffect(() => {
		const handleWindowResize = () => {
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)
		}

		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	return { width, height }
}
