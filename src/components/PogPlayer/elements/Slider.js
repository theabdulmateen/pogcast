import ReactSlider from 'react-slider'
import styled, { css } from 'styled-components'

const SliderContainer = styled.div`
	display: flex;
	flex-basis: 40%;
	flex-direction: column;
`
const StyledSlider = styled(ReactSlider)`
	width: 100%;
	height: 6px;
	margin-top: auto;
	margin-bottom: 10px;

	.active-thumb:focus {
		outline: none !important;
	}

	${props =>
		props.active &&
		css`
			.thumb {
				background-color: #bdbdbd;
			}

			.track-0 {
				background-color: #824a4a;
			}
		`}
`

const StyledThumb = styled.div`
	height: 15px;
	width: 15px;
	background-color: #424242;
	border-radius: 100%;
	transform: translateY(calc(-50% + 3px));
	cursor: normal;
`
const Thumb = (props, state) => <StyledThumb className='slider-thumb' {...props} />

const StyledTrack = styled.div`
	top: 0;
	bottom: 0;
	background: ${props => (props.index === 1 ? '#757575' : '#BDBDBD')};
	border-radius: 999px;
`
const Track = (props, state) => (
	<StyledTrack className='slider-track' {...props} index={state.index} />
)

const Slider = { SliderContainer, StyledSlider, Thumb, Track }

export default Slider
