import styled from 'styled-components'
import Modal from 'react-modal'

const StyledModal = styled(Modal)`
	background-color: ${props => props.theme.background.player};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4em 8em;
	border-radius: 0.7em;
`

export default StyledModal
