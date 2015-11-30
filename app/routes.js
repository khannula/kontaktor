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

        Contact.find(function(err, data) {
            if (err) {
                console.log('Cannot find() ERROR: ', err);
                res.send(err);
            }
            else {
                res.json(JSON.stringify(data));
            }

        });
    });

    // Create a new contact and send back all contacts after creation
    app.post('/api/todos', function(req, res) {

        console.log('routes.js: app.post() NEW ');
        console.log(JSON.stringify(req.body));

        var newContact = new Contact();
        newContact.nimi = req.body.nimi; //  ['nimi'];
        newContact.katuosoite = req.body.katuosoite;
        newContact.kaupunki = req.body.kaupunki;
        newContact.puhelinkoti = req.body.puhelinkoti;
        newContact.puhelintyo = req.body.puhelintyo;
        newContact.email = req.body.email;

        newContact.save(function(err) {
            if (err) {
                console.log('New contact save() ERROR: ', err);
                res.send(err);
            }
            else {
                console.log('Contact created!');
            }
        });

        // Send back all connections
        Contact.find(function(err, data) {
            if (err) {
                console.log('Cannot find() ERROR: ', err);
                res.send(err);
            }
            else {
                res.json(JSON.stringify(data));
            }
        });
    });

    // Modify contact and send back all contacts after creation
    app.post('/api/todos/:contact_id', function(req, res) {

        console.log('routes.js: app.post() MODIFY ');
        console.log(JSON.stringify(req.body));
        console.log('req.body.id', req.body['_id']);

        //var tcontact = new Contact({});
        // use Contact model to find the contact we want
        Contact.findById(req.body['_id'], function(err, tempContact) {
            if (err) {
                console.log('findById() ERROR: ', err);
                res.send(err);
            }
            else if(tempContact) {
                // update the contacts info
                console.log('tempContact.nimi A ', tempContact.nimi);
                console.log('req.body[nimi]: ', req.body['nimi']);
                tempContact.nimi = req.body['nimi'];
                console.log('tempContact.nimi', tempContact.nimi);
                tempContact.katuosoite = req.body['katuosoite'];
                tempContact.postinro = req.body['postinro'];
                tempContact.kaupunki = req.body['kaupunki'];
                tempContact.puhelinkoti = req.body['puhelinkoti'];
                tempContact.puhelintyo = req.body['puhelintyo'];
                tempContact.email = req.body['email'];

                //Contact.save(function(err, tempContact, count) {
                tempContact.save(function (err) {
                    if (err) {
                        console.log('Save ERROR ', err.message);
                    }
                    else{
                        console.log('Save UPDATED! ', tempContact);
                        res.statusCode = 200;
                        res.statusText = 'Ok';
                        //res.json(JSON.stringify(tempContact));

                        /* send all back*/
                        Contact.find(function(err, data) {
                            if (err)
                                res.send(err);
                            res.json(JSON.stringify(data));
                        });
                    }
                });
            }
            else{
                console.log('findOne() not found!');
                res.statusCode = 404;
                res.statusText = 'Not found';
                res.send();
            }
        });
    });

    // delete contact
    app.delete('/api/todos/:todo_id', function(req, res) {

        console.log('routes.js: app.delete() id:' +req.params.todo_id);
        /* Tuohon tyyliin.
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

        /* Just a DEMO, sends shorter list back
        fs.readFile('app/partials/contacts_2_items.json', 'utf8', function (err, data) {
            console.log('routes.js: fs.readFile() delete ');
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                //throw err;
                console.log('Error fs.readFile(): ' + err);
                res.send(err);
            }
            else {
                console.log('fs.readFile() GET JSON success! ');
                console.log('Data: ' + data);
                res.json(data);
            }
        });*/
    });


    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

};