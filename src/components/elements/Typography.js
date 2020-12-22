import styled from 'styled-components'

const fontSize = {
	large: '65px',
	medium: '30px',
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
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
`
const Description = styled.p`
	color: ${props => props.theme.text.default[600]};
	font-size: 12px;
	line-height: 13px;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
`
const Typography = { Header, Title, Description }

export default Typography
