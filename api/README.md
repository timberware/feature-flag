## Installing the app
```bash
$ go mod tidy
```

## Running the app (dev)
```bash
# bash
cp cmd/env.dev.example cmd/env.dev

# docker
$ docker compose --env-file cmd/env.dev up --build

# development
$ cd cmd
$ go run .
```

## Running the app (prod)
```bash
# bash
$ cp cmd/env.prod.example cmd/env.prod

# production mode
$ docker compose --env-file cmd/env.prod up --build
```
