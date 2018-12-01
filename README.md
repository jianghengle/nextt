# nextt

It is a [Vue.js](https://vuejs.org/) web app using [Google Map JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial). The `client/src` contains the Vue.js source code, while the `client/static` contains some static files to be used by the website directly.

If you update some static files and commit the change in the `master` branch, the website could not be updated immediately:
- The `client/static/sites.json` contains the eight sites status information to be shown on the Google map and the status table.
- The `client/static/tutorial.md` is the `Get Started on NEXTT` markdown file to be injected on the `Docs` page.
- The website refers the images/files in the `client/static/images` and `client/static/docs` folders, so if you change the files without changing their name, the website would be updated accordingly.

The `NEXTT Research User Manual` is loaded directly from the Google slides that Zhongyuan owns, so changes would be reflected directly.

Changing the Vue app(including the landing page) in the `client/src` will not be live until rebuild and redeploy the app on the server, which is an Anvil instance in HCC.
