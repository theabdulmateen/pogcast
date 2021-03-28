import React, { useState } from 'react'
import { Empty } from 'antd'
import { MenuUnfoldOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { usePlayerContext } from '../../contexts/PlayerContext'
import QueueItem from './QueueItem'
import StyledButtons from '../elements/StyledButton'
import QueueElements from './elements/Queue'
import constants from '../../constants'
import Text from 'antd/lib/typography/Text'

const { UPDATE_QUEUE } = constants
const { ControlsButton } = StyledButtons
const { QueueListContainer, EmptyQueue, ScrollableList, QueueHeader, HeaderBlock } = QueueElements

export default function Queue() {
	const [playerState, playerDispatch] = usePlayerContext()
	const [open, setOpen] = useState(false)

	const onDragEnd = result => {
		const { destination, source } = result

		if (!destination) {
			return
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return
		}

		const newQueue = playerState.epQueue
		const draggedItem = playerState.epQueue[source.index]
		newQueue.splice(source.index, 1)
		newQueue.splice(destination.index, 0, draggedItem)
		playerDispatch({ type: UPDATE_QUEUE, payload: { epQueue: newQueue } })
	}

	const QueueList = () => {
		if (!playerState.epQueue || playerState.epQueue.length === 0) {
			return (
				<QueueListContainer>
					<Empty description={false} />
					<EmptyQueue>Queue is empty...</EmptyQueue>
				</QueueListContainer>
			)
		} else {
			return (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='queue' style={{ width: '100%' }}>
						{provided => (
							<QueueListContainer flexDirection='column'>
								<QueueHeader>
									<HeaderBlock>
										<Text strong>Next in Queue </Text>
									</HeaderBlock>
									<div>
										<ControlsButton
											onClick={() => setOpen(!open)}
											style={{ width: 'auto' }}>
											<CloseCircleOutlined style={{ fontSize: '20px' }} />
										</ControlsButton>
									</div>
								</QueueHeader>

								<ScrollableList
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{playerState.epQueue.map((ep, index) => (
										<QueueItem key={ep.epId} ep={ep} index={index} />
									))}
									{provided.placeholder}
								</ScrollableList>
							</QueueListContainer>
						)}
					</Droppable>
				</DragDropContext>
			)
		}
	}

	return (
		<div>
			<ControlsButton onClick={() => setOpen(!open)}>
				<MenuUnfoldOutlined />
			</ControlsButton>

			{open && <QueueList />}
		</div>
	)
}
