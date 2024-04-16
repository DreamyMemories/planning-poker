-- +goose Up
CREATE TABLE games (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    average INT DEFAULT 0,
    game_status VARCHAR(50) NOT NULL CHECK (game_status IN ('NOT_STARTED', 'IN_PROGRESS', 'FINISHED'))
);


-- +goose Down
DROP TABLE games;