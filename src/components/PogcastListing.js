import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Skeleton } from 'antd'

import Image from './Image'
import PlayButtonSvg from './static/PlayButton.svg'
import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'

import { useBestPogcasts } from '../hooks/useBestPogcasts'

const { Title, Description } = Typography
const { PogListContainer } = Container
const { PogCard, Cover, PogButton, Content } = StyledCard

export default function PogcastListing({ genreId, viewLimit }) {
	const { isLoading, data: pogs } = useBestPogcasts(genreId)

	if (isLoading) {
		return (
			<div>
				<Divider />
				<Skeleton active />
			</div>
		)
	}

	return (
		<PogListContainer viewLimit={viewLimit}>
			{pogs.slice(0, viewLimit).map(pog => (
				<Link key={pog.id} to={`/pogcast/${pog.id}`}>
					<PogCard>
						<Cover>
							<Image source={pog.thumbnail} alt='thumbnail' />
							<PogButton className='play-button'>
								<img src={PlayButtonSvg} alt='Play'></img>
							</PogButton>
						</Cover>
						<Content>
							<Title>{pog.title}</Title>
							<Description>
								{pog.description.replace(/(<([^>]+)>)/gi, '')}
							</Description>
						</Content>
					</PogCard>
				</Link>
			))}
		</PogListContainer>
	)
}
