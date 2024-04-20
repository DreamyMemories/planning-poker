-- name: CreatePlayer :one
INSERT INTO players (id, name, game_id, value, created_at)
VALUES ($1, $2, $3, 0, $4)
RETURNING *;

-- name: GetPlayerByID :one
SELECT * FROM players WHERE id = $1;