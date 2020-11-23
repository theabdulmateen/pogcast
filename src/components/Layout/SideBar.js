import React from 'react'
import styled from 'styled-components'

const SideBarContainer = styled.nav`
	position: fixed;
	width: 75px;
	height: 100%;
	background-color: ${props => props.theme.background.sidebar};
`

const SideBarItem = styled.div`
	height: 125px;
`

const Text = styled.div`
	transform: translateY(250%) rotate(-90deg);
	text-align: center;
`

export default function SideBar() {
	return (
		<SideBarContainer>
			<SideBarItem>
				<Text>Home</Text>
			</SideBarItem>
			<SideBarItem>
				<Text>Explore</Text>
			</SideBarItem>
			<SideBarItem>
				<Text>Favorites</Text>
			</SideBarItem>
			<SideBarItem>
				<Text>Feed</Text>
			</SideBarItem>
		</SideBarContainer>
	)
}
