import styled from 'styled-components'

const BaseContainer = styled.div`
	padding: 5em;
	height: 100%;
`
const PogListContainer = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: repeat(${props => props.viewLimit || 7}, minmax(auto, 1fr));
	gap: 20px;
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
`
const ControlsContainer = styled.div`
	display: flex;
	flex-basis: 33%;
	align-items: center;
	justify-content: flex-end;
`

const Container = { BaseContainer, PogListContainer, PogPlayerContainer, ControlsContainer }

export default Container
