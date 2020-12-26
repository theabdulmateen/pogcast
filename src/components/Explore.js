import { Button, Divider, Skeleton, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import axios from 'axios'

import PogcastListing from './PogcastListing'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'

import constants from '../constants'
import { Link } from 'react-router-dom'

const { BASE_URL } = constants
const { Header, Title } = Typography
const { BaseContainer, PogListContainer } = Container
const { PogCard, Cover, Content } = StyledCard
const { LinkButton } = StyledButton

export default function Explore() {
	const [loading, setLoading] = useState(true)
	const [bestPodcasts, setBestPodcasts] = useState([])
	const [genres, setGenres] = useState([])
	const [errorMessage, setErrorMessage] = useState('')

	const viewLimit = useViewLimiter()
	const theme = useTheme()

	const populateListing = async topOnly => {
		try {
			const podcasts = []
			const options = {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			}
			const resp = await axios.get(`${BASE_URL}/genres?top_level_only=${topOnly}`, options)
			const genres = resp.data.genres

			for (const genre of genres.slice(0, 6)) {
				const resp = await axios.get(
					`${BASE_URL}/best_podcasts?genre_id=${genre.id}`,
					options
				)
				podcasts.push({ genre, podlist: resp.data.podcasts.slice(0, 8) })
			}

			setGenres(genres)
			setBestPodcasts(podcasts)
			setLoading(false)
		} catch (err) {
			console.error(err)
			setErrorMessage(err.message)
		}
	}

	useEffect(() => {
		populateListing(1)
	}, [])

	return (
		<BaseContainer>
			<Header size='large' color={theme.primary}>
				EXPLORE PODCASTS
			</Header>

			{loading ? (
				<>
					<Divider />
					<Skeleton loading={loading} active />
					<Divider />
					<Skeleton loading={loading} active />
				</>
			) : (
				bestPodcasts.map((pogcasts, index) => (
					<div key={index}>
						<Divider />
						<Header size='medium' color={theme.text.default[600]}>
							Top podcasts in {pogcasts.genre.name}
							<Link
								to={{
									pathname: `/top-podcasts/${pogcasts.genre.id}`,
									state: { genreName: pogcasts.genre.name },
								}}>
								<LinkButton type='link'>show all</LinkButton>
							</Link>
						</Header>
						<PogcastListing
							pogs={pogcasts.podlist}
							loading={loading}
							viewLimit={viewLimit}
						/>
					</div>
				))
			)}

			<Divider />

			{loading ? (
				<Skeleton.Button />
			) : (
				<Header size='medium' color={theme.text.default[600]}>
					Select podcast by Category
					<Link to='/genrelisting'>
						<LinkButton type='link'>show all</LinkButton>
					</Link>
				</Header>
			)}
			<PogListContainer>
				{genres.slice(0, viewLimit || 8).map(pog => (
					<PogCard key={pog.id}>
						<Skeleton loading={loading} active>
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

		if (width > 1760) {
			limit = 8
		}
		if (width >= 1200 && width < 1760) {
			limit = 7
		}
		if (width >= 900 && width < 1200) {
			limit = 5
		}
		if (width >= 600 && width < 900) {
			limit = 4
		}
		if (width < 600) {
			limit = 2
		}

		setLimit(limit)
	}, [width])

	return limit
}
