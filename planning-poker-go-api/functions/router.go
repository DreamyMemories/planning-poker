package functions

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/DreamyMemories/Planning-Poker/internal/database"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

type ApiConfig struct {
	DB *database.Queries
}

type GameStatus string

const (
	NotStarted GameStatus = "NOT_STARTED" // iota starts at 0
	InProgress GameStatus = "IN_PROGRESS"
	Finished   GameStatus = "FINISHED"
)

func Mux(config *ApiConfig) *mux.Router {
	mux := mux.NewRouter()
	mux.Handle("/game/init", corsMiddleware(config.handlerInitGame())).Methods("POST", "OPTIONS")
	mux.Handle("/player/init", corsMiddleware(config.handlerInitPlayer())).Methods("POST", "OPTIONS")
	mux.HandleFunc("/ws/{gameId}", gameSocket)
	return mux
}

func (config *ApiConfig) handlerInitGame() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			Name string `json:"name"`
		}

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid request payload")
			return
		}

		game, err := config.DB.CreateGame(context.Background(), database.CreateGameParams{
			ID:         uuid.New(),
			Name:       params.Name,
			GameStatus: string(NotStarted),
			CreatedAt:  time.Now(),
		})

		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}
		respondWithJson(w, 200, game)
	}
}

func (config *ApiConfig) handlerInitPlayer() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			Name    string    `json:"name"`
			Game_id uuid.UUID `json:"gameId"`
		}

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid request payload")
			return
		}

		player, err := config.DB.CreatePlayer(context.Background(), database.CreatePlayerParams{
			ID:        uuid.New(),
			Name:      params.Name,
			GameID:    params.Game_id,
			CreatedAt: time.Now(),
		})

		_, gameErr := config.DB.UpdateModerator(context.Background(), database.UpdateModeratorParams{
			ID:          params.Game_id,
			ModeratorID: uuid.NullUUID{UUID: player.ID, Valid: true},
		})

		if err != nil || gameErr != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}
		respondWithJson(w, 200, player)
	}
}
