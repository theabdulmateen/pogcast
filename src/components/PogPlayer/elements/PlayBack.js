import styled from 'styled-components'

const PlayBackContainer = styled.div`
	display: flex;
	align-self: center;
`
const PlayerButton = styled.div`
	display: flex;
	align-self: center;
	margin: 5px;
	cursor: pointer;

	svg {
		color: #757575;
		height: 17px;
		width: 17px;
	}

	.play-pause > svg {
		height: 30px;
		width: 30px;
		transition: transform 100ms linear;
	}

	&:hover {
		svg {
			color: #bdbdbd;
		}

		.play-pause > svg {
			transform: scale(1.1);
		}
	}
`

const PlayBack = { PlayBackContainer, PlayerButton }

export default PlayBack
