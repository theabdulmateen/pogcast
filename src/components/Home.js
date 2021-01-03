import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import Api from '../helper/api'
import constants from '../constants'
import { usePlayerContext } from '../contexts/PlayerContext'

const { PLAY_EPISODE } = constants
const api = new Api()

const HomeContainer = styled.div`
	background: url(/images/POGCASTS_LANDING_BACKGROUND.jpg) center no-repeat;
	background-size: cover;
	position: relative;
	width: 100%;
	height: calc(100vh - 85px);
`

const Jumbotron = styled.div`
	position: absolute;
	top: 50%;
	left: 10%;
	transform: translateY(-50%);
`

const Logo = styled.div`
	color: ${props => props.theme.text.default[500]};
	font-size: 50px;
	font-weight: 600;

	${props => props.theme.phoneOnly} {
		font-size: 25px;
	}
`
const Title = styled.div`
	color: ${props => props.theme.text.default[800]};
	font-family: 'Monoton';
	font-size: 100px;
	line-height: 110px;

	${props => props.theme.phoneOnly} {
		font-size: 36px;
		line-height: 37px;
	}
`
const Caption = styled.div`
	color: ${props => props.theme.text.secondary};
	font-size: 65px;
	font-weight: 600;

	${props => props.theme.phoneOnly} {
		font-size: 30px;
	}
`

const ActionsContainer = styled.div`
	margin-top: 4em;
`

const ActionButton = styled(Button)`
	background-color: ${props => props.type === 'primary' && props.theme.primary};
	color: ${props => props.type === 'default' && props.theme.primary};
	border: 2px solid ${props => props.theme.primary};
	font-weight: 600;
	width: 200px;
	height: 50px;
	margin-right: 4em;
	transition: transform 100ms linear, color 100ms linear;

	&:hover,
	&:active,
	&:focus {
		/* filled button */
		background-color: ${props => props.type === 'primary' && props.theme.primary + 'EE'};

		/* default button */
		border: 2px solid
			${props =>
				props.type === 'default'
					? props.theme.text.default[800]
					: props.theme.primary + 'EE'};
		color: ${props => props.theme.text.default[800] + 'EE'};
	}

	&:hover {
		transform: translateY(-10%);
	}
`

export default function Home() {
	const [playerState, playerDispatch] = usePlayerContext()

	const playEpisode = (title, src, thumbnail, showName) => {
		playerDispatch({
			type: PLAY_EPISODE,
			payload: { title, src, thumbnail, showName, epQueue: playerState.epQueue },
		})
	}

	const fetchRandomEpisode = async () => {
		api.getRandomEpisode()
			.then(ep => playEpisode(ep.title, ep.src, ep.thumbnail, ep.showName))
			.catch(err => console.error(err))
	}

	return (
		<HomeContainer>
			<Jumbotron>
				<Logo>Pogcasts</Logo>
				<Title>
					FIND YOUR <br />
					NEXT FAVORITE <br />
					SHOW
				</Title>
				<Caption>Start listening now</Caption>

				<ActionsContainer>
					<Link to='/explore'>
						<ActionButton type='primary'>EXPLORE</ActionButton>
					</Link>
					<ActionButton
						onClick={e => {
							fetchRandomEpisode()
							e.target.blur()
						}}
						type='default'>
						PLAY RANDOM
					</ActionButton>
				</ActionsContainer>
			</Jumbotron>
		</HomeContainer>
	)
}
