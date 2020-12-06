import React from 'react'
import { Typography as AntTypography } from 'antd'

import ThumbnailElements from './elements/Thumbnail'

const { ThumbnailContainer, StyledThumbnail, Details } = ThumbnailElements
const { Title, Text } = AntTypography

export default function Thumbnail({ thumbnail, title, showName }) {
	return (
		<ThumbnailContainer>
			{thumbnail && (
				<StyledThumbnail>
					<img src={thumbnail} alt='thumbnail' />
				</StyledThumbnail>
			)}
			<Details>
				<Title level={4}>{title}</Title>
				<Text>{showName}</Text>
			</Details>
		</ThumbnailContainer>
	)
}
