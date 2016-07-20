
var directoryControler = require('./FileDirectoriesController');
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
            app[it.method](it.path, function (req, res) {
                res.sendHTML = function (name, callback) {
                    var path = directoryControler.getHTMLSourcesDirectory();
                    res.sendFile(path + '/' + name + '.html', callback);
                };
                it.callback(req, res)
            })
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
        app : app,
        use : use,
        listen : listen,
        setMethods : setMethods,
        engine : engine,
        set : set,
        createMongoDatabase : createMongoDatabase,
        setDefaultHTMLSourcesDirectory : directoryControler.setDefaultHTMLSourcesDirectory,
        dbParams : []

    };
    function createMongoDatabase(name, path){
        function getDatabase(err, database){
            if (err) throw err;
            obj.db = database;
        }
        obj.dbParams.push({path : path, name : name , callback : getDatabase});
        obj[name] = ''
    }
    return obj;
};

