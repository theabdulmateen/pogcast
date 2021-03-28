import styled from 'styled-components'

const QueueListContainer = styled.div`
	position: absolute;
	bottom: 87px;
	right: 2px;
	min-height: 100px;
	max-height: 500px;
	min-width: 500px;
	max-width: 45%;
	overflow: hidden;
	background-color: #181818;
	border: 1px solid #101010;
	border-radius: 3px;
	padding: 5px;
	display: flex;
	flex-direction: ${props => props.flexDirection};
`
const QueueItemContainer = styled.div`
	display: flex;
`

const ScrollableList = styled.div`
	overflow: auto;
`

const EmptyQueue = styled.p`
	align-self: center;
	font-size: 16px;
	font-weight: 600;
	margin: 0;
`

const QueueHeader = styled.div`
	padding: 5px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	border: 5px solid #0d0d0d;
	border-radius: 5px;
`

const HeaderBlock = styled.div`
	padding: 5px;
	margin-right: auto;
	border-radius: 5px;
`

const Queue = {
	QueueListContainer,
	EmptyQueue,
	QueueItemContainer,
	ScrollableList,
	QueueHeader,
	HeaderBlock,
}

export default Queue
