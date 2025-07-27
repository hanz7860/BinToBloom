CREATE TABLE IF NOT EXISTS badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(500),
    icon_url VARCHAR(255),
    type VARCHAR(100),
    required_points INT,
    required_waste DOUBLE,
    required_pickups INT
);
