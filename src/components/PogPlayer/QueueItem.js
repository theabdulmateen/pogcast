import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { MenuOutlined, DeleteOutlined } from '@ant-design/icons'

import StyledButtons from '../elements/StyledButton'
import { usePlayerContext } from '../../contexts/PlayerContext'
import constants from '../../constants'

const { POP_FROM_QUEUE } = constants
const { ControlsButton } = StyledButtons

export default function QueueItem({ ep, index }) {
	const [, playerDispatch] = usePlayerContext()

	const removeFromQueue = () => {
		playerDispatch({ type: POP_FROM_QUEUE, payload: { index } })
	}
	return (
		<Draggable draggableId={ep.epId} index={index}>
			{(provided, snapshot) => (
				<QueueItemContainer
					{...provided.draggableProps}
					ref={provided.innerRef}
					isDragging={snapshot.isDragging}>
					<DragHandler {...provided.dragHandleProps}>
						<MenuOutlined />
					</DragHandler>
					<Thumbnail>
						<img src={ep.thumbnail} alt='' />
					</Thumbnail>
					<EpisodeDetails>
						<h4>{ep.title}</h4>
						<span>{ep.showName}</span>
					</EpisodeDetails>
					<ControlsContainer>
						<ControlsButton onClick={removeFromQueue} style={{ width: 'auto' }}>
							<DeleteOutlined style={{ fontSize: '20px' }} />
						</ControlsButton>
					</ControlsContainer>
				</QueueItemContainer>
			)}
		</Draggable>
	)
}

const QueueItemContainer = styled.div`
	display: flex;
	padding: 10px 0px;
	margin: 2px 0;
	background-color: #101010;
	box-shadow: ${props => (props.isDragging ? '0 8px 6px -6px black' : '')};
`

const DragHandler = styled(ControlsButton)`
	align-self: center;
	width: auto;
	cursor: move;

	svg {
		width: 20px;
		height: 20px;
	}
`

const Thumbnail = styled.div`
	align-self: center;
	img {
		width: 70px;
		height: 85%;
		border-radius: 5px;
	}
	margin-right: 14px;
`

const EpisodeDetails = styled.div`
	align-self: center;
	padding-top: 5px;
	h4 {
		font-weight: 600;
	}
	h4,
	span {
		margin-bottom: 2px;
		text-overflow: ellipsis;
	}
	span:hover {
		text-decoration: underline;
	}
`

const ControlsContainer = styled.div`
	align-self: center;
	margin-left: auto;
`
