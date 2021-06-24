import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'
import styled from 'styled-components'

import Container from './elements/Container'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'
import Typography from './elements/Typography'

import { useSearch } from '../hooks/useSearch'

import Image from './Image'
import Filters from './Filters'

import { debounce } from '../helper/debounce'
import EpisodeCard from './EpisodeCard'

const { PogListContainer } = Container
const { Title, Description } = Typography
const { PogCard, Cover, Content } = StyledCard
const { ActionButton } = StyledButton

export default function SearchCatalogs() {
	const [ searchTerm, setSearchTerm ] = useState('')
	const [ enabled, setEnabled ] = useState(false)
	const [ filters, setFilters ] = useState({})
	const { data, isLoading, status, hasNextPage, fetchNextPage } = useSearch(searchTerm, filters, enabled)

	const searchResultRef = useRef()

	useEffect(
		() => {
			if (status === 'success') {
				searchResultRef.current.scrollIntoView({ behavior: 'smooth' })
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
						<Title style={{ fontSize: '2em' }}>
							Search results for
							<span style={{ color: '#8F7251', fontWeight: 900, fontSize: '1.2em', marginLeft: '0.8em' }}>
								{searchTerm}
							</span>
						</Title>
						<Divider />
						<div>
							<Filters setFilters={setFilters} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
						</div>
					</div>
				)}
				<SearchResultsContainer>
					{!isLoading &&
						status === 'success' &&
						data &&
						data.pages.map(
							(result) =>
								filters.type === 'podcast' ? (
									<PogListContainer>
										{result.map((res) => (
											<Link key={res.id} to={`/pogcast/${res.id}`}>
												<PogCard>
													<Cover>
														<Image source={res.thumbnail} alt="thumbnail" />
													</Cover>
													<Content>
														<Title>{res.title_original}</Title>
														<Description>
															{res.description_original.replace(/(<([^>]+)>)/gi, '')}
														</Description>
													</Content>
												</PogCard>
											</Link>
										))}
									</PogListContainer>
								) : filters.type === 'curated' ? (
									<div>
										{result.map((res) => (
											<div>
												<Title>{res.title_original}</Title>

												<PogListContainer>
													{res.podcasts &&
														res.podcasts.map((pog) => (
															<Link key={pog.id} to={`/pogcast/${pog.id}`}>
																<PogCard>
																	<Cover>
																		<Image source={pog.thumbnail} alt="thumbnail" />
																	</Cover>
																	<Content>
																		<Title>{pog.title}</Title>
																		<Description>{pog.title}</Description>
																	</Content>
																</PogCard>
															</Link>
														))}
												</PogListContainer>
												<Divider />
											</div>
										))}
									</div>
								) : (
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										{result.map(
											(res) =>
												res.audio && (
													<div key={res.id}>
														<EpisodeCard
															ep={{
																...res,
																id: res.id,
																thumbnail: res.thumbnail,
																title: res.title_original,
																description: res.description_original,
															}}
															pogId={res.podcast.id}
															pogcastTitle={res.podcast.title_original}
															epQueue={[]}
														/>
													</div>
												),
										)}
									</div>
								),
						)}
				</SearchResultsContainer>
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
	width: 100%;
`
const SearchResultsContainer = styled.div`/* display: flex;
	flex-direction: column; */`
