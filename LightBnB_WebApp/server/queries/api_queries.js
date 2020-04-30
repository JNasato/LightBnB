const pool = require('../database');

/// Reservations ------------------------------------------------------------------------------

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT reservations.*, properties.*, ROUND(AVG(rating), 2) AS average_rating, 
  CASE
    WHEN now()::date > end_date THEN 'Past'
    ELSE 'Future'
    END AS past_or_future
  FROM reservations 
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY start_date DESC
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties --------------------------------------------------------------------------------

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];

  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (queryParams.length > 1) {
      queryString += `AND owner_id = $${queryParams.length} `;
    } else {
      queryString += `WHERE owner_id = $${queryParams.length} `;
    }
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    if (queryParams.length > 1) {
      queryString += `AND (cost_per_night/100) >= $${queryParams.length} `;
    } else {
      queryString += `WHERE (cost_per_night/100) >= $${queryParams.length} `;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    if (queryParams.length > 1) {
      queryString += `AND (cost_per_night/100) <= $${queryParams.length} `;
    } else {
      queryString += `WHERE (cost_per_night/100) <= $${queryParams.length} `;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    if (queryParams.length > 1) {
      queryString += `AND property_reviews.rating >= $${queryParams.length} `;
    } else {
      queryString += `WHERE property_reviews.rating >= $${queryParams.length} `;
    }
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let queryParams = [];
  for (let p in property) {
    queryParams.push(property[p]);
  }

  let queryString = `
    INSERT INTO properties (title, description, parking_spaces, number_of_bathrooms, number_of_bedrooms, cost_per_night, thumbnail_photo_url, cover_photo_url, street, country, city, province, post_code, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then(res => res.rows[0]);
}
exports.addProperty = addProperty;