# Bryson At Work
A web site for a office game.

# Development Evironment Setup
## Software
- Node js
- NPM
- Mongodb

## First Time Operations
After installing all required software

From the command line navigate to project folder and run      
```npm install```


### Create a database folder
Start a new command line terminal and make a new folder   
Linux   
```mkdir database```

Windows   
```md database```

### Start mongodb
Windows  
navigate to bin folder of mongodb  
default c:\Program Files\mongodb\server\<version>\bin 

Linux and Windows  
run  
```mongod --port 45000 --dbpath <path to database folder>```

### Start web app
From first command line terminal in project folder   run  
```npm start```

# Development
Use any text edit to edit the files, some edits to files will require a reboot of the web app.  
```CTRL+C``` then ```npm start```
