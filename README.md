# WatchIt
WatchIt is an app that helps you track what movies you've watched, what movies you want to watch and more..

In order to run the application locally, you need to do few things:

* Create `.env` file in root directory
* Add these environment variables:
    * JWT_SECRET=jwtsecret
    * DB=mongouri
    * SMTP_USER=user
    * SMTP_PASSWORD=password
    * SMTP_HOST=host
    * SMTP_PORT=port
    * TMDB_API_KEY=tmdb api key
    * TMDB_API_BASE_URL=https://api.themoviedb.org/3
* Add your API endpoint in client/config/axios.ts - you'll get the IP address on server start, add the port, eg. http://192.168.1.8:5000/api 
* `npm i`in root and client folder
* `pod install` in ios folder - for iOS

