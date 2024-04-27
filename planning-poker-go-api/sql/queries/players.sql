-- name: CreatePlayer :one
INSERT INTO players (id, name, game_id, value, created_at)
VALUES ($1, $2, $3, 0, $4)
RETURNING *;

-- name: GetPlayersByGameID :many
SELECT * FROM players WHERE game_id = $1;

-- name: UpdatePlayerValue :one
UPDATE players SET value = $1 WHERE id = $2 
RETURNING *;

-- name: UpdateAllPlayersValue :many
UPDATE players SET value = $1 WHERE game_id = $2
RETURNING *;

-- name: GetAllPlayersByCreatedAt :many
SELECT * FROM players ORDER BY created_at DESC;

-- name: DeletePlayerByID :one
DELETE FROM players WHERE id = $1
RETURNING *;