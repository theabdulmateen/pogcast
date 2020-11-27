import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { PlayCircleFilled } from '@ant-design/icons'

import { PlayerContext } from '../contexts/PlayerContext'

export default function PogPlayer() {
	const [playerState, playerDispatch] = useContext(PlayerContext)

	return <div>player</div>
}
