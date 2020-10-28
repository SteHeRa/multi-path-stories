# Multi-Path Stories

## Table of Contents

- [Getting Started](#Getting-Started)

  - [Setup Prerequisites](#Setup-Prerequisites)

  - [Server & Database Setup](#Server-&-Database-Setup)

  - [Start the App](#Start-the-App)

- [Tech Stack](#Tech-Stack)

## Getting Started

These instructions will help you setup a local development instance of the app.

### Setup prerequisites

- You will require Node.js and PostgreSQL installed on your machine.
- For an example of how to fill `/server/.env` see `/server/.env.example`

#### install dependencies

`npm install`

### Server & Database Setup

- Install server dependencies:
  `cd server`
  `npm install`
- You will need to create a database on your local machine called "multipathstories_dev"
- Create a `.env` file in the server directory (`/server/.env`) and fill it following the example `/server/.env.example`
- Initialise the database by running `npx sequelize-cli db:migrate` from within the server directory.

- Seed the database by running `npx sequelize-cli db:seed:all` from within the server directory.

### Start the App

- In the server directory run `npm run dev`

## Tech Stack

- [Javascript](https://www.javascript.com/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)

## Design & implementation

My approach to this test was to generate a template for the table using a templating engine (pug) that would be populated with data coming from a relational database.<br>
As users enter branches into the story and click submit the form will send post requests to an Express server which will update the table in the database. This allows for returning to the begining of the story.<br>
The prompt and branches that you can see is determined by parameters in the url, the url tells the server what prompt and branches we want to get from the database.<br>
Conditional statements in the .pug template mean if the branch is undefined the user is presented with a text input but if a branch has already been filled they are instead presented with a hyperlink that directs them to a url with a parameter
`?prompt=*value for this branch that was retrieved from database*`

There is currently no form validation on the inputs.
The controller function for posting a new branch has a lot of repeated code in it. Given a bit more time I would like to try and refactor it.

I think this test is testing my ability to try and solve a problem with a limited tool set, i.e. not being able to use JavaScript to make API requests on the client side, my ability to write a stable back end, and possibly open up to discussion my choices in tools/technologies on the back end.
