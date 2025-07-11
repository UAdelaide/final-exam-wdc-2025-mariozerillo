INSERT INTO Users (username, email, password_hash, role)
VALUES
    ('alice123', 'alice@example.com', 'hashed123', 'owner'),
    ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
    ('carol123', 'carol@example.com', 'hashed789', 'owner'),
    ('johnsmith', 'john@example.com', 'hashedABC', 'walker'),
    ('jane123', 'jane@example.com', 'hashedDEF', 'owner');

INSERT INTO Dogs (owner_id, name, size)
    SELECT user_id, 'Max', 'medium' FROM Users WHERE username = 'alice123' UNION ALL
    SELECT user_id, 'Bella', 'small' FROM Users WHERE username = 'carol123' UNION ALL
    SELECT user_id, 'Scooby', 'large' FROM Users WHERE username = 'jane123' UNION ALL
    SELECT user_id, 'Scrappy', 'medium' FROM Users WHERE username = 'carol123' UNION ALL
    SELECT user_id, 'Buster', 'medium' FROM Users WHERE username = 'jane123';

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status)
    SELECT dog_id, '2025-06-10 08:00:00', 30, 'Parklands', 'completed' FROM Dogs WHERE name = 'Max' UNION ALL
    SELECT dog_id, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted' FROM Dogs WHERE name = 'Bella' UNION ALL
    SELECT dog_id, '2025-06-10 10:00:00', 15, 'Seaton', 'accepted' FROM Dogs WHERE name = 'Scooby' UNION ALL
    SELECT dog_id, '2025-06-10 10:30:00', 20, 'Fulham', 'open' FROM Dogs WHERE name = 'Scrappy' UNION ALL
    SELECT dog_id, '2025-06-10 11:30:00', 60, 'West Lakes Shore', 'open' FROM Dogs WHERE name = 'Buster';

/* Hard coded walk rating to test api/walkers/summary endpoint */
INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments)
VALUES
    (1, 2, 1, 4, 'abc');