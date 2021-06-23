import React, { useState } from 'react'
import styled from 'styled-components'

import { useGenres } from '../hooks/useGenres'
import { useRegions } from '../hooks/useRegions'
import { useLanguages } from '../hooks/useLanguages'
import { useLocalState } from '../hooks/useLocalState'

const filters = {
	SORT: 'sort_by_date',
	TYPE: 'type',
	GENRES: 'genre_ids',
	LANGUAGE: 'language',
	REGION: 'region',
	SAFE_MODE: 'safe_mode',
	// MIN_LENGTH: 'len_min',
	// MAX_LENGTH: 'len_max',
	// MIN_EP_COUNT: 'episode_count_min',
	// MAX_EP_COUNT: 'episode_count_max',
	// ONLY_IN: 'only_in',
}

const sortMap = {
	0: 'by relevance',
	1: 'by date',
}

const safeModeMap = {
	0: 'include explicit language',
	1: 'exclude explicit language',
}

export default function Filters({ setFilters, searchTerm, setSearchTerm }) {
	const [ region, setRegion ] = useLocalState('region', 'Any region')
	const [ language, setLanguage ] = useLocalState('language', 'Any language')
	const [ type, setType ] = useLocalState('type', 'episode')
	const [ sort, setSort ] = useLocalState('sort', 0)
	const [ safeMode, setSafeMode ] = useLocalState('safeMode', 0)
	const [ genreIds, setGenreIds ] = useLocalState('genreIds', [])
	const [ searchFilterTerm, setSearchFilterTerm ] = useState(searchTerm)

	const [ popupOpen, setPopupOpen ] = useState('')

	const { data: genres } = useGenres()
	const { data: regions } = useRegions()
	const { data: languages } = useLanguages()

	const setFilteredProperties = () => {
		const filters = {
			sort_by_date: sort,
			type: type,
			genre_ids: genreIds,
			language: language,
			region: region,
			safe_mode: safeMode,
		}
		setFilters(filters)
		setSearchTerm(searchFilterTerm)
	}

	return (
		<OuterFilterContainer>
			<FilterContainer>
				<Container>
					<ToggleButton
						onClick={() => setPopupOpen((prev) => (prev === filters.LANGUAGE ? '' : filters.LANGUAGE))}
						isActive={popupOpen === filters.LANGUAGE}
					>
						Language <span>{language}</span>
					</ToggleButton>
					<List
						isOpen={popupOpen === filters.LANGUAGE}
						onClick={(Event) => {
							if (Event.target.value) {
								setLanguage(Event.target.value)
								setPopupOpen('')
							}
						}}
					>
						{languages &&
							languages.map((lang, index) => (
								<label htmlFor={lang} key={index}>
									<Item selected={language === lang}>
										<Radio readOnly id={lang} type="radio" name="language" value={lang} />
										<RadioControl />
										<p>{lang}</p>
									</Item>
								</label>
							))}
					</List>
				</Container>

				<Container>
					<ToggleButton
						onClick={() => setPopupOpen((prev) => (prev === filters.REGION ? '' : filters.REGION))}
						isActive={popupOpen === filters.REGION}
					>
						Region <span>{regions && ((region in regions && regions[region]) || 'Any region')}</span>
					</ToggleButton>
					<List
						isOpen={popupOpen === filters.REGION}
						onClick={(Event) => {
							if (Event.target.value) {
								setRegion(Event.target.value)
								setPopupOpen('')
							}
						}}
					>
						{regions &&
							Object.entries({ ' ': 'Any region', ...regions }).map(([ code, reg ]) => (
								<label htmlFor={code} key={code}>
									<Item selected={region === code}>
										<Radio readOnly id={code} type="radio" name="region" value={code} />
										<RadioControl />
										<p>{reg}</p>
									</Item>
								</label>
							))}
					</List>
				</Container>

				<Container>
					<ToggleButton
						onClick={() => setPopupOpen((prev) => (prev === filters.TYPE ? '' : filters.TYPE))}
						isActive={popupOpen === filters.TYPE}
					>
						Type <span>{type}</span>
					</ToggleButton>
					<List
						style={{ minWidth: '200px' }}
						isOpen={popupOpen === filters.TYPE}
						onClick={(Event) => {
							if (Event.target.value) {
								setType(Event.target.value)
								setPopupOpen('')
							}
						}}
					>
						{[ 'episode', 'podcast', 'curated' ].map((t, index) => (
							<label htmlFor={t} style={{ width: '100%' }} key={index}>
								<Item style={{ width: '100%' }} selected={type === t}>
									<Radio readOnly id={t} type="radio" name="type" value={t} />
									<RadioControl />
									<p>{t}</p>
								</Item>
							</label>
						))}
					</List>
				</Container>

				<Container>
					<ToggleButton
						onClick={() => setPopupOpen((prev) => (prev === filters.SORT ? '' : filters.SORT))}
						isActive={popupOpen === filters.SORT}
					>
						Sort <span>{sortMap[sort]}</span>
					</ToggleButton>
					<List
						style={{ minWidth: '200px' }}
						isOpen={popupOpen === filters.SORT}
						onClick={(Event) => {
							if (Event.target.value) {
								setSort(Number(Event.target.value))
								setPopupOpen('')
							}
						}}
					>
						{Object.entries(sortMap).map(([ s, label ]) => (
							<label htmlFor={label} style={{ width: '100%' }} key={s}>
								<Item style={{ width: '100%' }} selected={sort === Number(s)}>
									<Radio readOnly id={label} type="radio" name="sort" value={s} />
									<RadioControl />
									<p>{label}</p>
								</Item>
							</label>
						))}
					</List>
				</Container>

				<Container>
					<ToggleButton
						onClick={() => setPopupOpen((prev) => (prev === filters.SAFE_MODE ? '' : filters.SAFE_MODE))}
						isActive={popupOpen === filters.SAFE_MODE}
					>
						Safe mode <span>{safeModeMap[safeMode]}</span>
					</ToggleButton>
					<List
						style={{ minWidth: '200px' }}
						isOpen={popupOpen === filters.SAFE_MODE}
						onClick={(Event) => {
							if (Event.target.value) {
								setSafeMode(Number(Event.target.value))
								setPopupOpen('')
							}
						}}
					>
						{Object.entries(safeModeMap).map(([ s, label ]) => (
							<label htmlFor={label} style={{ width: '100%' }} key={s}>
								<Item style={{ width: '100%' }} selected={safeMode === Number(s)}>
									<Radio readOnly id={label} type="radio" name="safemode" value={s} />
									<RadioControl />
									<p>{label}</p>
								</Item>
							</label>
						))}
					</List>
				</Container>

				<Container>
					<ToggleButton
						onClick={() => setPopupOpen((prev) => (prev === filters.GENRES ? '' : filters.GENRES))}
						isActive={popupOpen === filters.GENRES}
					>
						Genres{' '}
						<span>
							{genreIds.length === 0 ? (
								'Any genres'
							) : genreIds.length === 1 ? (
								genres.find((genre) => genre.id === Number(genreIds[0])).name
							) : (
								`${genreIds.length} selected`
							)}
						</span>
					</ToggleButton>
					<List
						style={{ minWidth: '200px' }}
						isOpen={popupOpen === filters.GENRES}
						onClick={(Event) => {
							if (Event.target.value) {
								if (genreIds.findIndex((gId) => gId === Event.target.value) !== -1) {
									setGenreIds((prev) => prev.filter((gId) => gId !== Event.target.value))
								} else {
									setGenreIds((prev) => [ ...prev, Event.target.value ])
								}
							}
						}}
					>
						{genres &&
							genres.map((genre) => (
								<label key={genre.id} htmlFor={genre.name} style={{ width: '100%' }}>
									<Item
										isTick={true}
										style={{ width: '100%' }}
										selected={genreIds.findIndex((gId) => Number(gId) === genre.id) !== -1}
									>
										<Radio readOnly id={genre.name} value={genre.id} />
										<RadioControl isTick={true} />
										<p>{genre.name}</p>
									</Item>
								</label>
							))}
					</List>
				</Container>
			</FilterContainer>

			<FilterActionContainer>
				<StyledSmolSearch
					onChange={(Event) => {
						setSearchFilterTerm(Event.target.value)
					}}
					value={searchFilterTerm}
					placeholder="search term"
				/>

				<FilterButton type="primary" style={{ height: '30px', width: '100%' }} onClick={setFilteredProperties}>
					Filter
				</FilterButton>
			</FilterActionContainer>
		</OuterFilterContainer>
	)
}

const OuterFilterContainer = styled.div`
	display: grid;
	grid-template-columns: 65% 1fr;
	background-color: #1c1c1c;
	gap: 0.4em;
	padding: 1.2em 1em;
	margin-bottom: 1.4em;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
		gap: 1.2em;
	}
`
const FilterContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
	border-radius: 0.4em;
	gap: 0.4em;

	${(props) => props.theme.tabletPortraitUp} {
		grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
	}

	${(props) => props.theme.tabletLandscapeUp} {
		grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
	}

	${(props) => props.theme.desktopUp} {
		grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
	}

	${(props) => props.theme.phoneOnly} {
		grid-template-columns: repeat(auto-fill, minmax(40%, 1fr));
	}
`
const Container = styled.div`
	position: relative;
	width: 100%;
`
const ToggleButton = styled.button`
	height: 30px;
	width: 100%;
	background-color: ${(props) => (props.isActive ? '#212121 !important' : '#242424')};
	color: ${(props) => props.theme.text.default[500]};
	text-align: center;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0.4em 1.2em;
	transition: background-color 100ms linear;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;

	&:hover {
		background-color: #272727;
	}

	& span {
		color: ${(props) => props.theme.text.main};
	}

	& span::after {
		content: '\f078';
		font-family: "Font Awesome 5 Free";
		font-weight: 900;
		border: none;
		vertical-align: middle;
		font-size: .85em;
		color: #d5d5d5;
		margin-left: .255em;
	}
`
const List = styled.div`
	display: ${(props) => (props.isOpen ? 'block' : 'none')};
	position: absolute;
	z-index: 1;
	top: 38px;
	border-radius: 0.4em;
	background: #212121;
	min-width: 750px;
	max-height: 600px;
	overflow-y: auto;
	padding: 1em 2em;
`
const Item = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	width: 25%;
	float: left;
	list-style-type: none;
	cursor: pointer;
	padding: 0.2em 0.4em;
	border-radius: 0.2em;
	color: ${(props) => (props.selected ? props.theme.text.default[800] : props.theme.text.default[500])};

	&:hover {
		background-color: #2d2d2d;
		color: ${(props) => props.theme.text.default[800]};
	}

	& p {
		margin: 0;
		cursor: pointer;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	& span {
		background-color: ${(props) =>
			props.selected ? props.theme.text.default[800] : props.theme.text.default[300]};
	}

	${(props) =>
		props.selected &&
		props.isTick &&
		`
		& span {
			height: 0;
		}
		& span::before {
			content: '\f00c';
		}
		`};
`
const Radio = styled.input`
	float: left;
	list-style-type: none;
	cursor: pointer;
	opacity: 0;
	width: 0;
	height: 0;
`
const RadioControl = styled.span`
	display: block;
	margin-right: 0.4em;
	width: 10px;
	height: 10px;
	border-radius: 1px;

	${(props) =>
		props.isTick
			? `
		&::before {
			position: absolute;
			top: 6px;
			font-family: "Font Awesome 5 Free";
			font-weight: 900;
			font-size: .85em;
			display: inline-block;
		}`
			: `
		border-radius: 50%;
	`};
`
const FilterActionContainer = styled.div`
	display: grid;
	gap: 0.4em;
`
const StyledSmolSearch = styled.input`
	width: 100%;
	height: 30px;
	border-radius: 2px;
	border: 2px solid ${(props) => props.theme.background.cardHover};
	padding: 0px 10px;
	background-color: #1c1c1c;
	color: ${(props) => props.theme.text.main};

	&::placeholder {
		color: ${(props) => props.theme.text.default[200]};
	}

	&:focus,
	&:active {
		outline: none !important;
	}
`
const FilterButton = styled.button`
	border: none;
	outline: none;
	cursor: pointer;
	background-color: ${(props) => props.theme.primary};
	color: ${(props) => props.theme.text.main};
`
