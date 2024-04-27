package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/DreamyMemories/Planning-Poker/functions"
	"github.com/DreamyMemories/Planning-Poker/internal/database"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
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
	apiConfig := &functions.ApiConfig{DB: dbQueries}

	// Load router
	mux := functions.Mux(apiConfig)
	server := &http.Server{
		Addr:    ":" + port,
		Handler: mux,
	}
	functions.Cleanup(apiConfig)
	log.Println("Server started on port " + port)
	err = server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
