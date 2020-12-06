import React from 'react'
import styled from 'styled-components'

const formatAudioTimer = timeRaw => {
	let hour = null
	let min = null
	let sec = timeRaw

	if (timeRaw > 3600) {
		hour = Math.floor(sec / 3600)
		hour = hour >= 10 ? hour : '0' + hour
		sec = Math.floor(sec % 3600)
	}

	min = Math.floor(sec / 60)
	min = min >= 10 ? min : '0' + min

	sec = Math.floor(sec % 60)
	sec = sec >= 10 ? sec : '0' + sec

	return hour ? `${hour}:${min}:${sec}` : `${min}:${sec}`
}

export default function TimerDisplay({ timer, position }) {
	return (
		<StyledTimer position={position}>{timer ? formatAudioTimer(timer) : '00:00'}</StyledTimer>
	)
}

const StyledTimer = styled.div`
	align-self: flex-end;
	margin-bottom: 2px;
	margin-left: ${props => (props.position === 'left' ? 'auto' : '10px')};
	margin-right: ${props => (props.position === 'right' ? 'auto' : '10px')};
`
