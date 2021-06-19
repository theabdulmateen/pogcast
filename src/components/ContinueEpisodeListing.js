import React, { useEffect, useState } from 'react'
import { Divider } from 'antd'

import EpisodeCard from './EpisodeCard'
import Typography from './elements/Typography'

import { useAuth } from '../hooks/useAuth'
import { db, firebase } from '../firebase'
import Api from '../helper/api'

const api = new Api()

const { Header } = Typography

export default function ContinueEpisodeListing() {
	const [pogcastProgress, setPogcastProgress] = useState([])
	const [pogcasts, setPogcasts] = useState([])

	const [user] = useAuth()

	useEffect(() => {
		if (!user) {
			return
		}

		const getPogcastsProgress = async () => {
			const episodeRef = db.collection('episodes').doc(user.uid)
			const episodeDocs = await episodeRef.get()
			const docs = episodeDocs.data()
			console.log({ docs })
			// const maps = {}
			// for (const doc in docs) {
			// 	const data = await doc.data()
			// 	maps[data.pogId] = [
			// 		...maps[data.pogId],
			// 		{ seek: data.seek, completed: data.completed, epId: data.epId },
			// 	]
			// 	console.log({ data })
			// }
		}

		getPogcastsProgress().then(pogress => {
			// const p = pogress.map(pogres => api.getPogcastById(pogres.id))
			// Promise.all(pogress.map(pogres => api.getPogcastById(pogres.id))).then(pogcasts => {
			// 	setPogcasts(pogcasts)
			// 	// console.log({ pogcasts })
			// })
		})
	}, [user])

	return (
		<div>
			<Header>Continue where you left off</Header>
			<div>
				{pogcastProgress.slice(10).map(pogress => {
					if (!pogress.episodeProgress || pogress.episodeProgress.length === 0) {
						return null
					}
					return (
						<div>
							<EpisodeCard />
						</div>
					)
				})}
			</div>
			<Divider />
		</div>
	)
}
