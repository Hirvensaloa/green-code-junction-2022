CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (id, username, password) VALUES ('c5443fae-3a22-4dbb-82f0-136b8f277435', 'admin', 'admin');

CREATE TABLE attachment (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    score INT NOT NULL DEFAULT 0,
    attachment_type VARCHAR(255) NOT NULL 
);

CREATE TABLE text_post (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  score INT NOT NULL DEFAULT 0
);

CREATE TABLE energy_bar (
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount INT NOT NULL DEFAULT 1000,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);