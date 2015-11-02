/**
 * Created by Kari on 2.11.2015.
 */

/*
 * GET contact by id.
 */

exports.list = function(req, res) {
    Contact.findById(req.params.contact_id, function(err, contact) {
        if (err)
            res.send(err);
        res.json(contact);
    });
};