import styled from 'styled-components'

const ThumbnailContainer = styled.div`
	display: flex;
	flex-basis: 33%;
	flex-shrink: 0;
`
const StyledThumbnail = styled.div`
	display: flex;
	position: relative;
	width: 75px;
	margin-right: 1.3em;
	flex-shrink: 0;

	&::before {
		content: '';
		position: absolute;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: -2px;
		background-color: #a2a2a2;
	}

	img {
		max-width: 100%;
		height: auto;
	}
`
const Details = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-basis: 75%;

	h4,
	span {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`

const ActionButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	flex-basis: inherit;
`

const Bookmark = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	h4,
	span {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`

const SavedPogcast = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	h4,
	span {
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
`

const ThumbnailElements = {
	ThumbnailContainer,
	StyledThumbnail,
	Details,
	ActionButtonsContainer,
	Bookmark,
	SavedPogcast,
}

export default ThumbnailElements
