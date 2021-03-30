export const generateEpQueue = (episodes, showName) => {
	return episodes.map(epInList => ({
		epId: epInList.id,
		title: epInList.title,
		thumbnail: epInList.thumbnail,
		showName,
	}))
}
