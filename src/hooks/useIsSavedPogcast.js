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
				const saved = userFeeds.saved
				const isSaved = saved[pogcastId]
				setIsSaved(isSaved)
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
