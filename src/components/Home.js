import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useRandomEpisode } from '../hooks/useRandomEpisode'
import StyledButtons from './elements/StyledButton'

const { ActionButton } = StyledButtons

export default function Home() {
	const playRandomEpisode = useRandomEpisode()

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
							playRandomEpisode()
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

const HomeContainer = styled.div`
	background: url(/images/POGCASTS_LANDING_BACKGROUND.jpg) center no-repeat;
	background-size: cover;
	position: relative;
	width: 100%;
	height: calc(100vh - 85px);
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
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
