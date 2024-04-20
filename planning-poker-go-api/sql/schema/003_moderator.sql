-- +goose Up
ALTER TABLE games ADD COLUMN moderator_id UUID REFERENCES players(id) ON DELETE CASCADE;

-- +goose Down
ALTER TABLE games DROP COLUMN moderator_id;