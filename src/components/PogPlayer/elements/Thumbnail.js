import styled from 'styled-components'

const ThumbnailContainer = styled.div`
	display: flex;
	flex-basis: 33%;
`
const StyledThumbnail = styled.div`
	display: flex;
	position: relative;
	width: 75px;
	margin-right: 1.3em;

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
		width: 100%;
	}
`
const Details = styled.div`
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

const Thumbnail = { ThumbnailContainer, StyledThumbnail, Details }

export default Thumbnail
