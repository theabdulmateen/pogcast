import { useState, useEffect } from 'react'

import { auth, db } from '../firebase'
import Api from '../helper/api'

const api = new Api()

export const useIsSavedPogcast = (epId, pogId) => {
	const [isSaved, setIsSaved] = useState(false)

	const setIsSavedFromApi = pogcastId => {
		return db
			.collection('feeds')
			.doc(auth.currentUser.uid)
			.onSnapshot(doc => {
				const userFeeds = doc.data()
				if (!!userFeeds) {
					const pogcasts = userFeeds.pogcasts
					const isSaved = pogcasts[pogcastId]
					setIsSaved(isSaved)
				} else {
					console.log('no feeds found for user with userId: ', auth.currentUser.uid)
				}
			})
	}

	useEffect(() => {
		if (!epId && !pogId) {
			return
		}

		let unsubscribe

		if (auth.currentUser) {
			if (pogId) {
				// console.log('pogId provided, useIsSavedPogcast: ', pogId)
				unsubscribe = setIsSavedFromApi(pogId)
			} else if (epId) {
				// console.log('epId provided, useIsSavedPogcast', epId)
				api.getPogcastIdFromEpId(epId).then(pogId => {
					unsubscribe = setIsSavedFromApi(pogId)
				})
			}
		}
		return () => unsubscribe
	}, [epId, pogId])

	return [isSaved]
}
