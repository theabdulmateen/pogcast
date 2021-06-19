import { useEffect, useState } from 'react'

import { auth, provider } from '../firebase'

export const useAuth = () => {
	const [user, setUser] = useState(null)

	const signinHandler = () => auth.signInWithPopup(provider)

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user)
			}
		})
	}, [])

	return [user, signinHandler]
}
