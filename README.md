# Property Viewer (Skenario Labs)
Simple CRUD application that enables a registered user to perform all necessary operations to manage a properties portfolio.  
Properties are then displayed on a grid, allowing the user to either edit its fields or remove them entirely.  
All added properties have enriched coordinates (latitude and longitude) obtained by geocoding the submitted addresses using the Geoapify API. This API is consumed client-side to reduce server load, and the API key is secured by specifying strict CORS policies. If higher security is desired, it would be advisable to switch over the calls to the Geoapify service to the server, however increasing server-side processing.

Full-stack application built using Java (Spring Boot framework) for the server, connected to an instance of a PostgreSQL database, and a frontend client built using React and TypeScript.  
Biggest weakness and definite cardinal sin on this application: lack of testing... (*shame bells tolling*).

<br><br><br>

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
This will run the client application at the default port (3000). To access the app, go to http://localhost:3000. If you want to prescribe a specific port, you can use ```npm start --PORT=3005``` for example.

You will also need to provide the necessary environmental variables in the .env file. A .env-example has been provided for reference at the root client folder, with the server address pointing towards the default Springboot application port. If you are not using the default port, you need to change the address to match your local environment.  
This application also leverages the <a href="https://www.geoapify.com/geocoding-api">Geoapify</a> geocoding api, and you need to provide your own key to obtain the enriched coordinates features inside the client. To ensure your API key is secure, remember to set the CORS policy of your key in the "Allowed Origins" to only take requests from your domain or localhost at a prescribed port.

## Server
The server is built using Maven and Spring Initializr.   
You need to have maven installed and can check it's presence by running ```mvn -v``` on the command line.   
If not available, installation instructions for all systems can be found <a href="https://maven.apache.org/install.html">here</a>.  
If you have it available, simply follow the instructions starting from the root repository:
```
cd server/property-viewer
mvn clean install
java -jar target/property-viewer-0.0.1-SNAPSHOT.jar
``` 
With the server running, it is ready to accept requests from the client at its default port (8080).