# Next Level Week - Ecoleta
Application built during the "Next Level Week" from [Rocketseat](https://rocketseat.com.br/).  

The main objective of this application is to connect people to organizations that collect all kinds of recyclable wastes.

##  Screenshots
### Web
<img src="/prints/web-main.png" width="733" height="450"/>

### Mobile
<p float="left">
<img src="/prints/mobile-main.jpg" width="360" height="700"/> &nbsp
<img src="/prints/mobile-map.jpg" width="360" height="700"/>
</p>

## Getting Started
### Server

Install dependencies:
```
npm install
```
Create database:
```
npx knex --knexfile=./src/database/knexfile.ts migrate:latest 
```
Populate database:
```
npm run seed
```
Run the project:
```
npm run dev
```

### FrontEnd Web
Install dependencies:
```
npm install
```
Run the project:
```
npm start
```

### Mobile Frontend
Install dependencies:
```
npm install
```
Run the project:
```
npm start
```

## Built with
* [ReactJS](https://pt-br.reactjs.org/)
* [React Native](https://reactnative.dev/)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
