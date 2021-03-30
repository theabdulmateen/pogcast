import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Skeleton } from 'antd'
import { useTheme } from 'styled-components'

import PogcastListing from './PogcastListing'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'

import { useGenres } from '../hooks/useGenres'
import { useViewLimiter } from '../hooks/useViewLimiter'

const { Header, Title } = Typography
const { BaseContainer, PogListContainer } = Container
const { PogCard, Content } = StyledCard
const { LinkButton } = StyledButton

export default function Explore() {
	const viewLimit = useViewLimiter()
	const theme = useTheme()

	const { isLoading, data: genres, isError } = useGenres()

	if (isLoading) {
		return (
			<BaseContainer>
				<Divider />
				<Skeleton active />
				<Divider />
				<Skeleton active />

				<Divider />

				<Skeleton.Button />
			</BaseContainer>
		)
	}

	if (isError) {
		return (
			<BaseContainer>
				<h4>Error fetching podcasts...</h4>
			</BaseContainer>
		)
	}

	return (
		<BaseContainer>
			<Header size='large' color={theme.primary}>
				EXPLORE PODCASTS
			</Header>

			{genres.map((genre, index) => (
				<div key={index}>
					<Divider />
					<Header size='medium' color={theme.text.default[600]}>
						Top podcasts in {genre.name}
						<Link
							to={{
								pathname: `/top-podcasts/${genre.id}`,
								state: { genreName: genre.name },
							}}>
							<LinkButton type='link'>show all</LinkButton>
						</Link>
					</Header>
					<PogcastListing genreId={genre.id} viewLimit={viewLimit} />
				</div>
			))}

			<Divider />

			<Header size='medium' color={theme.text.default[600]}>
				Select podcast by Category
				<Link to='/genrelisting'>
					<LinkButton type='link'>show all</LinkButton>
				</Link>
			</Header>

			<PogListContainer>
				{genres.slice(0, viewLimit || 8).map(genre => (
					<PogCard key={genre.id}>
						<Skeleton loading={isLoading} active>
							<Content>
								<Title>{genre.name.substring(0, 50)}</Title>
							</Content>
						</Skeleton>
					</PogCard>
				))}
			</PogListContainer>
		</BaseContainer>
	)
}
