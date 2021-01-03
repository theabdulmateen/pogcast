import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Layout from './Layout'
import Home from './Home'
import Explore from './Explore'
import PogcastDetails from './PogcastDetails'
import TopPodcastListing from './TopPodcastListing'
import SearchCatalogs from './SearchCatalogs'
import './App.less'

export default function App() {
	return (
		<Router>
			<Layout>
				<Route
					render={({ location }) => (
						<TransitionGroup
							style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
							<CSSTransition key={location.key} classNames='fade' timeout={300}>
								<Switch location={location}>
									<Route exact path='/'>
										<Home />
									</Route>

									<Route exact path='/explore'>
										<Explore />
									</Route>

									<Route exact path='/pogcast/:pogId'>
										<PogcastDetails />
									</Route>

									<Route exact path='/genrelisting'>
										<Home />
									</Route>

									<Route exact path='/top-podcasts/:genreId'>
										<TopPodcastListing />
									</Route>

									<Route exact path='/search'>
										<SearchCatalogs />
									</Route>
								</Switch>
							</CSSTransition>
						</TransitionGroup>
					)}
				/>
			</Layout>
		</Router>
	)
}
