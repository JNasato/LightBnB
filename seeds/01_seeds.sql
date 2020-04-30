INSERT INTO users (name, email, password)
  VALUES ('Pete Davidson', 'peteyd@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('John Mulaney', 'j.mulaney@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Nick Kroll', 'hormone_monster@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES (2, 'Johns Place', 'description', 'https://mediad.publicbroadcasting.net/p/shared/npr/202001/706836850.jpg', 'https://sqlzoo.net/w/images/c/ce/FootballERD.png', 42000, 2, 6, 6, 'Canada', '1650 Hejto Center', 'Genwezuj', 'Newfoundland and Labrador', 44583, true),
  (3, 'Bouncy Castle', 'description', 'https://i.pinimg.com/originals/45/6a/52/456a52031610e8fb2998705c35f03264.jpg', 'https://sqlzoo.net/w/images/c/ce/FootballERD.png', 900, 6, 2, 1, 'Canada', '513 Powov Grove', 'Jaebvap', 'Ontario', '38051', true),
  (2, 'HUSH', 'description', 'https://pbs.twimg.com/profile_images/530054996423749632/uIa2HxTV.jpeg', 'https://sqlzoo.net/w/images/c/ce/FootballERD.png', 66669, 0, 1, 5, 'Canada', '1392 Gaza Junction', 'Upetafpuv', 'Nova Scotia', '81059', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
  VALUES ('2018-09-11', '2018-09-26', 3, 1),
  ('2019-01-04', '2019-02-01', 1, 2),
  ('2021-10-01', '2021-10-14', 2, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
  VALUES (1, 3, 1, 1, 'messages'),
  (2, 1, 2, 5, 'messages'),
  (1, 2, 3, 4, 'messages');