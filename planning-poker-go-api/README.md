# Planning Poker API

## Introduction
This is the backend for the Planning Poker application. It is written in Go and uses the Gorilla Websocket and Mux to handle connections. The database used is Postgres.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)


## Installation
1. To set up the API, you will need to have Go installed on your machine. You can download it [here](https://golang.org/dl/).
2. Install the dependencies by running `go mod tidy`
3. Make sure `goose` and `sqlc` is installed to handle database migrations
3. Setup PostgreSQL on your machine and create a database
4. Run `goose up` to run the migrations with the credentials
5. Configure environment variables in a `.env` file. You can use the `.env.example` file as a template

## Usage
Run the project by executing:
```bash
go build; ./Planning-Poker.exe
```

## Features
- Api for handling game creation, joining, and voting
- Websocket connection for real-time updates
- Postgres database for storing game data
- Migrations for database setup
- Routine cleanup of inactive games and players
