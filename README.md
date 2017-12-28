# TwitchAdBlock
Block stream embedded ads on twitch.tv (chrome / firefox)

This does a clean modification of the stream url request. No other changes to the site are made.

I can't be bothered to go through the process of uploading this to the chrome store. If someone wants to upload it for easier installing go head.

For firefox see https://github.com/pixeltris/TwitchAdBlock/tree/master/firefox

# How does it work?

- The extension redirects player.twitch.tv/js/player.js to redirect.js
- redirect.js downloads the player.js as text and modifies the code to remove the ad parameters in the stream request.
- The modified code is then loaded via "new Function(playerJs)();"

# How to install manually (chrome)

- Download manifest.json / redirect.js and put them into their own folder.
- Go to chrome://extensions/ then tick "Developer mode" in the top right.
- Click the "Load unpacked extension..." button in the top left and select the folder you just created.
- The extension should now be installed.
