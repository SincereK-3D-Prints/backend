-- Create enum for shipping status first
CREATE TYPE shipping_status_type AS ENUM (
    'pending',
    'processing',
    'shipped',
    'delivered',
    'failed',
    'returned'
    );

-- Then create the table using the enum type
CREATE TABLE orders
(
    id                 SERIAL PRIMARY KEY,
    email              VARCHAR(255)         NOT NULL,
    status             VARCHAR(50)          NOT NULL DEFAULT 'pending',
    shipping_status    shipping_status_type NOT NULL DEFAULT 'pending',
    tracking_number    VARCHAR(100),
    carrier            VARCHAR(50),
    products           JSONB                NOT NULL,
    subtotal           NUMERIC(10, 2)       NOT NULL,
    shipping_cost      NUMERIC(10, 2)       NOT NULL DEFAULT 0.00,
    tax                NUMERIC(10, 2)       NOT NULL DEFAULT 0.00,
    total              NUMERIC(10, 2)       NOT NULL,
    shipping_info      JSONB                NOT NULL,
    billing_info       JSONB                NOT NULL,
    processor          VARCHAR(50)          NOT NULL DEFAULT 'stripe',
    processor_order_id VARCHAR(255),
    processor_status   VARCHAR(50),
    notes              TEXT,
    created_at         TIMESTAMP WITH TIME ZONE      DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP WITH TIME ZONE      DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE
    ON orders
    FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();