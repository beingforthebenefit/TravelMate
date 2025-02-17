FROM node:18-alpine

WORKDIR /app

# Copy root package files for workspace resolution
COPY package.json yarn.lock ./

# Copy frontend package
COPY packages/frontend ./packages/frontend

# Install dependencies
RUN yarn install --frozen-lockfile

# Switch into the frontend folder and build the app
WORKDIR /app/packages/frontend
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
