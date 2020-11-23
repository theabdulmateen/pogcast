import React from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'
import SideBar from './SideBar'

const LayoutContainer = styled.div`
	height: 100%;
`

const ContentContainer = styled.div`
	padding-left: 75px;
	height: 100%;
`

export default function Layout({ children }) {
	return (
		<LayoutContainer>
			<SideBar />
			<NavBar />
			<ContentContainer>{children}</ContentContainer>
		</LayoutContainer>
	)
}
