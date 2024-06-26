-- name: CreateGame :one
INSERT INTO games (id, name, average, game_status, moderator_id, created_at) 
VALUES ($1, $2, 0, $3, NULL, $4)
RETURNING *;

-- name: UpdateModerator :one
UPDATE games SET moderator_id = $2 WHERE id = $1
RETURNING *;

-- name: GetGameByID :one
SELECT * FROM games WHERE id = $1;

-- name: UpdateGameStatus :one
UPDATE games SET game_status = $2, average = $3 WHERE id = $1
RETURNING *;

-- name: GetAllGamesByCreatedAt :many
SELECT * FROM games ORDER BY created_at DESC;

-- name: DeleteGameByID :one
DELETE FROM games WHERE id = $1
RETURNING *;