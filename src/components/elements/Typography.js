import styled from 'styled-components'

const fontSize = {
	large: '75px',
	medium: '45px',
}

const lineHeight = {
	large: '76px',
	medium: '50px',
}

const Header = styled.h2`
	font-family: 'MontserratBold';
	font-size: ${props => fontSize[props.size]};
	line-height: ${props => lineHeight[props.size]};
	color: ${props => props.color};
`
const Title = styled.h4`
	font-family: 'MontserratBold';
	color: ${props => props.theme.text.default[700]};
	font-size: 18px;
	line-height: 20px;
`
const Description = styled.p`
	color: ${props => props.theme.text.default[600]};
	font-size: 12px;
	line-height: 13px;
`
const Typography = { Header, Title, Description }

export default Typography
