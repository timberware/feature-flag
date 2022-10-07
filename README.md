## Installation
## Docker and Docker-Compose Setup

<Tabs className="unique-tabs">
  <TabItem value="windows" label="Windows">

---
#### Windows 10 Pro, Enterprise, Education or Windows 11 (Hyper-V)

1. Get [Docker for Desktop For Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows)
1. Docker for Desktop comes with docker-compose installed.

---

  </TabItem>
  <TabItem value="macOS" label="macOS">

### MacOS

1. Get [Docker for Desktop For Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac) (macOS 10.15 or above)

1. Docker for Desktop comes with docker-compose installed.

---

  </TabItem>
  <TabItem value="linux" label="Linux">

### Linux-Ubuntu

This guide is sourced from the official [Docker-CE](https://docs.docker.com/install/linux/docker-ce/ubuntu/) and [Docker-Compose](https://docs.docker.com/compose/install/) Installation Documentation.

#### Install Docker Engine (Community Edition)

1. Update the apt package index:

```
sudo apt-get update
```

2. Install packages to allow apt to use a repository over HTTPS:

```
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

### Installing the app
```bash
$ pnpm install
```

## Running the app (development)

```bash
# docker
$ docker-compose --env-file .env.development up --build

# development
$ pnpm start:dev
```

## Running the app (production)
```bash
# production mode
$ docker-compose --env-file .env.production up --build
```

## Test

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```
