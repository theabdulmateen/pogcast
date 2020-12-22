import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Divider, Skeleton } from 'antd'
import axios from 'axios'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'

import constants from '../constants'
import PogcastListing from './PogcastListing'

const { BASE_URL } = constants
const { Header, Title, Description } = Typography
const { PogListContainer, BaseContainer } = Container
const { PogCard, Cover, PogButton, Content } = StyledCard

export default function TopPodcastListing() {
	const [loading, setLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')
	const [podcasts, setPodcasts] = useState([])

	const { genreId } = useParams()
	const location = useLocation()

	const theme = useTheme()

	const populateListing = async () => {
		try {
			const options = {
				headers: { 'X-ListenAPI-Key': process.env.REACT_APP_API_KEY },
			}
			const resp = await axios.get(`${BASE_URL}/best_podcasts?genre_id=${genreId}`, options)

			setPodcasts(resp.data.podcasts)
			setLoading(false)
		} catch (err) {
			console.error(err)
			setErrorMessage(err.message)
		}
	}

	useEffect(() => {
		populateListing()
	}, [])

	return (
		<BaseContainer>
			{loading ? (
				<>
					<Divider />
					<Skeleton loading={loading} active />
					<Divider />
					<Skeleton loading={loading} active />
				</>
			) : (
				<>
					<Header size='large' color={theme.text.primary}>
						Top podcasts in {location.state.genreName}
					</Header>
					<Divider />
					<PogcastListing pogs={podcasts} loading={loading} />
				</>
			)}
		</BaseContainer>
	)
}
