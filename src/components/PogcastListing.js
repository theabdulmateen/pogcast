import React from 'react'
import { Skeleton } from 'antd'
import { Link } from 'react-router-dom'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledCard from './elements/StyledCard'
import PlayButtonSvg from './static/PlayButton.svg'

const { Header, Title, Description } = Typography
const { PogListContainer } = Container
const { PogCard, Cover, PogButton, Content } = StyledCard

export default function PogcastListing({ pogs, viewLimiter, loading }) {
	return (
		<PogListContainer>
			{pogs.slice(0, viewLimiter).map(pog => (
				<Link key={pog.id} to={`/pogcast/${pog.id}`}>
					<PogCard>
						<Skeleton loading={loading} active>
							<Cover>
								<img
									src={pog.thumbnail}
									alt='https://source.unsplash.com/random/400x400'
								/>
								<PogButton className='play-button'>
									<img src={PlayButtonSvg} alt='Play'></img>
								</PogButton>
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
				</Link>
			))}
		</PogListContainer>
	)
}
