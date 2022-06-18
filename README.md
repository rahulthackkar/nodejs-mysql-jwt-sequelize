<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize">
    <img src="/assets/images/node.png" alt="Logo">
  </a>

  <h3 align="center">Node JS + Express + User authentication using JWT + Sequelize + Jest + Docker</h3>

  <p align="center">
    <a href="https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize/issues">Report Bug</a>
    ·
    <a href="https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

A sample project using Node.JS with Express Framework that introduce using of

* Dockerised application with nodejs, mysql, phpmyadmin
* CRUD with API using JWT Authentication
* Google Login using OAuth2
* Google Cloud Bucket File Upload
* Test Cases for API using jest
* Sequlize using MySQL (Seeders, Model Validation)
* Mail Sending using nodemailer


A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With
Following frameworks and templates are used to built this project

* [Node.JS](https://nodejs.org/en/)
* [Express Framework](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Following tools are required to setup this project , follow steps as per your distro from below links to install docker stuff!

* Docker installed, Refer [Install Docker](https://docs.docker.com/engine/install/)
* Docker Compose installed, Refer these [Install Docker Compose](https://docs.docker.com/compose/install/)

### Installation (Linux Environment)


1. Clone the repo
```sh
git clone https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize.git
```
2. Go to directory
```sh
cd nodejs-mysql-jwt-sequelize
```
3. Copy .env.example to .env
```sh
cp .env.example .env
```
4. Do necessary configuration in .env and run project
```sh
docker-compose up -d
```
5. Verify setup
```sh
docker ps
```
  <i>You should have 3 running containers (Webserver (Node-Webserver), PhpMyAdmin (Node-PMA), MariaDB(Node-MySQL)</i>

5. To stop your running project
```sh
docker-compose down
```

<!-- USAGE EXAMPLES -->
## Usage
After successfull setup you should find following applications running

* Store URL : [http://localhost:3000](http://localhost:3000)
* PHPMyAdmin URL : http://localhost:8082

  * Database : node_app
  * Username : radixdev
  * Password : deep70
* MariaDB Running On : localhost:3306

* Refer API Docs : Link will be available soon

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Coming Soon


<!-- LICENSE -->
## License

Coming Soon


<!-- CONTACT -->
## Contact

[Rahul Thakkar](https://github.com/rahulthackkar/)

Project Link: [https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize](https://github.com/rahulthackkar/nodejs-mysql-jwt-sequelize)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Express Framework](https://bootstrap-vue.org)
* [Passport JS](https://www.passportjs.org/)
* [Sequelize](https://sequelize.org/)
* [Jest](https://jestjs.io/)
* [Docker](https://www.docker.com/)
