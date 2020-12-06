import React from 'react'
import { PlayCircleFilled, StepBackwardFilled, StepForwardFilled } from '@ant-design/icons'

import PlayBackElements from './elements/PlayBack'

const { PlayBackContainer, PlayerButton } = PlayBackElements

export default function PlayBack() {
	return (
		<PlayBackContainer>
			<PlayerButton className='back'>
				<StepBackwardFilled />
			</PlayerButton>
			<PlayerButton>
				<PlayCircleFilled className='play' />
			</PlayerButton>
			<PlayerButton>
				<StepForwardFilled className='forward' />
			</PlayerButton>
		</PlayBackContainer>
	)
}
