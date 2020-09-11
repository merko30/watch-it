# Booker-ReactNative
Booker is a app that helps you track your bookshelves..

In order to run the application, you need to do few things:

* Create `.env` file in root directory
* Add these environment variables:
    * JWT_SECRET=jwtsecret
    * DB=mongouri
    * SMTP_USER=user
    * SMTP_PASSWORD=password
    * SMTP_HOST=host
    * SMTP_PORT=port
    * GOOGLE_BOOKS_API_KEY=key
    * GOOGLE_BOOKS_API_BASE_URL=https://www.googleapis.com/books/v1/volumes
* Add your API endpoint in client/config/axios.ts - you'll get the IP address on server start, add the port, eg. http://192.168.1.8:5000/api 
* `npm i`in root and client folder
* `pod install` in ios folder - for iOS


**Note: I'm not sure about application on Android devices, I'm going to go through eventual bugs later.
