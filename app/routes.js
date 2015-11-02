/**
 * Created by Kari on 7.7.2015.
 */

var path = require('path');
var fs = require('fs');
var Contact    = require('./models/contact');

module.exports = function(app) {

// api ---------------------------------------------------------------------
    // get all contacts
    app.get('/api/todos', function(req, res) {

        console.log('routes.js: app.get() ');

        fs.readFile('app/partials/contacts.json', 'utf8', function (err, data) {
            console.log('routes.js: fs.readFile() ');
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                console.log('Error fs.readFile(): ' + err);
                res.send(err);
            }
            else {
                console.log('fs.readFile() GET JSON success! ');
                console.log('Data: ' + data);
                res.json(data);
                //res.send(data); // Pete
            }
        });

    });

    // Create a new contact and send back all contacts after creation
    app.post('/api/todos', function(req, res) {

        console.log('routes.js: app.post() NEW ');
        console.log(JSON.stringify(req.body));

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

    // Modify contact and send back all contacts after creation
    app.post('/api/todos/:contact_id', function(req, res) {

        console.log('routes.js: app.post() MODIFY ');
        console.log(JSON.stringify(req.body));
        console.log('req.body.id', req.body['id']);

        // use our bear model to find the bear we want
        Contact.findById(req.params.contact_id, function(err, contact) {

            if (err)
                res.send(err);

            contact.nimi = req.body.nimi; 	// update the contacts info

            // save the bear
            contact.save(function(err) {
                if (err)
                    res.send(err);

                res.json(contact);
                //res.json({ message: 'Contact updated!' });
            });

        });


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

        console.log('routes.js: app.delete() id:' +req.params.todo_id);
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
        fs.readFile('app/partials/contacts_2_items.json', 'utf8', function (err, data) {
            console.log('routes.js: fs.readFile() delete ');
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


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

};