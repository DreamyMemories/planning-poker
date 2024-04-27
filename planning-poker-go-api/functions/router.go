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
	mux.Handle("/game/update/{gameId}", corsMiddleware(config.handlerUpdateGame())).Methods("POST", "OPTIONS")
	mux.Handle("/game/status/{gameId}", corsMiddleware(config.handlerGetGameStatus())).Methods("GET", "OPTIONS")
	mux.Handle("/player/init", corsMiddleware(config.handlerInitPlayer())).Methods("POST", "OPTIONS")
	mux.Handle("/player/lobby/{gameId}", corsMiddleware(config.handlerGetPlayersLobby())).Methods("GET", "OPTIONS")
	mux.Handle("/player/update/{playerId}", corsMiddleware(config.handlerUpdatePlayer())).Methods("POST", "OPTIONS")
	mux.Handle("/player/update/all/{gameId}", corsMiddleware(config.handlerUpdateAllPlayers())).Methods("POST", "OPTIONS")
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

		players, err := config.DB.GetPlayersByGameID(context.Background(), params.Game_id)

		if len(players) == 1 {
			_, gameErr := config.DB.UpdateModerator(context.Background(), database.UpdateModeratorParams{
				ID:          params.Game_id,
				ModeratorID: uuid.NullUUID{UUID: player.ID, Valid: true},
			})

			if gameErr != nil {
				respondWithError(w, http.StatusInternalServerError, gameErr.Error())
				return
			}
		}

		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		// Broadcast to all players in the game that a new player has joined
		broadcastToGame(params.Game_id, "join")
		respondWithJson(w, 200, player)
	}
}

func (config *ApiConfig) handlerUpdateGame() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			Status  string `json:"GameStatus"`
			Average int32  `json:"average"`
		}

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid request payload")
			return
		}

		vars := mux.Vars(r)
		gameID := vars["gameId"]
		if gameID == "" {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		gameUUID, err := uuid.Parse(gameID)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		game, err := config.DB.UpdateGameStatus(context.Background(), database.UpdateGameStatusParams{
			ID:         gameUUID,
			GameStatus: params.Status,
			Average:    params.Average,
		})

		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}
		// Broadcast to all players in the game that a new player has joined
		broadcastToGame(game.ID, "join")
		respondWithJson(w, 200, game)
	}
}

func (config *ApiConfig) handlerGetGameStatus() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		gameID := vars["gameId"]
		if gameID == "" {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		gameUUID, err := uuid.Parse(gameID)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		game, err := config.DB.GetGameByID(context.Background(), gameUUID)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		respondWithJson(w, 200, game)
	}
}

func (config *ApiConfig) handlerUpdatePlayer() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			Value int32 `json:"value"`
		}

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid request payload")
			return
		}

		vars := mux.Vars(r)
		playerID := vars["playerId"]
		if playerID == "" {
			respondWithError(w, http.StatusBadRequest, "Invalid player ID")
			return
		}

		playerUUID, err := uuid.Parse(playerID)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid player ID")
			return
		}

		player, err := config.DB.UpdatePlayerValue(context.Background(), database.UpdatePlayerValueParams{
			ID:    playerUUID,
			Value: params.Value,
		})

		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}
		// Broadcast to all players in the game that a new player has joined
		broadcastToGame(player.GameID, "join")
		respondWithJson(w, 200, player)
	}
}

func (config *ApiConfig) handlerUpdateAllPlayers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var params struct {
			Value int32 `json:"value"`
		}

		err := json.NewDecoder(r.Body).Decode(&params)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid request payload")
			return
		}

		vars := mux.Vars(r)
		gameID := vars["gameId"]
		if gameID == "" {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		gameUUID, err := uuid.Parse(gameID)

		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		players, err := config.DB.UpdateAllPlayersValue(context.Background(), database.UpdateAllPlayersValueParams{
			GameID: gameUUID,
			Value:  params.Value,
		})

		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		broadcastToGame(gameUUID, "join")
		respondWithJson(w, 200, players)
	}
}

func (config *ApiConfig) handlerGetPlayersLobby() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		gameID := vars["gameId"]
		if gameID == "" {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		gameUUID, err := uuid.Parse(gameID)
		if err != nil {
			respondWithError(w, http.StatusBadRequest, "Invalid game ID")
			return
		}

		players, err := config.DB.GetPlayersByGameID(context.Background(), gameUUID)
		if err != nil {
			respondWithError(w, http.StatusInternalServerError, err.Error())
			return
		}

		respondWithJson(w, 200, players)
	}
}
