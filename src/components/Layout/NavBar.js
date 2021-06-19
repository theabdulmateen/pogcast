import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

import { auth, provider } from '../../firebase'

export default function NavBar() {
	const [, setUser] = useState(null)

	const signinHandler = () => {
		auth.signInWithPopup(provider)
			.then(function (result) {
				// const token = result.credential.accessToken
				// const user = result.user
			})
			.catch(function (error) {
				// const errorCode = error.code
				// const errorMessage = error.message
				// const email = error.email
				// const credential = error.credential
			})
	}

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user)
			} else {
				// signed out
			}
		})
	}, [])

	return (
		<NavBarContainer>
			{auth.currentUser ? (
				<NavBarItem>
					<ProfilePic
						src={auth.currentUser.photoURL}
						alt='https://source.unsplash.com/400x400/?profile pic'
					/>
					<StyledProfileName>{auth.currentUser.displayName}</StyledProfileName>
				</NavBarItem>
			) : (
				<NavBarItem>
					<Button type='link' onClick={signinHandler}>
						Sign in
					</Button>
				</NavBarItem>
			)}
		</NavBarContainer>
	)
}

const NavBarContainer = styled.nav`
	display: flex;
	position: fixed;
	width: 100%;
	height: 75px;
	background-color: transparent;
	z-index: 2;
`

const StyledProfileName = styled.nav`
	user-select: none;
	position: relative;

	&::before {
		content: '';
		position: absolute;
		top: -12px;
		left: -50px;
		z-index: -1;
		border-radius: 50%;
		background-color: #383838;
		width: 46px;
		height: 46px;
	}
`

const ProfilePic = styled.img`
	margin-right: 7px;
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

	& span {
		padding-left: 20px;
		color: ${props => props.theme.text.default[400]};
	}

	${props => props.theme.phoneOnly} {
		display: none;
	}
`
