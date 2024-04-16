package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("error loading .env file")
	}

	port := os.Getenv("PORT")
	dbUrl := os.Getenv("DATABASE_URL")

	if port == "" {
		log.Fatal("$PORT must be set")
	}

	if dbUrl == "" {
		log.Fatal("$DATABASE_URL must be set")
	}

	// Load database
	db, err := sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatal(err)
	}
	dbQueries := database.New(db)
}
