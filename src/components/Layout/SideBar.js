import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const SideBarContainer = styled.nav`
	position: fixed;
	z-index: 1;
	width: 75px;
	height: 100%;
	background-color: ${props => props.theme.background.sidebar};
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-bottom: 95px;

	.sidebar-item-active {
		div {
			color: ${props => props.theme.text.primary} !important;
		}

		&::before {
			height: 40px !important;
		}
	}
`

const SideBarItem = styled.div`
	position: relative;
	letter-spacing: 4px;
	margin: 1.5em;
	line-height: 1.5em;
	transition: color 100ms linear;
	cursor: pointer;

	&:hover {
		&::before {
			height: 20px;
		}

		& div {
			color: ${props => props.theme.text.default[500]};
		}
	}

	&::before {
		content: '';
		position: absolute;
		top: 50%;
		left: -10px;
		height: 0;
		border-radius: 999px;
		transform: translate(-50%, -50%);
		border-left: 5px solid ${props => props.theme.text.primary};
		transition: height 100ms linear;
	}

	&::after {
		content: '';
	}
`

const NavButton = styled.div`
	font-family: 'MontserratBold';
	color: ${props => props.theme.text.default[600]};
	writing-mode: vertical-lr;
	text-orientation: sideways-right;
	transition: color 100ms linear;

	transform: scale(-1, -1);
	-moz-transform: scale(-1, -1);
	-webkit-transform: scale(-1, -1);
	-o-transform: scale(-1, -1);
	-ms-transform: scale(-1, -1);
	transform: scale(-1, -1);

	font-size: 18px;
	font-weight: 700;
	text-align: center;
`

export default function SideBar() {
	const loc = useLocation()

	return (
		<SideBarContainer>
			<Link to='/'>
				<SideBarItem className={loc.pathname === '/' ? 'sidebar-item-active' : ''}>
					<NavButton>Home</NavButton>
				</SideBarItem>
			</Link>
			<Link to='/explore'>
				<SideBarItem className={loc.pathname === '/explore' ? 'sidebar-item-active' : ''}>
					<NavButton>Explore</NavButton>
				</SideBarItem>
			</Link>
			<Link to='/search' className={loc.pathname === '/search' ? 'sidebar-item-active' : ''}>
				<SideBarItem>
					<NavButton>Search</NavButton>
				</SideBarItem>
			</Link>
			<Link to='/'>
				<SideBarItem>
					<NavButton>Feed</NavButton>
				</SideBarItem>
			</Link>
		</SideBarContainer>
	)
}
