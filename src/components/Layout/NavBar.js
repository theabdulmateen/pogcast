import React from 'react'
import styled from 'styled-components'

const NavBarContainer = styled.nav`
	display: flex;
	position: fixed;
	width: 100%;
	height: 75px;
	background-color: transparent;
	z-index: 2;
`

const NavBarItem = styled.div`
	margin-left: auto;
	position: relative;
	display: flex;
	align-items: center;
	padding-left: 3px;
	padding-right: 100px;

	& img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	&::before {
		content: '';
		position: absolute;
		left: 0;
		z-index: -1;
		border-radius: 50%;
		background-color: #383838;
		width: 46px;
		height: 46px;
	}

	& span {
		padding-left: 20px;
		color: ${props => props.theme.text.default[400]};
	}

	${props => props.theme.phoneOnly} {
		display: none;
	}
`

export default function NavBar() {
	return (
		<NavBarContainer>
			<NavBarItem>
				<img src='https://source.unsplash.com/400x400/?profile pic' alt='user' />
				<span>Kara wills</span>
			</NavBarItem>
		</NavBarContainer>
	)
}
