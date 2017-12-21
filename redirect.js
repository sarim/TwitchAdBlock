if (chrome != null && chrome.webRequest != null)
{
	chrome.webRequest.onBeforeRequest.addListener(details => {
		try
		{
			// Redirect player.js to this current js file unless '?' is added on the end.
			if (details.url.includes("player.js") && !details.url.includes("?"))
			{
				return { redirectUrl: chrome.extension.getURL("redirect.js") }
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
	var playerJs = httpGet("https://player.twitch.tv/js/player.js?");

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
	new Function(playerJs)();

	// Strips the ad parameters (this assumes ad parameters come before 'sig' and 'token' comes after 'sig')
	function getCleanUrl(oldUrl)
	{
		var newUrl = oldUrl;
				
		var url = new URL(oldUrl);
		var sigIndex = url.search.indexOf('sig=');
		if (sigIndex >= 0 && !oldUrl.includes("/vod/"))
		{
			newUrl = url.origin + url.pathname + '?' + url.search.substring(sigIndex);
		}
		
		return newUrl;
	}

	function strInsert(str, index, string)
	{
	  if (index > 0)
		return str.substring(0, index) + string + str.substring(index, str.length);
	  else
		return string + str;
	}

	function httpGet(theUrl)
	{
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}
}