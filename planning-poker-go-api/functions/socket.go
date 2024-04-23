package functions

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// Map to keep track of game connections
var games = make(map[uuid.UUID][]*websocket.Conn)

// Websocket endpoint
func gameSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println("Error upgrading connection to websocket", err)
		return
	}
	defer conn.Close()

	// Get game ID from URL
	vars := mux.Vars(r)
	gameID := vars["gameId"]
	if gameID == "" {
		fmt.Println("No game ID provided")
		conn.Close()
		return
	}
	gameUUID, err := uuid.Parse(gameID)
	if err != nil {
		fmt.Println("Invalid game ID provided")
		conn.Close()
		return
	}
	// Add connection to list of subscribers
	games[gameUUID] = append(games[gameUUID], conn)
	fmt.Println("Websocket connection established")

	broadcastToGame(gameUUID, "join")

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Error reading message from websocket", err)
			break
		}
		fmt.Printf("Received message from game %s: %s\n", gameID, message)

		for _, c := range games[gameUUID] {
			if err := c.WriteMessage(websocket.TextMessage, message); err != nil {
				fmt.Println("Error writing message to websocket", err)
			}
		}
	}

	removeConnection(gameUUID, conn)
}

func broadcastToGame(gameId uuid.UUID, message string) {
	messageStruct := struct {
		Type string `json:"type"`
	}{
		Type: message,
	}
	msg, err := json.Marshal(messageStruct)

	if err != nil {
		fmt.Println("Error marshaling message:", err)
		return
	}

	for _, conn := range games[gameId] {
		if err := conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			fmt.Println("Error writing message to websocket", err)
			continue
		}
		fmt.Println("sending message to game", gameId)
	}
}

func removeConnection(gameID uuid.UUID, conn *websocket.Conn) {
	conns := games[gameID]
	for i, c := range conns {
		if c == conn {
			conns = append(conns[:i], conns[i+1:]...)
			break
		}
	}
	games[gameID] = conns
}
