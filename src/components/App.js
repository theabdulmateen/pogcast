import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Layout from './Layout'
import PodcastListing from './PodcastListing'
import Home from './Home'

export default function App() {
	return (
		<Router>
			<Layout>
				<Route
					style={{ height: '100%' }}
					render={({ location }) => (
						<TransitionGroup>
							<CSSTransition key={location.key} classNames='fade' timeout={200}>
								<Switch location={location}>
									<Route exact path='/'>
										<Home />
									</Route>

									<Route exact path='/explore'>
										<PodcastListing />
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
