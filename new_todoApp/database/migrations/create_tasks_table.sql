CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    dueDate DATE NOT NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'Low'
);
