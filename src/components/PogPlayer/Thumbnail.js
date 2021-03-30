import React from 'react'
import { HeartFilled, HeartOutlined, TagFilled } from '@ant-design/icons'
import { Typography as AntTypography } from 'antd'

import StyledButtons from '../elements/StyledButton'
import ThumbnailElements from './elements/Thumbnail'

import Api from '../../helper/api'
import { useIsSavedPogcast } from '../../hooks/useIsSavedPogcast'
import { usePlayerContext } from '../../contexts/PlayerContext'

const { ThumbnailContainer, StyledThumbnail, Details, ActionButtonsContainer } = ThumbnailElements
const { Title, Text } = AntTypography
const { ControlsButton } = StyledButtons

const api = new Api()

export default function Thumbnail() {
	const [playerState] = usePlayerContext()
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
