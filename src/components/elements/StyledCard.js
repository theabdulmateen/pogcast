import styled from 'styled-components'

const PogCard = styled.div`
	background-color: ${props => props.theme.background.content};
	height: 100%;
	border-radius: 10px;
	padding: 7px;
	cursor: pointer;
	transition: background-color 200ms linear;

	&:hover {
		background-color: ${props => props.theme.background.cardHover};
		& > div > img {
			filter: grayscale(75%);
		}
		.play-button {
			display: block;
			transform: translate(-50%, -50%);
			opacity: 1;
			top: 50%;
			filter: none;
		}
	}
`
const Cover = styled.div`
	position: relative;
	margin-bottom: 10px;
	img {
		max-width: 100%;
		border-radius: 10px;
		position: contain;
	}
`
const PogButton = styled.div`
	position: absolute;
	opacity: 0;
	top: 50%;
	left: 50%;
	width: 50px;
	height: 50px;
	transform: translate(-50%, 50%);
	transition: transform 200ms ease-out, opacity 100ms ease-in-out;
`
const Content = styled.div``

const StyledCard = { PogCard, Cover, PogButton, Content }

export default StyledCard
