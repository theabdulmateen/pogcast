import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Divider } from 'antd'

import Container from './elements/Container'
import Typography from './elements/Typography'

import PogcastListing from './PogcastListing'

const { Header } = Typography
const { BaseContainer } = Container

export default function TopPodcastListing() {
	const { genreId } = useParams()
	const location = useLocation()
	const theme = useTheme()

	return (
		<BaseContainer>
			<Header size='large' color={theme.text.primary}>
				Top podcasts in {location.state.genreName}
			</Header>
			<Divider />
			<PogcastListing genreId={genreId} />
		</BaseContainer>
	)
}
