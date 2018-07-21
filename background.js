chrome.webRequest.onHeadersReceived.addListener(request => {
	if (request.method == "GET" && request.url.indexOf("baking_bread") !== -1) {
		var stripedUrl = new URL(request.url);
		stripedUrl.searchParams.delete('baking_bread');
		stripedUrl.searchParams.delete('baking_brownies');
		stripedUrl.searchParams.delete('baking_brownies_timeout');
		return { redirectUrl: stripedUrl.href };
	}
	return {}
}, { urls: ['*://usher.ttvnw.net/*'] }, ['blocking', 'responseHeaders']);