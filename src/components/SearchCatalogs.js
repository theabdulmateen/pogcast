import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'

import Container from './elements/Container'

import Api from '../helper/api'
import PogcastListing from './PogcastListing'

const { Search } = Input
const { BaseContainer } = Container
const api = new Api()

const ListContainer = styled(BaseContainer)``

export default function SearchCatalogs() {
	const [pogs, setPogs] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)

	const onSearch = searchText => {
		if (!searchText) {
			return
		}

		setSearchTerm(searchText)
		setLoading(true)
		api.searchCatalogs(searchText)
			.then(results => {
				let podlist = []
				results.forEach(res => {
					const podcast = {
						id: res.id,
						title: res.title_original,
						thumbnail: res.thumbnail,
						description: res.description_original,
					}

					podlist = [...podlist, podcast]
				})
				setPogs(podlist)
				setLoading(false)
			})
			.catch(err => {
				console.error(err)
			})
	}

	return (
		<SearchContainer>
			<ListContainer>
				<CoverContainer>
					<div style={{ width: '65%' }}>
						<Title>Search for a podcast</Title>
						<Search
							allowClear
							loading={loading}
							size='large'
							onSearch={onSearch}
							placeholder='Search for a podcast or an episode...'
						/>
					</div>
				</CoverContainer>
				{pogs.length > 0 && <Title>Search results for {searchTerm}</Title>}
				<PogcastListing pogs={pogs} loading={loading} />
			</ListContainer>
		</SearchContainer>
	)
}

const SearchContainer = styled.div`
	width: 100%;
	min-height: calc(100vh - 85px);
	overflow: hidden;
	position: relative;
`

const CoverContainer = styled.div`
	z-index: 1;
	width: 100%;
	min-height: calc(100vh - 485px);
	top: 0;
	display: grid;
	place-items: center;
`

// const CoverHolder = styled.div`
// 	height: 100%;
// 	width: 100%;
// 	background: url(/images/jonathan-farber-8xpTdO1R3dw-unsplash.jpg) center no-repeat;
// 	background-size: cover;
// 	animation: cover 3s forwards;

// 	@keyframes cover {
// 		0% {
// 			transform: scale(1);
// 		}
// 		100% {
// 			transform: scale(1.2);
// 		}
// 	}
// `

const Title = styled.div`
	color: ${props => props.theme.text.default[600]};
	font-size: 100px;
	font-weight: 600;
	line-height: 85px;
	margin-bottom: 25px;

	${props => props.theme.phoneOnly} {
		font-size: 50px;
	}
`
