[![Build](https://github.com/markAPIado/nodejs-typescript-rest-dev/actions/workflows/build.yml/badge.svg)](https://github.com/markAPIado/nodejs-typescript-rest-dev/actions/workflows/build.yml)

# NodeJs Typescript Rest API

This is a simple NodeJs Typescript Rest API using MVC design pattern. This setup aims to provide a development environment that will help you focus on building your API without worrying about minor details like code formatting, linting, testing, CI/CD, etc. This project is also a good starting point if you want to learn how to build a NodeJs Typescript Rest API.

**NOTE:** You may want to implement **clean architecture and design patterns** to make your code more readable and maintainable. Just write your code in the `src` folder and run `npm run build` to compile the code to `dist` folder. The compiled code will be the one that will be deployed to production.

## Features

- [x] Typescript
- [x] MongoDB, ExpressJs, NodeJs stack
- [x] MVC design pattern
- [x] Unit and Integration tests with Jest and Supertest
- [x] Consistent coding style with Prettier and ESLint
- [x] High cohesion between components and modules
- [x] Pre-commit hooks with Husky
- [x] Operating system-agnostic scripts
- [x] CI/CD with Github Actions
- [x] Docker containerization

**Upcoming Features**

- [ ] More API endpoints
- [ ] Swagger documentation
- [ ] Postman collection
- [ ] AWS deployment with Github Actions pipeline
- [ ] Docker hot reload on development environment
- [ ] Local Kubernetes deployment

## Setup

Clone the repository.

```
git clone https://github.com/markAPIado/nodejs-typescript-rest.git
```

## Installation

Run the following command to install the dependencies.

```
npm install
```

**Environment Variables:**
Rename the `rename.env` file to `.env` and update the environment variables.

```
cp rename.env .env
```

For **Windows** users, you can use the following command instead.

```
copy rename.env .env
```

**Husky**

Run the following command to set up the pre-commit hooks. The default `npm run prepare` script will cause issues on Docker containerization so we need to use a different script.

```
npm run husky:prepare
```

## Development

Run the following command to start the development server.

```
npm run dev
```

**Pre-commit Workflow**

Run the command below to lint and format the code before committing. This will avoid prettier and eslint making changes to the code format on the pre-commit hook.

```
npm run local:pre-commit
```

**Commit Changes to Git**

This will run the pre-commit hook created by `Husky` before committing the changes to git. Stages are as follows:

- lint using eslint
- format using prettier
- test using jest

**NOTE:** You want to skip the test stage if it takes too long to run. However, it is recommended to run the tests before committing the changes to git.

## Build

Run the following command to compile the code to `dist` folder.

```
npm run build
```

## Production

Run the following command to start the production server.

```
npm start
```

## Testing

Run the test once using the command below.

```
npm test
```

Run the test in watch mode using the command below.

```
npm run test:watch
```

Run the test coverage using the command below.

```
npm run test:coverage
```

## Docker

**Development:**

Run the command below to start the development server using Docker. Check the `Dockerfile.dev` and `docker-compose.dev.yml` files for more details.
NOTE: The hot reload feature is not yet available. Fixing this is one of the upcoming features.

```
npm run build:docker-dev
```

**Production:**

Run the command below to start the production server using Docker. Check the `Dockerfile.prod` and `docker-compose.prod.yml` files for more details.

```
npm run build:docker-prod
```

**Cluster:**

Run the command below to start the production server using PM2. Check the `Dockerfile.prodcluster` and `docker-compose.prodcluster.yml` files for more details.

```
npm run build:docker-cluster
```

**Docker Hub:**

Refer to the `Dockerfile.prod` for the image name and tag. Run the following command to push the image to Docker Hub. Example: [Nodejs Typescript Rest API](https://hub.docker.com/repository/docker/markapiado/nodejs-typescript-rest-api/general)


First, login to Docker Hub. Enter your username and password when prompted.

```
docker login
```

Then, push the image to Docker Hub. Example: `docker push markapiado/nodejs-typescript-rest:latest`

```
docker push <image-name>:<tag>
```

## Github Actions CI/CD

Instructions on how to set up Github Actions CI/CD pipeline is found [here](./GITHUB_ACTIONS.md).

## Clustering using PM2

Check the `ecosystem.config.js` file for more details. Install PM2 globally if you haven't done so.

```
npm install pm2 -g
```

Run the following command to start the production server using PM2.

```
npm run cluster:start
```

## Other Scripts

**Formatting:**

- `npm run format` - formats the code using prettier.
- `npm run format-check` - checks the format of code using prettier.

**Linting:**

- `npm run lint` - identifyies and reports on patterns found in ECMAScript/JavaScript code.

**Cleaning up**

- `npm run clean` - removes the `dist`, `coverage`, and `node_modules` folders.

NOTE:

**PRs are welcome.** If you have any suggestions or improvements, kindly create a pull request.

Feel free to fork this repository and use it as a starting point for your own NodeJs Typescript Rest API.

If you have any questions, reach out to me through my email address: markapiado.me@gmail.com
