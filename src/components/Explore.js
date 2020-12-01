import { Button, Divider, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import axios from 'axios'

import PogcastListing from './PogcastListing'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'

import constants from '../constants'

const { BASE_URL } = constants
const { Header, Title, Description } = Typography
const { BaseContainer, PogListContainer } = Container
const { PogCard, Cover, PogButton, Content } = StyledCard

export default function Explore() {
	const [loading, setLoading] = useState(true)
	const [bestPodcasts, setBestPodcasts] = useState([])
	const [genres, setGenres] = useState([])
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

	const fetchGenres = async () => {
		axios
			.get(BASE_URL + '/genres', {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			})
			.then(response => {
				setGenres(response.data.genres)
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
		fetchGenres()
	}, [])

	return (
		<BaseContainer>
			<Header size='large' color={theme.primary}>
				EXPLORE PODCASTS
			</Header>

			<Divider />

			<Header size='medium' color={theme.text.default[600]}>
				Trending
				<Button>show all</Button>
			</Header>
			<PogcastListing pogs={bestPodcasts} loading={loading} viewLimiter={viewLimiter} />

			<Divider />

			<Header size='medium' color={theme.text.default[600]}>
				Select podcast by Category
				<Button>show all</Button>
			</Header>
			<PogListContainer>
				{genres.slice(0, viewLimiter || 7).map(pog => (
					<PogCard key={pog.id}>
						<Skeleton loading={loading} active>
							<Cover>
								{/* <img
									src={'https://source.unsplash.com/random/400x400'}
									alt='podcast cover'
								/> */}
							</Cover>
							<Content>
								<Title>{pog.name.substring(0, 50)}</Title>
							</Content>
						</Skeleton>
					</PogCard>
				))}
			</PogListContainer>
		</BaseContainer>
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
