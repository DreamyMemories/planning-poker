package functions

import (
	"context"
	"fmt"
	"time"
)

func Cleanup(apiConfig *ApiConfig) {
	ticker := time.NewTicker(24 * time.Hour)
	go func() {
		for range ticker.C {
			fmt.Println("Starting cleanup routine")
			// Get all games
			games, err := apiConfig.DB.GetAllGamesByCreatedAt(context.Background())

			if err != nil {
				fmt.Println("Error getting games", err)
				continue
			}
			fmt.Println("Found", len(games), "games")
			for _, game := range games {
				// If game is older than 1 hour, delete it
				if time.Since(game.CreatedAt) > 24*time.Hour {
					_, err := apiConfig.DB.DeleteGameByID(context.Background(), game.ID)
					if err != nil {
						fmt.Println("Error deleting game", err)
					}
				}
			}

			// Get all players
			players, err := apiConfig.DB.GetAllPlayersByCreatedAt(context.Background())

			if err != nil {
				fmt.Println("Error getting players", err)
				continue
			}
			fmt.Println("Found", len(players), "players")
			for _, player := range players {
				// If player is older than 1 hour, delete it
				if time.Since(player.CreatedAt) > 24*time.Hour {
					_, err := apiConfig.DB.DeletePlayerByID(context.Background(), player.ID)
					if err != nil {
						fmt.Println("Error deleting player", err)
					}
				}
			}
		}
	}()

}
