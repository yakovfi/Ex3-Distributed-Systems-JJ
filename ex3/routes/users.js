const fs = require('fs');
// variables
let bb;
const dataPath = './data/users.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (!data) data = "{}";
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            console.log(err);
        }

        callback();
    });
};


module.exports = {
    //READ
    read_users: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                res.sendStatus(500);
            }
            else
                res.send(!data ? JSON.parse("{}") : JSON.parse(data));
        });
    },

    // CREATE
    createTour: function (req, res) {

        readFile(data => {
            // console.log(req.body)
            // add the new user
            if (!req.body.id || !req.body.price || !req.body.start_date || !req.body.duration || !req.body.guide.name ||
                !req.body.guide.email || !req.body.guide.cellular) {
                res.status(400).send('bad input: Some of the fields are empty');
            }
            data[req.body.id] = req.body;


            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new user added');
            });
        },
            true);
    },

    // UPDATE
    update_user: function (req, res) {
        //להוסיף בדיקות שרת!!!!!!!!!!!!!!!!!!!!
        readFile(data => {
            if (!req.params["id"]) {
                res.sendStatus(400);
            }
            // add the new user

            //Test of the functionalities.
            // bb=req.body
            // console.log(req.params);
            
            const userId = req.params["id"];
            if (!data[userId]) res.status(400).send("id doesn't exist!");

            else
                data[userId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} updated`);
            });
        },
            true);
    },
    // DELETE
    delete_user: function (req, res) {

        readFile(data => {

            // add the new user
            const userId = req.params["id"];
            delete data[userId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    }
};