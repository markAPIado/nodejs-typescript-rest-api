# Build

This GitHub Action builds and tests a Node.js application. It runs on push and pull requests to the main branch. The build job includes linting, building, and testing the application.

## Environment Variables

The following environment variables are used in the build job:

- `CI`: set to true to run in a CI environment
- `PORT`: the port number for the application
- `HOST`: the host name for the application
- `MONGO_URI`: the MongoDB connection URI
- `MONGO_DB_NAME`: the name of the MongoDB database
- `MORGAN_ENABLED`: set to 1 to enable Morgan logging
- `MONGODB_LOGGER_ENABLED`: set to 1 to enable MongoDB logging
- `SALT_WORK_FACTOR`: the salt work factor for password hashing
- `PRIVATE_KEY`: the private key for JWT token signing
- `PUBLIC_KEY`: the public key for JWT token verification
- `ACCESS_TOKEN_TTL`: the time-to-live for access tokens. (use minute format e.g 15 min --> 15)
- `REFRESH_TOKEN_TTL`: the time-to-live for refresh tokens. (use minute format e.g 1 day --> 1440)

## Caching

The build job caches the `node_modules` directory to speed up subsequent builds. The cache key is based on the operating system, the `package-lock.json` file, and the Node.js version.

## Setup

To use this GitHub Action, you need to set up the following environment variables in your repository:

- `MONGO_URI`: the MongoDB connection URI
- `PRIVATE_KEY`: the private key for JWT token signing
- `PUBLIC_KEY`: the public key for JWT token verification

To set up these environment variables, you can navigate to your repository's settings, select "Settings" from the left-hand menu, and then click "New repository variable". Enter the name and value of each environment variable and click "Add variable". Alternatively, you can use a third-party secrets management tool to manage your environment variables.

## Strategy

The build job uses a matrix strategy to test the application on different platforms, Node.js versions, and MongoDB versions. Currently, it tests on Ubuntu, Node.js 18.x, and MongoDB 6.0.

## Steps

The build job includes the following steps:

1. Git checkout
2. Use Node.js version specified in the matrix
3. Get the Node.js version
4. Get the `node_modules` cache
5. Start MongoDB
6. Install dependencies
7. Run linting
8. Build the application
9. Run tests

Note: This README file is a brief summary of the Build GitHub Action. For more detailed information, please refer to the action files.
