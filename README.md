# Installation

## Database
The application is built leveraging a PostgreSQL database instance.  
If you have PostgresSQL installed, simply run
```
psql -U postgres --file skeanariolabs_db.sql
```
To initialize the propertyviewer database with the correct tables.  
You might be prompted for your postgres user password to allow configuration.  
This will also create a user in the database with its credentials matching the server application.properties config file, with access only to the propertyviewer database instance.  

## Client
The client is built using React with it's CRA TypeScript template.  
To run the application, you need to have the Node.js environment locally installed and can check it's presence by running ```node -v; npm -v```.  
If not available, follow the instructions <a href="https://nodejs.org/en/download/">here</a> to install it.  
If it is available, follow the below steps from the root folder:
```
cd client
npm i
npm start
```
This will run the client application at the default port (3000). To access the app, go to http://localhost:3000.

You will also need to provide the necessary environmental variables in the .env file. A .env-example has been provided for reference at the root client folder, with the server address pointing towards the default Springboot application port. If you are not using the default port, you need to change the address to match your local environment. This application also leverages the <a href="https://www.geoapify.com/geocoding-api">Geoapify</a> geocoding api, and you need to provide your own key to properly leverage the enriched coordinates features inside the client.

## Server
The server is built using Maven and Spring Initializr.   
You need to have maven installed and can check it's presence by running ```mvn -v``` on the command line.  
If you have it available, simply follow the instructions starting from the root repository:
```
cd server/property-viewer
mvn clean install
``` 
With the server running, it is ready to accept requests from the client at its default port (8080).