# Dockerfile
#
# -------------------------------------
# Context: Build Context
FROM node:lts-alpine as build

RUN npm i -g pnpm

# Set Working Directory Context
WORKDIR "/feature-flag"

# Copy package files
COPY package.json .
COPY pnpm-lock.yaml .

# Context: Dependencies
FROM build AS dependencies

# Install Modules
RUN pnpm install

# -------------------------------------
# Context: Builder
FROM dependencies as builder

# Copy necessary files to build feature-flag
COPY src src
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY nest-cli.json .
COPY .env .env

RUN pnpm build

# -------------------------------------
# Context: Release
FROM build AS release

# GET deployment code from previous containers
COPY --from=dependencies /feature-flag/node_modules /feature-flag/node_modules
COPY --from=builder /feature-flag/dist /feature-flag/dist

# Running feature-flag when the image gets built using a script
CMD ["sh", "-c", "pnpm start:prod"]
