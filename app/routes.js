/**
 * Created by Kari on 7.7.2015.
 */

var path = require('path');
var fs = require('fs');

module.exports = function(app) {

// api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        console.log('routes.js: app.get() ');
        //var obj;
        fs.readFile('app/partials/contacts.json', 'utf8', function (err, data) {
            console.log('routes.js: fs.readFile() ');
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                //throw err;
                console.log('Error fs.readFile(): ' + err);
                res.send(err);
            }
            else {
                //obj = JSON.parse(data);
                //res.json(obj);
                console.log('fs.readFile() GET JSON success! ');
                console.log('Data: ' + data);
                res.json(data);
                //res.send(data); // Pete
            }
        });

    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        console.log('routes.js: app.post() ');

        // create a todo, information comes from AJAX request from Angular
        /*Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });*/

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {

        console.log('routes.js: app.delete() ');
        /*
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you deleted a todo
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });*/
    });


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

};