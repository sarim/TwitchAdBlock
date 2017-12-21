# TwitchAdBlock
Block stream embedded ads on twitch.tv (chrome only)

I can't be bothered to go through the process of uploading this to the chrome store. If someone wants do upload it for easier installing go head.

# How does it work?

- The extension redirects player.twitch.tv/js/player.js to redirect.js
- redirect.js downloads the player.js as text and modifies the code to remove the ad parameters in the stream request.
- The modified code is then loaded via "new Function(playerJs)();"

# How to install manually

- Download manifest.json / redirect.js and put them into their own folder.
- Go to chrome://extensions/ then tick "Developer mode" in the top right.
- Click the "Load unpacked extension..." button in the top left and select the folder you just created.
- The extension should now be installed.
