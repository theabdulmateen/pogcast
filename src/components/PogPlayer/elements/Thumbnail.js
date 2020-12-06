import styled from 'styled-components'

const ThumbnailContainer = styled.div`
	display: flex;
	flex-basis: 33%;
`
const StyledThumbnail = styled.div`
	display: flex;
	position: relative;
	width: 60px;
	margin-right: 2em;

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

	h4 {
		margin: 0;
	}
`

const Thumbnail = { ThumbnailContainer, StyledThumbnail, Details }

export default Thumbnail
