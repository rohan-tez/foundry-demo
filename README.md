# Etherlink Deploy Demo

This repo is intended for testing the different ways people will want to deploy their contracts.

## Web3.js

```bash
npm install
node script/deploy.js
```

## Web3.py

It is recommended to install [poetry](https://python-poetry.org/docs/) first to manage your environment:

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

```bash
poetry install
poetry run python script/deploy.py
```

## Foundry

Once you have installed [Foundry](https://book.getfoundry.sh/getting-started/installation), run:

```bash
forge create --rpc-url https://node.ghostnet.etherlink.com --private-key <YOUR_KEY> src/Counter.sol:Counter --legacy
```
