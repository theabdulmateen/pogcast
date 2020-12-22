import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkButton = styled(Link)`
	font-size: 0.6em;
	color: ${props => props.theme.text.default[500]};
	letter-spacing: -1px;
	float: right;

	&:hover {
		color: ${props => props.theme.text.default[600]};
		text-decoration: underline;
	}
`
const IconButton = styled.div`
	align-self: start;
	margin: 5px;
	margin-top: auto;
	cursor: pointer;

	svg {
		color: #757575;
		height: 25px;
		width: 25px;
	}

	&:hover {
		svg {
			color: #bdbdbd;
		}
	}
`

const StyledButton = { LinkButton, IconButton }

export default StyledButton
