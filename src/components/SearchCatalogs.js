import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import Container from './elements/Container'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'
import Typography from './elements/Typography'

import { useGenres } from '../hooks/useGenres'
import { useSearch } from '../hooks/useSearch'

import Image from './Image'
import Filters from './Filters'

import { debounce } from '../helper/debounce'

const { Search } = Input
const { PogListContainer } = Container
const { Title, Description } = Typography
const { PogCard, Cover, Content } = StyledCard
const { ActionButton } = StyledButton

export default function SearchCatalogs() {
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ enabled, setEnabled ] = useState(false)
	const [ filters, setFilters ] = useState({})
	const { data: genres } = useGenres()
	const { data, isLoading, status, hasNextPage, fetchNextPage } = useSearch(searchTerm, 'podcast', enabled)

	const searchResultRef = useRef()

	useEffect(
		() => {
			if (status === 'success') {
				searchResultRef.current.scrollIntoView({ behavior: 'smooth' })
				// setSearchTerm('')
				// setEnabled(false)
			}
		},
		[ status ],
	)

	return (
		<SearchContainer>
			<Wrapper>
				<Jumbotron>
					<PrimaryTitle>Pogcast</PrimaryTitle>
					<StyledSearch
						allowClear
						loading={isLoading}
						prefix={<SearchOutlined />}
						enterButton="Search"
						size="large"
						onChange={debounce((Event) => {
							if (Event.target.value) {
								setSearchTerm(Event.target.value)
								setEnabled(true)
							}
						}, 1000)}
						placeholder="Search for a podcast or an episode..."
					/>
					<Caption>Search for podcast or an episode using keyword - powered by listen notes</Caption>
					<Link to="/explore">
						<ActionButton type="primary">Go to explore</ActionButton>
					</Link>
				</Jumbotron>
			</Wrapper>

			<ListingContainer ref={searchResultRef}>
				{status === 'success' && (
					<div>
						<Divider />
						<Title style={{ fontSize: '1.2em' }}>
							Search results for
							<span style={{ color: '#8F7251', fontWeight: 900, fontSize: '1.2em', marginLeft: '0.8em' }}>
								{searchTerm}
							</span>
						</Title>
						<Divider />
						<div>
							<Filters setFilters={setFilters} />
						</div>
					</div>
				)}
				<PogListContainer>
					{!isLoading &&
						status === 'success' &&
						data &&
						data.pages.map((pogs) =>
							pogs.map((pog) => (
								<Link key={pog.id} to={`/pogcast/${pog.id}`}>
									<PogCard>
										<Cover>
											<Image source={pog.thumbnail} alt="thumbnail" />
										</Cover>
										<Content>
											<Title>{pog.title}</Title>
											<Description>{pog.description.replace(/(<([^>]+)>)/gi, '')}</Description>
										</Content>
									</PogCard>
								</Link>
							)),
						)}
				</PogListContainer>
				{hasNextPage && <button onClick={fetchNextPage}>load more</button>}
			</ListingContainer>
		</SearchContainer>
	)
}

const SearchContainer = styled.div`
	width: 100%;
	min-height: calc(100vh - 85px);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`
const Wrapper = styled.div`
	display: grid;
	place-items: center;
	width: 100%;
`
const Jumbotron = styled.div`
	padding: 2em;
	width: 100%;
	max-width: 700px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;
`
const PrimaryTitle = styled.div`
	color: ${(props) => props.theme.text.default[900]};
	font-size: 6rem;
	font-weight: 600;
	line-height: 85px;
	margin-bottom: 25px;

	${(props) => props.theme.phoneOnly} {
		font-size: 50px;
	}
`
const StyledSearch = styled.input`
	width: 100%;
	height: 55px;
	border: none;
	border-radius: 10px;
	padding: 0px 40px;
	background-color: ${(props) => props.theme.background.player};
	color: ${(props) => props.theme.text.default[800]};
	font-size: 1.2em;
	font-weight: 600;

	&::placeholder {
		color: ${(props) => props.theme.text.default[200]};
	}

	&:focus,
	&:active {
		outline: none !important;
	}
`
const Caption = styled.div`
	color: ${(props) => props.theme.text.default[900]};
	font-size: 1.2em;
	font-weight: 400;
	margin-bottom: 15px;
	overflow-wrap: break-word;

	${(props) => props.theme.phoneOnly} {
		font-size: 18px;
	}
`
const ListingContainer = styled.div`
	padding: 0 5em;
	margin: 85px 0;
`

const GenresContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	width: 77%;
	gap: 8px;
	margin: auto;
	margin-top: 50px;
`
const GenreButton = styled(ActionButton)`
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.text.default[900]};
	border: 2px solid #3c3c3c;
	&:hover {
		color: ${(props) => props.theme.text.default[800]};
		transform: none;
	}
`
const CoverContainer = styled.div`
	width: 100%;
	min-height: calc(100vh - 255px);
	/* background-image: url('images/gene-jeter-kcV7BxcVtU4-unsplash.jpg'); */
	/* background-position: center; */
	/* background-size: cover; */
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
`
