GET /users: Retrieve all users. admin only
POST /users: Create a new user. admin only
GET /users/{id}: Retrieve a specific user's details. all
POST /users/{id}: Update a specific user's details. all user changes for him self only admin can change all
DELETE /users/{id}: Delete a specific user. admin

Properties:
GET /properties: Retrieve all properties. all
POST /properties: Create a new property. admin owner
GET /properties/{id}: Retrieve a specific property's details. all
POST /properties/{id}: Update a specific property's details. admin and owner
DELETE /properties/{id}: Delete a specific property. admin owner
Bookings:
GET /bookings: Retrieve all bookings. admin
POST /bookings: Create a new booking. admin client
POST /bookings/{id}/status: Update a booking's status.
DELETE /bookings/{id}: Delete a specific booking.

# pages

home page get Retrieve all properties. all
prop details page get /properties/{id}: Retrieve a specific property's details. all
profile page for client client only
profile page for owner owner only
