import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'

import EpisodeCard from './EpisodeCard'
import Typography from './elements/Typography'

import { useAuth } from '../hooks/useAuth'
import { db } from '../firebase'
import Api from '../helper/api'

const api = new Api()

const { Header } = Typography

export default function ContinueEpisodeListing() {
	const [ episodesPogress, setEpisodesPogress ] = useState([])

	const [ user ] = useAuth()

	useEffect(
		() => {
			if (!user) {
				return
			}

			const getPogcastsProgress = async () => {
				const pogcastsRef = db.collection('feeds').doc(user.uid).collection('pogcasts')
				return pogcastsRef.get().then((pogcastsDocs) =>
					Promise.all(
						pogcastsDocs.docs.map((pogcast) =>
							pogcast.ref.collection('episodes').get().then((episodes) => {
								if (episodes.size > 0) {
									const data = episodes.docs[0].data()
									const ep = {
										pogId: pogcast.id,
										epId: episodes.docs[0].id,
										seek: data.seek,
									}
									return ep
								}
							}),
						),
					),
				)
			}

			getPogcastsProgress()
				.then(async (pogress) => {
					const episodes = await Promise.all(
						pogress.map(async (pogres) => {
							const ep = await api.getEpisodeById(pogres.epId)
							return {
								...ep,
								...pogres,
							}
						}),
					)
					setEpisodesPogress(episodes)
				})
				.catch((err) => console.log(err))
		},
		[ user ],
	)

	if (!episodesPogress || episodesPogress.length === 0) {
		return null
	}

	return (
		<div>
			<Divider />
			<Header>Continue where you left off</Header>
			<div>
				{episodesPogress.slice(0, 10).map((episode) => {
					if (!episode) {
						return null
					}

					return (
						<div key={episode.epId}>
							<EpisodeCard
								ep={episode}
								pogId={episode.pogId}
								pogcastTitle={episode.podcast.title}
								epQueue={[]}
								toSeek={episode.seek}
							/>
						</div>
					)
				})}
			</div>
			<Divider />
		</div>
	)
}
