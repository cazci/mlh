<p align="center">
  <h3 align="center">Notes API</h3>

  <p align="center">
    A simple REST API for personal notes management
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#start-server">Start Server</a></li>
        <li><a href="#swagger-docs">Swagger Docs</a></li>
        <li><a href="#serve-compodoc-docs">Serve Compodoc Docs</a></li>
      </ul>
    </li>
    <li>
      <a href="#testing">Testing</a>
      <ul>
        <li><a href="#unit-tests">Unit Tests</a></li>
        <li><a href="#e2e-tests">E2E Tests</a></li>
      </ul>
    </li>
    <li><a href="#tech-and-reasons">Tech And Reasons</a></li>
    <li><a href="#alternate-features">Alternate Features</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## About The Project

This API can handle personal notes in a multi-user environment. Currently the API has following functionalities. 
* Ability to save a new note
* Ability to update a previously saved note
* Ability to delete a saved note
* Ability to archive a note
* Ability to unarchive a previously archived note
* Ability to list saved notes that aren't archived
* Ability to list notes that are archived

### Built With

* [NestJS](https://nestjs.com/)
* [ExpressJS](https://expressjs.com/)

## Getting Started

Follow this guide to setup the project locally. 

### Prerequisites

* npm
  ```sh
  $ npm install -g npm@latest
  ```

### Installation

1. Clone the repo
   ```sh
   $ git clone https://github.com/cazci/notes-api.git
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```
3. Rename `config.example.ts` to `config.ts` and update values
   ```JS
   const config = {
    mysql: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ENTER YOUR MYSQL USERNAME',
      password: 'ENTER YOUR MYSQL PASSWORD',
      database: 'ENTER YOUR MYSQL DATABASE NAME',
      autoLoadEntities: true,
      synchronize: true,
    },
    jwt: {
      secret: 'ENTER YOUR JWT SECRET',
    },
   };
   ```

## Usage

### Start Server 

Run the following command to start the server. Server will be started on http://localhost:3000 by default.
   ```sh
   $ npm run start
   ```
![Screenshot 2021-08-07 at 17 40 04](https://user-images.githubusercontent.com/32796120/128599681-1ff82507-657f-49a3-aac6-5fb68bdf1d38.png)

### Swagger Docs

Swagger is integrated with the API to generate Swagger docs which represents the API overview and endpoint details. 

Navigate to http://localhost:3000/api-docs to access swagger docs.

![Screenshot 2021-08-07 at 17 38 45](https://user-images.githubusercontent.com/32796120/128599670-4e5b60a9-58ea-4f48-b039-0d4a3ff35e28.png)

### Serve Compodoc Docs

Compodoc is integrated with the API which represents the project structural overview and project roadmap.

Run the following command to serve the docs. Docs will be served on http://localhost:8080 by default.
   ```sh
   $ npm run serve:docs
   ```
![Screenshot 2021-08-07 at 17 41 59](https://user-images.githubusercontent.com/32796120/128599764-af69242b-e015-44b0-8197-37f10dc995f4.png)

## Testing

The API has both Unit tests and E2E tests

### Unit Tests

Run the following command to run the unit tests
   ```sh
   $ npm run test
   ```
   
### E2E Tests

Run the following command to run the e2e tests
   ```sh
   $ npm run test:e2e
   ```
## Tech And Reasons

**NestJS** - NestJS is a moders javascript framework for building efficient, scalable Node.js web applications. It has in-built support for popular JS libraries like express.js, rxjs, typeorm, and mongoose. Moreover, it combines elements for OOP, FP and FRP and allows to code in Typescript. 

_Alternatives_
* Spring Boot
* Rails
* Flask

**MySQL** - For the simplicity of the project MySQL is a good relational database option. 

_Alternatives_
* PostgreSQL
* MongoDB

## Alternate Features

If I had more time to implement this I would try to,
* Integrate timestamps (eg: created_at, updated_at)
* Implement support for multiple input mechanisms (eg: images, voice notes)
* Integrate a full-text search engine 
* Integrate OCR and SR features

## Contact

Sashika Nawarathne - [@cazci](https://github.com/cazci) - hi@sashika.me

## Acknowledgements
* [NestJS Documentation](https://docs.nestjs.com)
