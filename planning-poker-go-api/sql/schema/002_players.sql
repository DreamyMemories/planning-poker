-- +goose Up
CREATE TABLE players (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    value INT NOT NULL DEFAULT 0
);

-- +goose Down
DROP TABLE players;