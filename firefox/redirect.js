var extensionAPI = chrome != null && chrome.webRequest != null ? chrome : browser;

if (extensionAPI != null && extensionAPI.webRequest != null)
{
	extensionAPI.webRequest.onBeforeRequest.addListener(details => {
		try
		{
			// Redirect player.js to this current js file unless '?' is added on the end.
			if (details.url.includes("player.js") && !details.url.includes("?"))
			{
				extensionAPI.tabs.executeScript(details.tabId, { file: 'redirect.js' });
				return { cancel: true }
			}
			return { };
		}
		catch (err)
		{
			console.error(err.stack);
			return { };
		}
	}, { urls: ['*://player.twitch.tv/js/player.js'] }, ['blocking']);
}
else
{
	var playerJs = "function getCleanUrl(oldUrl){var newUrl = oldUrl;var url = new URL(oldUrl);var sigIndex = url.search.indexOf('sig=');if (sigIndex >= 0 && !oldUrl.includes('/vod/')){newUrl = url.origin + url.pathname + '?allow_source=true&player_backend=mediaplayer&rtqos=control&' + url.search.substring(sigIndex);}return newUrl;}";

	playerJs += httpGet("https://player.twitch.tv/js/player.js?");

	var funcCall = "setSrc(";
	var funcCallIndex = 0;
	while ((funcCallIndex = playerJs.indexOf(funcCall, funcCallIndex)) >= 0)
	{
		// Modify all function calls setSrc(XXX) to setSrc(getCleanUrl(XXX))
		playerJs = strInsert(playerJs, funcCallIndex + funcCall.length, "getCleanUrl(");
		funcCallIndex = playerJs.indexOf(')', funcCallIndex);
		playerJs = strInsert(playerJs, funcCallIndex, ")");
	}

	// Run the modified player.js
	var script = document.createElement("script");
	script.innerHTML = playerJs;
	document.body.appendChild(script);

	function httpGet(theUrl)
	{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}

	function strInsert(str, index, string)
	{
	  if (index > 0)
		return str.substring(0, index) + string + str.substring(index, str.length);
	  else
		return string + str;
	}
}