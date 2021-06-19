import React from 'react'
import { Link } from 'react-router-dom'

import Image from './Image'
import PlayButtonSvg from './static/PlayButton.svg'

import StyledCard from './elements/StyledCard'
import Typography from './elements/Typography'

import { usePogcast } from '../hooks/usePogcast'
import { Skeleton } from 'antd'

const { Title, Description } = Typography
const { PogCard, Cover, PogButton, Content } = StyledCard

export default function PogcastCard({ pogId }) {
	const { data, isLoading, isError } = usePogcast(pogId)

	if (isError) {
		return <div>error fetching pogcast</div>
	}

	if (isLoading) {
		return (
			<div>
				<PogCard style={{ height: '200px' }}>
					<Content>
						<Skeleton active />
					</Content>
				</PogCard>
			</div>
		)
	}

	return (
		<Link to={`/pogcast/${pogId}`}>
			<PogCard>
				<Cover>
					<Image source={data.pages[0].thumbnail} alt='thumbnail' />
					<PogButton className='play-button'>
						<img src={PlayButtonSvg} alt='Play'></img>
					</PogButton>
				</Cover>
				<Content>
					<Title>{data.pages[0].title}</Title>
					<Description>
						{data.pages[0].description.replace(/(<([^>]+)>)/gi, '')}
					</Description>
				</Content>
			</PogCard>
		</Link>
	)
}
