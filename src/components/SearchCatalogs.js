import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import Container from './elements/Container'
import StyledCard from './elements/StyledCard'
import StyledButton from './elements/StyledButton'
import Typography from './elements/Typography'

import { useGenres } from '../hooks/useGenres'
import Image from './Image'
import Api from '../helper/api'
import { useSearch } from '../hooks/useSearch'

const api = new Api()
const { Search } = Input
const { BaseContainer, PogListContainer } = Container
const { Title, Description } = Typography
const { PogCard, Cover, Content } = StyledCard
const { ActionButton } = StyledButton

export default function SearchCatalogs() {
	const [searchTerm, setSearchTerm] = useState('')
	const [enabled, setEnabled] = useState(false)
	const { data: genres } = useGenres()
	const { data: pogs, isLoading, status } = useSearch(searchTerm, enabled)

	const searchResultRef = useRef()

	useEffect(() => {
		if (status === 'success') {
			searchResultRef.current.scrollIntoView({ behavior: 'smooth' })
			setEnabled(false)
		}
	}, [status])

	return (
		<SearchContainer>
			<CoverContainer>
				<Wrapper>
					<Jumbotron>
						<PrimaryTitle>Pogcast</PrimaryTitle>
						<Caption>Search for podcast or an episode using keyword</Caption>
						<StyledSearch
							allowClear
							loading={!isLoading}
							prefix={<SearchOutlined />}
							enterButton='Search'
							size='large'
							onSearch={inputText => {
								setSearchTerm(inputText)
								setEnabled(true)
							}}
							placeholder='Search for a podcast or an episode...'
						/>
					</Jumbotron>
					<GenresContainer>
						{genres &&
							genres.slice(0, 14).map((genre, index) => (
								<GenreButton key={index} index={index} type='primary'>
									{genre.name}
								</GenreButton>
							))}
					</GenresContainer>
				</Wrapper>
			</CoverContainer>
			<ListingContainer ref={searchResultRef}>
				{status === 'success' && <Title>Search results for '{searchTerm}'</Title>}
				<PogListContainer>
					{!isLoading &&
						status === 'success' &&
						pogs.map(pog => (
							<Link key={pog.id} to={`/pogcast/${pog.id}`}>
								<PogCard>
									<Cover>
										<Image source={pog.thumbnail} alt='thumbnail' />
									</Cover>
									<Content>
										<Title>{pog.title}</Title>
										<Description>
											{pog.description.replace(/(<([^>]+)>)/gi, '')}
										</Description>
									</Content>
								</PogCard>
							</Link>
						))}
				</PogListContainer>
			</ListingContainer>
		</SearchContainer>
	)
}

const SearchContainer = styled.div`
	width: 100%;
	position: relative;
`
const CoverContainer = styled.div`
	width: 100%;
	min-height: calc(100vh - 255px);
	background-image: url('images/gene-jeter-kcV7BxcVtU4-unsplash.jpg');
	background-position: center;
	background-size: cover;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
`
const Jumbotron = styled.div`
	width: 55%;
	margin: auto;
`
const PrimaryTitle = styled.div`
	color: ${props => props.theme.text.default[900]};
	font-size: 100px;
	font-weight: 600;
	line-height: 85px;
	margin-bottom: 25px;

	${props => props.theme.phoneOnly} {
		font-size: 50px;
	}
`
const Caption = styled.div`
	color: ${props => props.theme.text.default[900]};
	font-size: 24px;
	font-weight: 400;
	margin-bottom: 15px;
	text-decoration: underline;
	overflow-wrap: break-word;

	${props => props.theme.phoneOnly} {
		font-size: 18px;
	}
`
const StyledSearch = styled(Search)`
	& .ant-input-affix-wrapper {
		background-color: white;
	}
	.ant-input-affix-wrapper-focused,
	.ant-input-affix-wrapper:focus,
	.ant-input-affix-wrapper:hover,
	.ant-input-affix-wrapper:active {
		border-color: black;
		outline: none !important;
		box-shadow: 0 0 10px #424242;
	}
	& input {
		color: black;
		outline: none !important;
		box-shadow: none;
	}
	& input::placeholder,
	.ant-input-prefix {
		color: black;
	}
	.ant-input-prefix {
		padding-right: 5px;
	}
	& input:focus,
	& input:active {
		outline: none !important;
		border-color: none;
	}
	.ant-input-group-addon {
		button {
			background-color: #1c1c1c;
			color: ${props => props.theme.text.default[900]};
			border: 2px solid #424242;
			&:hover {
				color: ${props => props.theme.text.default[800]};
			}
		}
	}
`
const GenresContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	width: 77%;
	gap: 8px;
	margin: auto;
	margin-top: 50px;
`
const Wrapper = styled.div`
	padding-top: 144px;
`
const GenreButton = styled(ActionButton)`
	background-color: ${props => props.theme.primary};
	color: ${props => props.theme.text.default[900]};
	border: 2px solid #3c3c3c;
	&:hover {
		color: ${props => props.theme.text.default[800]};
		transform: none;
	}
`
const ListingContainer = styled.div`
	padding: 0 200px;
	margin: 85px 0;
`
