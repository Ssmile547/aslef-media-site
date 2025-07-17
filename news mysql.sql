CREATE TABLE businesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url VARCHAR(255),
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  
  -- Contact Fields
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(100),
  website VARCHAR(255),
  address TEXT,
  location VARCHAR(100),
  
  -- Social Media
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  linkedin VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);