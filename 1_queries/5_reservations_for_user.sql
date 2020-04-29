SELECT reservations.*, properties.*, ROUND(AVG(rating), 1) AS average_rating
FROM reservations 
JOIN properties ON properties.id = property_id
JOIN property_reviews ON reservations.id = reservation_id
WHERE reservations.guest_id = 1
AND now()::date > end_date
GROUP BY properties.id, reservations.id
ORDER BY start_date
LIMIT 10;