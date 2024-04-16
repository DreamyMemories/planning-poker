-- +goose Up
CREATE TABLE players (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    socket_id VARCHAR(255) UNIQUE,
    value INT DEFAULT 0
);

-- +goose Down
DROP TABLE players;