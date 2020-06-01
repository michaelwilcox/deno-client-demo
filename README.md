# deno-routing

## What is this?

A working sample repo that demonstrates client -> server interactions using react for client and deno for server.

Fetches stock market data (headlines) with symbol lookup + charts.

PRs/issues/suggestions are most welcome! Clone and hack away. #hacktheplanet

## prerequisites

You will need both deno and node. Node is needed for the client setup.

- [deno](https://deno.land/)
- [node](https://nodejs.org/en/)

## setup && run

From root dir, make sure all [prerequisites](#prerequisites) are installed. Then,

```bash
npm run setup && npm run dev
```

## Note

`client/` requires a `.env` file with at least these variables:

```
REACT_APP_NODE_ENV=dev
REACT_APP_SERVER=http://localhost:8000
```

## TODO

- [] better documentation
- [] tests
- [] deployment infra

Happy Hacking! ☠️
