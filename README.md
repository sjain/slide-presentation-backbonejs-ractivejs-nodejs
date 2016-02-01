# :microscope: NomNom Frontend Coding challenge

## :page_with_curl: Presentation viewer!

# :computer: Setup

This gist repo includes:

- `src/js`: Includes javascripts files for a Single Page Application (SPA) built using Backbone for models and routing.
Ractive.js is use is used views.

- `src/scss`: Styles for SPA views. Each page is a separate scss file.

- `gulpfile.js`: Build file for compiling all javascripts into a single bundle.js and all styles into a single style.css. This build file also had `watchify` and `browser-sync` hooks to aid development efficiency.

- `index.js`, `index.html`, `app.js` - main application files, provided by origin repository.

## :rocket: To start

- `npm install`
- `node index.js`
- `gulp`

This will fire up a google-chrome (assuming installed) with following location `http://localhost:3001`.

## :+1: Your solution

The solution is implemented using Backbone and Ractive.js.  The home page displays a list of all decks. When a deck is selected/clicked, first slide from the deck is displayed. There is a navigation bar at the bottom of slide to go to next slide, or back. At the end of all slides, it displays a page with both visitor and contry stats.

The backend for slide stats returns random data. This functionality is used as is. No attempt is made to record stats data in real-time. This can be improved further, if that is a requirement.

## :-1: Work in Progress

- I could not figure our how to control navigation anchor links in backbone. I found [some threads in stack overflow](http://stackoverflow.com/questions/12081894/backbone-router-navigate-and-anchor-href) for over-riding <a/> links to perform in browser navigation, which is preferable over server redirect and refreshing entire SPA. However, I could not find a good life-cycle hook into ractive component to tie this override once and only once. So, I had to modify index.js (!) to allow entry for all URL(s). This could be improved.
- The project has no tests. Professionally, I've used Jasmine and Karma and would have loved to add some examples. I could add some with more time.
- Stats are currently using random data. This could be improved with real stats capture.

