import { Button, Divider, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import axios from 'axios'

import PogcastListing from './PogcastListing'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'

import constants from '../constants'

const { BASE_URL } = constants
const { Header, Title } = Typography
const { BaseContainer, PogListContainer } = Container
const { PogCard, Cover, Content } = StyledCard

export default function Explore() {
	const [loading, setLoading] = useState(true)
	const [bestPodcasts, setBestPodcasts] = useState([])
	const [genres, setGenres] = useState([])
	const [errorMessage, setErrorMessage] = useState('')

	const viewLimit = useViewLimiter()
	const theme = useTheme()

	const fetchBestPodcasts = async (genre, genreId) => {
		axios
			.get(`${BASE_URL}/best_podcasts?genre_id=${genreId}`, {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			})
			.then(response => {
				setBestPodcasts(podcasts => [
					...podcasts,
					{ genre, podlist: response.data.podcasts.slice(0, 7) },
				])
			})
			.catch(err => setErrorMessage(err.response.data.message))
	}

	const populateListing = async topOnly => {
		axios
			.get(`${BASE_URL}/genres?top_level_only=${topOnly}`, {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			})
			.then(response => {
				const genres = response.data.genres
				genres.slice(0, 10).forEach(genre => {
					fetchBestPodcasts(genre.name, genre.id)
				})
				setGenres(response.data.genres)
			})
			.catch(err => setErrorMessage(err.response.data.message))
	}

	useEffect(() => {
		populateListing(1)

		const timer = setTimeout(() => {
			setLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<BaseContainer>
			<Header size='large' color={theme.primary}>
				EXPLORE PODCASTS
			</Header>

			{bestPodcasts.map(pogcasts => (
				<>
					<Divider />
					<Header size='medium' color={theme.text.default[600]}>
						Top podcasts in {pogcasts.genre}
						<Button>show all</Button>
					</Header>
					<PogcastListing
						pogs={pogcasts.podlist}
						loading={loading}
						viewLimit={viewLimit}
					/>
				</>
			))}

			<Divider />

			<Header size='medium' color={theme.text.default[600]}>
				Select podcast by Category
				<Button>show all</Button>
			</Header>
			<PogListContainer>
				{genres.slice(0, viewLimit || 7).map(pog => (
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

	return [width, height]
}

const useViewLimiter = () => {
	const [limit, setLimit] = useState(7)
	const [width] = useViewport()

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

		setLimit(limit)
	}, [width])

	return limit
}
