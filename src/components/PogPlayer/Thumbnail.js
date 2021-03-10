import { HeartOutlined, TagFilled, HeartFilled } from '@ant-design/icons'
import { Typography as AntTypography } from 'antd'
import React, { useEffect, useState } from 'react'
import { usePlayerContext } from '../../contexts/PlayerContext'
import StyledButtons from '../elements/StyledButton'
import ThumbnailElements from './elements/Thumbnail'
import constants from '../../constants'
import Api from '../../helper/api'
import { auth, db } from '../../firebase'
import { useIsSavedPogcast } from '../../hooks/useIsSavedPogcast'

const {
	ThumbnailContainer,
	StyledThumbnail,
	Details,
	ActionButtonsContainer,
	SavedPogcast,
} = ThumbnailElements
const { Title, Text } = AntTypography
const { ControlsButton } = StyledButtons
const { TOGGLE_SAVE_POGCAST } = constants

const api = new Api()

export default function Thumbnail() {
	const [playerState, playerDispatch] = usePlayerContext()
	const [isSaved] = useIsSavedPogcast(playerState.epId)

	return (
		<ThumbnailContainer>
			{playerState.isLoaded && (
				<>
					<StyledThumbnail>
						<img src={playerState.thumbnail} alt='thumbnail' />
					</StyledThumbnail>
					<Details>
						<Title level={4}>{playerState.title}</Title>
						<Text>{playerState.showName}</Text>
					</Details>
					<ActionButtonsContainer>
						<ControlsButton
							onClick={() => {
								api.getPogcastIdFromEpId(playerState.epId).then(pogId =>
									api.toggleSavePogcast(pogId)
								)
							}}
							style={{ width: 14 }}>
							{!isSaved ? <HeartOutlined /> : <HeartFilled />}
						</ControlsButton>
						<ControlsButton style={{ width: 14 }}>
							<TagFilled />
						</ControlsButton>
					</ActionButtonsContainer>
				</>
			)}
		</ThumbnailContainer>
	)
}
