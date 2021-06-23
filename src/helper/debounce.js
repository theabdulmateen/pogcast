export const debounce = function(callback, wait = 1000) {
	let timeout = null
	return function(...args) {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => callback(...args), wait)
	}
}
