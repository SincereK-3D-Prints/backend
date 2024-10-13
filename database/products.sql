CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT,
  image TEXT[],
  colors TEXT[],
  stock INT NOT NULL,
  shipping_cost NUMERIC(10, 2),
  production_cost NUMERIC(10, 2),
  production_time INTERVAL
);
