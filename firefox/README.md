# Firefox
This is a roughly tested Firefox version of the chrome extension. Some slight modifications made to how the player js gets loaded due to unknown Firefox-specific errors in the handling of the original use of "new Function(playerJs);" and url redirects.

Unfortunately due to Firefox seemingly ignoring the about:config setting "xpinstall.signatures.required" there is no easy way to install this extension. The equivilant developer mode extensions for Firefox are temporary and reset when you reopen your browser.

If someone wants to go through the process to get the extension signed so it can be installed then please do.
