# :microscope: NomNom Frontend Coding challenge

## :page_with_curl: Presentation viewer!

# :cake: Requirements

Build a single page application which allows users to:

- select a deck from all available decks
- view all slides in a given deck
- render all contents of a deck in each slide
- after users see the deck show deck's stats
- all information is available via HTTP based API
- it has to look decent :-) we've included a slimmed down version of
  our design [toolkit](#file-fw-challenge-ui-toolkit-png)

All slide deck information is available via an API bundled with this challenge.

You can get information from the API about:
- available decks
- number of slides for a deck
- request each slide for a deck
- visitor statistics for each deck

# :computer: Setup

This gist repo includes:

- `index.js` - tiny node application server:
  - it can serve any static files in this directory
  - also hosts the API (documented below)

- `index.html`, `app.js` - main application files
  these are the entry points for your solution

## :rocket: To start

- clone this gist
- `npm install`
- `node index.js`
- navigate to `http://localhost:3000`

## :+1: Your solution

You have to implement the solution using the following
stack. It consists of:

- [Backbone](http://backbonejs.org/)
- [RactiveJS](ractivejs.org)
- [RequireJs](requirejs.org)

You can add any extra libraries, for example for charting, CSS pre-processors
or build tool of your choice.
However full frameworks like Angular, Marionette or Ember are not allowed.

## HOWEVER

Solutions in [ClojureScript](http://clojure.org/about/clojurescript) and any of
[React wrappers](https://facebook.github.io/react/) are **accepted**.


## :no_good: Do not modify index.js and slides.json!

### :sparkles: Bonus points:

- :package: modular code
- :cherries: tests
- :blue_book: detailed documentation on how to get solution running

---

## :globe_with_meridians: API documentation

### `GET /api/decks`

 Return a list of available decks. Example:

`curl http://localhost:3000/api/decks`

```json
 { "decks" : ["cookies", "ruby"] }
```

### `GET /api/decks/:name`

Return number of slides for a deck. Example:


`curl http://localhost:3000/api/decks/cookies`

```json
 { "slides": 20 }
 ```

### `GET /api/decks/:name/stats/visitors`

Returns (randomized) daily numbers of visitors


`curl http://localhost:3000/api/decks/cookies/stats/visitors`

```json
[
    {
        "timestamp": 1447004056597,
        "value": 667
    },
    {
        "timestamp": 1446917656597,
        "value": 197
    },
    {
        "timestamp": 1446831256597,
        "value": 212
    }
]
```


### `GET /api/decks/:name/stats/countries`

Returns a (randomized) breakdown of visitor countries.

`curl http://localhost:3000/api/decks/cookies/stats/countries`



```json
[
    {
        "country": "UK",
        "value": 667
    },
    {
        "country": "Portugal",
        "value": 197
    },
    {
        "country": "Netherlands",
        "value": 212
    }
]
```


### `GET /api/decks/:name/slide/:number`

Get slide :number from a deck :id. Slide numbers start from 1. Example:

`curl http://localhost:3000/api/decks/cookies/slide/1`

```json
 {
 "slide" : [
   { "heading" : "hello" },
   { "image" : "http://example.com/test.jpg" },
   { "para" : "I'm a paragraph!" }
 ],
 "slides" : 10
 }
```

A slide consists of an array of elements. There are 3 types of elements:
  - heading - a title or heading for a slide
  - image - an URL to an image
  - para - a paragraph of text, it might contain html

Elements can appear in any order.

---

Please use [git-archive](http://git-scm.com/docs/git-archive) to create a zip
with final solution.
