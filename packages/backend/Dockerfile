FROM node:20-alpine

WORKDIR /app

# Copy root package files for workspace resolution
COPY package.json yarn.lock ./

# Copy backend package
COPY packages/backend ./packages/backend

# Switch into the backend folder
WORKDIR /app/packages/backend

# Install dependencies and build the app
RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3001

CMD ["node", "dist/main.js"]
