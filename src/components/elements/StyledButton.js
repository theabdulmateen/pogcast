import { Button } from 'antd'
import styled from 'styled-components'

const LinkButton = styled.div`
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

const ControlsButton = styled.div`
	width: 10px;
	margin: 0 10px;
	cursor: pointer;

	&:hover {
		svg {
			color: #bdbdbd;
		}
	}
`
const ActionButton = styled(Button)`
	background-color: ${props => props.type === 'primary' && props.theme.primary};
	color: ${props => props.type === 'default' && props.theme.primary};
	border: 2px solid ${props => props.theme.primary};
	font-weight: 600;
	width: 200px;
	height: 50px;
	margin-right: 4em;
	transition: transform 100ms linear, color 100ms linear;

	&:hover,
	&:active,
	&:focus {
		/* filled button */
		background-color: ${props => props.type === 'primary' && props.theme.primary + 'EE'};

		/* default button */
		border: 2px solid
			${props =>
				props.type === 'default'
					? props.theme.text.default[800]
					: props.theme.primary + 'EE'};
		color: ${props => props.theme.text.default[800] + 'EE'};
	}

	&:hover {
		transform: translateY(-10%);
	}
`

const StyledButton = { LinkButton, IconButton, ControlsButton, ActionButton }

export default StyledButton
