// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package database

import (
	"time"

	"github.com/google/uuid"
)

type Game struct {
	ID          uuid.UUID
	Name        string
	Average     int32
	GameStatus  string
	ModeratorID uuid.NullUUID
	CreatedAt   time.Time
}

type Player struct {
	ID        uuid.UUID
	Name      string
	GameID    uuid.UUID
	Value     int32
	CreatedAt time.Time
}
