FROM node:20-alpine

WORKDIR /app

# Copy root package files for workspace resolution
COPY package.json yarn.lock ./

# Copy backend package
COPY packages/backend ./packages/backend

# Switch into the backend directory
WORKDIR /app/packages/backend

# Install dependencies
RUN yarn install --frozen-lockfile

# Generate the Prisma Client
RUN npx prisma generate

# Build the backend app
RUN yarn build

EXPOSE 3001

CMD ["node", "dist/main.js"]
