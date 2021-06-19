import styled from 'styled-components'

const EpisodesContainer = styled.div`
	display: flex;
	flex-direction: column;
`
const EpisodeCardContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr;
	grid-template-areas: 'cover content';
	gap: 15px;

	background-color: ${props => props.theme.background.card};
	border-radius: 10px;
	padding: 10px;
	margin: 20px 0;
`
const EpisodeCover = styled.div`
	margin-bottom: 10px;
	grid-area: cover;

	img {
		min-width: 125px;
		max-width: 100%;
		height: auto;
		border-radius: 10px;
		position: contain;
	}
`
const EpisodeContent = styled.div`
	grid-area: content;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`

const ControlsContainer = styled.div`
	margin-top: auto;
`

const Episode = {
	EpisodesContainer,
	EpisodeCardContainer,
	EpisodeCover,
	EpisodeContent,
	ControlsContainer,
}

export default Episode
