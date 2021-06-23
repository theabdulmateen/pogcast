import React from 'react'
import styled from 'styled-components'
import PogPlayer from '../PogPlayer'
import NavBar from './NavBar'
import SideBar from './SideBar'

const LayoutContainer = styled.div`height: 100%;`

const ContentContainer = styled.div`
	min-height: 100%;
	padding-left: 75px;
	padding-bottom: 85px;
`

export default function Layout({ children }) {
	return (
		<LayoutContainer>
			<SideBar />
			<NavBar />
			<ContentContainer>{children}</ContentContainer>
			<PogPlayer />
		</LayoutContainer>
	)
}
