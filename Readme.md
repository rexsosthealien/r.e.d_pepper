My tool is designed to make express code more compact.
To create a server you need to import the module, and use the 'createServer' function.
After that you will be able to use the 'setConnections' function, that get as argument list of method,
created with 'connection.create' function, that takes as argument the type of the method, the path and callback.
To launch the server, you have to use the 'server.listen' function that takes as arguments the port to listen and callback.

The 'createServer' function return a object that include the simple express app. so if there is a missing method
in the server you can use it on the app returned from createServer.
All the methods in the module :


    1. createServer() : return the server object


    2. method.create(name, path, callback) : create a method


    3. server.use(item) : let the app use the item


    4. server.engine(name, module) : let the app use templating engine.


    5. server.setDefaultHTMLSourcesDirectory(dirname) : set the default package contending html to this server


    6. res.sendHTML(name, callback) : makes the res send the html file from the default directory
    
    
    7. server.sendFile(path, res, callback) : sends 
    
    
    8.server.createMongoDatabase(name, path) : create mongo database with name 'name' on path 'path'

There will be methods more at the future.