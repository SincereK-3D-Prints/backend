CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  price JSONB NOT NULL DEFAULT '[15.00, 25.00, 35.00]',
  description TEXT,
  images JSONB DEFAULT '[]',
  colors JSONB DEFAULT '[]',
  sizes JSONB DEFAULT '["S", "M", "L"]',
  stock INT NOT NULL DEFAULT 0,
  sold INT NOT NULL DEFAULT 0,
  shipping_cost NUMERIC(10, 2) DEFAULT 0.00,
  production_cost NUMERIC(10, 2) DEFAULT 1.00,
  production_time INTERVAL DEFAULT '1 day'
);
