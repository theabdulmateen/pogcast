import styled from 'styled-components'

const BaseContainer = styled.div`
	padding: 5em;
	height: 100%;
`

const PogListContainer = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: repeat(7, minmax(200px, 1fr));
	gap: 20px;
`

const Container = { BaseContainer, PogListContainer }

export default Container
