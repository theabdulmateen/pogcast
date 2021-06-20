import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'
import { useTheme } from 'styled-components'

import Container from './elements/Container'
import Typography from './elements/Typography'
import StyledModal from './elements/StyledModal'
import StyledButton from './elements/StyledButton'

import { useViewLimiter } from '../hooks/useViewLimiter'
import { useAuth } from '../hooks/useAuth'

import PogcastCard from './PogcastCard'
import ContinueEpisodeListing from './ContinueEpisodeListing'
import { db } from '../firebase'

const { ActionButton } = StyledButton
const { Header, Description } = Typography
const { PogListContainer, BaseContainer } = Container

export default function Feed() {
	const [ authPopupOpen, setAuthPopupOpen ] = useState(false)
	const [ pogcastIds, setPogcastIds ] = useState([])

	const [ user, signinHandler ] = useAuth()
	const theme = useTheme()
	const viewLimit = useViewLimiter()

	const closeAuthPopup = () => setAuthPopupOpen(false)

	useEffect(
		() => {
			if (user) {
				closeAuthPopup()
			} else {
				setAuthPopupOpen(true)
			}
		},
		[ user ],
	)

	useEffect(
		() => {
			if (!user) {
				return
			}
			db
				.collection('feeds')
				.doc(user.uid)
				.get()
				.then((doc) => {
					if (doc.exists) {
						const pogcastIds = Object.entries(doc.data().saved)
							.filter(([ _, isSaved ]) => isSaved)
							.map(([ pogcastId ]) => pogcastId)
						setPogcastIds(pogcastIds)
					}
				})
				.catch((err) => console.log(err))
		},
		[ user ],
	)

	return (
		<BaseContainer>
			<StyledModal
				style={{
					overlay: {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'rgba(0, 0, 0, 0.2)',
					},
				}}
				isOpen={authPopupOpen}
				onRequestClose={() => user && closeAuthPopup()}
			>
				<div>
					<h1 style={{ marginTop: '0' }}>You are not logged in</h1>
					<div style={{ display: 'grid', placeItems: 'center' }}>
						<Description>Please sign in to continue</Description>
						<ActionButton
							onClick={signinHandler}
							type="primary"
							style={{ height: '40px', marginRight: '0', marginTop: '2em' }}
						>
							sign in
						</ActionButton>
					</div>
				</div>
			</StyledModal>

			<Divider />
			<Header size="large" color={theme.text.primary}>
				Your Feed
			</Header>
			<Divider />

			{user && pogcastIds.length > 0 ? (
				<Header size="medium" color={theme.text.default[600]}>
					Saved Podcasts
				</Header>
			) : (
				<EmptyFeeds />
			)}
			<Divider />

			<div>
				<PogListContainer viewLimit={viewLimit}>
					{pogcastIds.map((pogId) => <PogcastCard key={pogId} pogId={pogId} />)}
				</PogListContainer>
			</div>

			{user && <ContinueEpisodeListing />}
		</BaseContainer>
	)
}

const EmptyFeeds = () => {
	const theme = useTheme()

	return (
		<React.Fragment>
			<Header size="large" color={theme.primary}>
				Its empty in here
			</Header>
			<Divider />
			<Header size="medium" style={{ marginTop: '20px', marginBottom: '100px' }} color={theme.text.default[600]}>
				Explore our catalogue
			</Header>
			<Link to="/explore">
				<ActionButton style={{ marginBottom: '20px' }} type="primary">
					EXPLORE
				</ActionButton>
			</Link>
			<Description style={{ fontSize: '18px', lineHeight: '20px' }}>
				Exlpore podcasts and bookmark the ones you like! Start listening now
			</Description>
		</React.Fragment>
	)
}
