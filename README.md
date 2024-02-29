
![XavisMusicLounge](https://github.com/Xavi-Alejandro/SenecaMusicService/assets/79874223/1d4fde08-f28f-4c63-84fc-cf354905f98f)

# "Xavi's music lounge"

Created with Angular and Node, this app has integrations with PassportJWT, MongoDB and Spotify's public API.

# Spotiy connection
- This app integrates Spotify's Web API to request data based on album names, artist names, and new releases. We use passportJWT to authenticate the connection.
- Songs from various artist can be saved on the logged in user's profile to be loaded whenever the user logs in. 
- Registered users can play 30 second clips from their favourite artists.

# User storage
- Registered users are stored on MongoDB using the "user-service" module's functions.
- We use the request data from the main application to add, retrieve, and modify user information.

# Application layout
- The application is generated with Angular, and uses Angular's "Angular Material" themes to style and structure content dynamically.


