import styled, { css } from 'styled-components'

const BaseContainer = styled.div`
	padding: 5em;
	height: 100%;
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
`
const PogListContainer = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: repeat(
		${props => props.viewLimit || 8},
		minmax(0, 1fr)
	); // min width of 0 to prevent overflow and grid blowup
	gap: 20px;

	${props =>
		!props.viewLimit &&
		css`
			grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
			grid-template-rows: auto;
		`}
`
const PogPlayerContainer = styled.div`
	background-color: #282828;
	padding: 10px;
	height: 85px;
	position: fixed;
	z-index: 2;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-content: space-between;
	justify-content: space-between;
	-webkit-user-select: none; /* Safari */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* IE10+/Edge */
	user-select: none; /* Standard */
`
const ControlsContainer = styled.div`
	display: flex;
	flex-basis: 33%;
	align-items: center;
	justify-content: flex-end;
`

const Container = { BaseContainer, PogListContainer, PogPlayerContainer, ControlsContainer }

export default Container
