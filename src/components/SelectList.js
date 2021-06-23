// import { useState } from 'react'
// import styled from 'styled-components'

// const filters = {
// 	LANGUAGE: 'language',
// 	REGION: 'region',
// 	GENRE: 'genre',
// }

// export default function SelectList({ popupOpen, setPopupOpen, filterType, setValue, data, labels }) {

// 	return (
// 			<Container>
// 				<ToggleButton
// 					onClick={() => setPopupOpen((prev) => (prev === filterType ? '' : filterType))}
// 					isActive={popupOpen === filterType}
// 				>
// 					Region <span>{regions && ((region in regions && regions[region]) || 'Any region')}</span>
// 				</ToggleButton>
// 				<List
// 					isOpen={popupOpen === filterType}
// 					onClick={(Event) => {
// 						if (Event.target.value) {
// 							setValue(Event.target.value)
// 							setPopupOpen('')
// 						}
// 					}}
// 				>
// 					{data &&
// 						data.map(((item, index) => (
// 							<label for={item}>
// 								<Item key={index} selected={region === code}>
// 									<Radio id={code} type="radio" name="region" value={code} />
// 									<RadioControl />
// 									<p>{reg}</p>
// 								</Item>
// 							</label>
// 						))}
// 				</List>
// 			</Container>
// 	)
// }

// const FilterContainer = styled.div`
// 	background-color: #1c1c1c;
// 	display: flex;
// 	padding: 1.2em 1em;
// 	border-radius: 0.4em;
// 	margin-bottom: 4em;
// 	gap: 0.4em;
// `
// const Container = styled.div`position: relative;`
// const ToggleButton = styled.button`
// 	height: 30px;
// 	width: 175px;
// 	background-color: ${(props) => (props.isActive ? '#212121 !important' : '#242424')};
// 	color: ${(props) => props.theme.text.default[500]};
// 	text-align: center;
// 	border: none;
// 	outline: none;
// 	cursor: pointer;
// 	padding: 0.4em 1.2em;
// 	transition: background-color 100ms linear;
// 	white-space: nowrap;
// 	text-overflow: ellipsis;
// 	overflow: hidden;

// 	&:hover {
// 		background-color: #272727;
// 	}

// 	& span {
// 		color: ${(props) => props.theme.text.main};
// 	}
// 	& span::after {
// 		content: '\f078';
// 		font-family: "Font Awesome 5 Free";
// 		font-weight: 900;
// 		border: none;
// 		vertical-align: middle;
// 		font-size: .85em;
// 		color: #d5d5d5;
// 		margin-left: .255em;
// 	}
// `
// const List = styled.ul`
// 	display: ${(props) => (props.isOpen ? 'block' : 'none')};
// 	position: absolute;
// 	z-index: 1;
// 	top: 38px;
// 	border-radius: 0.4em;
// 	background: #212121;
// 	min-width: 750px;
// 	max-height: 600px;
// 	overflow-y: auto;
// 	padding: 1em 2em;
// `
// const Item = styled.li`
// 	display: flex;
// 	align-items: center;
// 	width: 25%;
// 	float: left;
// 	list-style-type: none;
// 	cursor: pointer;
// 	padding: 0.2em 0.4em;
// 	border-radius: 0.2em;
// 	color: ${(props) => (props.selected ? props.theme.text.default[800] : props.theme.text.default[500])};

// 	&:hover {
// 		background-color: #2d2d2d;
// 		color: ${(props) => props.theme.text.default[800]};
// 	}

// 	& p {
// 		margin: 0;
// 		cursor: pointer;
// 		white-space: nowrap;
// 		text-overflow: ellipsis;
// 		overflow: hidden;
// 	}

// 	& span {
// 		background-color: ${(props) =>
// 			props.selected ? props.theme.text.default[800] : props.theme.text.default[300]};
// 	}
// `
// const Radio = styled.input`
// 	float: left;
// 	list-style-type: none;
// 	cursor: pointer;
// 	opacity: 0;
// 	width: 0;
// 	height: 0;
// `
// const RadioControl = styled.span`
// 	display: block;
// 	margin-right: 0.4em;
// 	width: 10px;
// 	height: 10px;
// 	border-radius: 50%;
// `
