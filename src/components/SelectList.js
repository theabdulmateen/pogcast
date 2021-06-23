import { useState } from 'react'
import styled from 'styled-components'

export default function SelectList({ data = [], multiple = true, setValue, isOpen, listItemType = 'radio' }) {
	// const [ isOpen, setIsOpen ] = useState(true)
	const [ currentValue, setCurrentValue ] = useState('')

	return (
		<Container>
			<ToggleButton>select stuff</ToggleButton>
			<List isOpen={isOpen}>
				{data &&
					data.map((value) => (
						<Item key={value}>
							<input type={listItemType} value={currentValue} />
							<label>{value}</label>
						</Item>
					))}
			</List>
		</Container>
	)
}

const Container = styled.div`position: relative;`
const ToggleButton = styled.button`appearance: none;`
const List = styled.ul`
	display: ${(props) => (props.isOpen ? 'block' : 'none')};
	position: absolute;
	top: 2em;
	border-radius: 0.4em;
	z-index: 20;
	background: #212121;
	min-width: 500px;
`
const Item = styled.li`
	width: 25%;
	float: left;
	list-style-type: none;
`
