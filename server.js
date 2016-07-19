var dirPath = require('path').resolve(__dirname);
var fileControler = require('./node_modules/express/lib/fileControler');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
exports.createServer = function(){
    var connections = [];
    var app = require('express')();
    var bodyParser = require('body-parser'); 
    app.use(bodyParser.json());
    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({ extended: true }));
    function setMethods(methods){
        methods.forEach(function(it){
            connections.push(it);
        })
    }
    function use(middleware){
        this.app.use(middleware);
    }
    function listen(port, callback){
        if (this.dbParams != []){
           this.dbParams.forEach(function (it) {
               MongoClient.connect(it.path, it.callback, function(err, database){
                   obj[it.name] = database;
               })
           });
        }
        connections.forEach(function (it) {
            app[it.method](it.path, it.callback)
        });
        this.app.listen(port, callback)

    }
    function engine(name, module){
        this.app.engine(name, module);
    }
    function set(name, module) {
        this.app.set(name, module)
    }
    var obj = {
        path : dirPath,
        app : app,
        use : use,
        listen : listen,
        setMethods : setMethods,
        engine : engine,
        set : set,
        setDefaultHTMLSourcesDirectory : fileControler.setCorrectHTMLSourcesDirectory,
        createMongoDatabase : createMongoDatabase,
        dbParams : []

    };
    function createMongoDatabase(name, path){
        function getDatabase(err, database){
            if (err) throw err;
            obj.db = database;
        }
        obj.dbParams.push({path : path, name : name , callback : getDatabase})
        obj[name] = ''
    }
    return obj;
};

