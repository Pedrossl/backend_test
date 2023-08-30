<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

1. **Environment Setup**:
   - Create a `.env` file in the root directory of your project if it doesn't exist.
   - Add the following content to your `.env` file:
     exemple:
   ```env
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=1234
   DB_DATABASE=pontogo
   TYPEORM_SYNCHRONIZE=true
   TYPEORM_LOGGING=true
   TYPEORM_ENTITIES=/entities/*.js,modules//entities/*.js
   JWT_SECRET='secret'

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Dependencies

| Pacote            | Versão      |
|-------------------|-------------|
| bcrypt            | ^5.1.1      |
| class-transformer | ^0.5.1      |
| class-validator   | ^0.14.0     |
| mysql2            | ^3.6.0      |
| passport          | ^0.6.0      |
| passport-jwt      | ^4.0.1      |
| passport-local    | ^1.0.0      |
| typeorm           | ^0.3.17     |


## Dependencies Explanation

## Dependencies Explanation

- **bcrypt**: Used for encrypting passwords, enhancing the security of user passwords stored in the database by making them more resistant to potential threats.

- **class-transformer** and **class-validator**: Employed to validate and transform data before it's saved to the database. The **class-transformer** facilitates converting objects from one class to another format, easing data manipulation. The **class-validator** equips developers with tools to apply validations to these objects, ensuring data correctness before storage.

- **mysql2**: Serves as a driver for interacting with the MySQL database, empowering the application to establish connections, perform queries, and update the MySQL database.

- **passport**, **passport-jwt**, **passport-local**: These packages play a pivotal role in user authentication and token generation. **Passport** is a widely embraced authentication middleware for Node.js. **Passport-jwt** serves as an extension that supports JSON Web Tokens (JWT) for authentication. **Passport-local** enables authentication using local username and password.

- **typeorm**: This is an Object-Relational Mapping (ORM) library, streamlining database interactions by enabling developers to work with databases using object-oriented programming techniques.

