import React from 'react'
import { PlayCircleFilled } from '@ant-design/icons'

import Image from './Image'

import Typography from './elements/Typography'
import StyledButton from './elements/StyledButton'
import Episode from './elements/Episode'

import { useEpisodes } from '../hooks/useEpisodes'
import { useQueue } from '../hooks/useQueue'

const { IconButton } = StyledButton
const { Title, Description } = Typography
const { EpisodeCardContainer, EpisodeContent, EpisodeCover, ControlsContainer } = Episode

export default function EpisodeCard({ ep, pogId, pogcastTitle, epQueue, toSeek }) {
	const [addToQueue] = useQueue()
	const [playEpisode] = useEpisodes()

	return (
		<EpisodeCardContainer key={ep.id}>
			<EpisodeCover>
				<Image source={ep.thumbnail} alt='episode cover' />
			</EpisodeCover>
			<EpisodeContent>
				<Title style={{ fontSize: 16, color: '#A3A3A3' }}>{ep.title}</Title>
				<Description style={{ fontSize: 14, lineHeight: '17px' }}>
					{ep.description.replace(/(<([^>]+)>)/gi, '')}
				</Description>
				<ControlsContainer>
					<IconButton
						onClick={() => {
							playEpisode({
								epId: ep.id,
								pogId: pogId,
								seek: toSeek,
								duration: ep.audio_length_sec,
								title: ep.title,
								src: ep.audio,
								thumbnail: ep.thumbnail,
								showName: pogcastTitle,
								epQueueList: epQueue,
							})
						}}>
						<PlayCircleFilled />
					</IconButton>

					<IconButton onClick={() => addToQueue(ep, pogcastTitle)}>
						Add to queue
					</IconButton>
				</ControlsContainer>
			</EpisodeContent>
		</EpisodeCardContainer>
	)
}
