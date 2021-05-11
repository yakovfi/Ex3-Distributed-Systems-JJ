const bodyParser = require('body-parser');
const { json } = require('body-parser');
const fs = require('fs');
const { cpuUsage } = require('process');
const { use } = require('./routes');
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
                res.status(500).send("server error");
            }
            else
                res.send(!data ? JSON.parse("{}") : JSON.parse(data));
        });
    },

    // CREATE
    createTour: function (req, res) {

        readFile(data => {

            if (data[req.body.id] != undefined) {

                res.status(400).send("Tour already exists!!");
            }
            else {
                data[req.body.id] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('new user added');
                });
            }
        },
            true);
    },

    // UPDATE
    update_user: function (req, res) {
        readFile(data => {
            if (!req.params["id"]) {

                res.status(404).json({ errors });
                // stop further execution in this callback
                return;
            }
            else {
                let flag = false;
                let saveKey = [];
                let saveKeyGuide = [];
                let i = 0;
                for (var propName in req.body) {
                    saveKey[i] = propName;
                    i++;
                }


                for (var prop in req.body.guide) {
                    saveKeyGuide[i] = prop;
                    i++;
                }

                // console.log(saveKeyGuide);
                // console.log(saveKey);


                let userId = req.params["id"];
                // let i = 0;
                // saveKey[i] === "name" || saveKey[i] === "country"
                // for (let i = 0; i < saveKey.length; i++) {
                if (req.body.country != undefined) {

                    // console.log(typeof req.body.name);
                    let identical = false;
                    data[userId].path.forEach(e => {
                        if (e.name == req.body.name && e.country == req.body.country) {
                            identical = true;
                            console.log("e.name:", e.name, " req.body.name", req.body.name);
                            return;
                        }
                    });
                    if (identical) {
                        res.status(400).send("The location already exists");
                        return;
                    }
                    else {

                        let new_location = `{"name": "${req.body.name}","country": "${req.body.country}"}`;
                        data[userId].path.push(JSON.parse(new_location));
                    }

                }
                // if (saveKey[i] !== "start_date" && saveKey[i] !== "price" && saveKey[i] !== "guide" && saveKey[i] !== "duration") {
                //     flag = true;
                //     res.status(400).send(`The ${saveKey[i]} field is invalid`);
                //     return;
                // }
                // }

                // if (flag == false) {
                if (req.body.start_date) {

                    let userId = req.params["id"];

                    if (!data[userId]) {

                        return res.status(400).send("id doesn't exist!");
                    }
                    else
                        // console.log("req.body.duration:", req.body);
                        data[userId].start_date = req.body.start_date;
                }

                //-----------------------------------
                if (req.body.price) {

                    let userId = req.params["id"];
                    if (!data[userId]) {
                        return res.status(400).send("id doesn't exist!");
                    }

                    else {
                        data[userId].price = req.body.price;
                    }
                    // console.log("af:", data[userId].price);
                }
                //-----------------------------------
                if (req.body.duration) {
                    let userId = req.params["id"];

                    if (!data[userId]) {
                        return res.status(400).send("id doesn't exist!");

                    }

                    else {
                        data[userId].duration = req.body.duration;
                    }
                    // console.log("af:", data[userId].duration)

                }
                if (req.body.guide) {
                    let userId = req.params["id"];
                    if (!data[userId]) {
                        return res.status(400).send("id doesn't exist!");

                    }
                    else {
                        // console.log("2");
                        // console.log(saveKeyGuide.length);
                        for (let i = 4; i < saveKeyGuide.length; i++) {
                            // console.log(saveKeyGuide[i])
                            // console.log(saveKeyGuide[i]);
                            if (saveKeyGuide[i] !== "name" && saveKeyGuide[i] !== "email" && saveKeyGuide[i] !== "cellular") {
                                flagErrGuide = true;
                                res.status(400).send(`The ${saveKeyGuide[i]} field is invalid into guide field`);
                                return;
                            }
                        }
                        if (req.body.guide.name)
                            data[userId].guide.name = req.body.guide.name;
                        if (req.body.guide.email)
                            data[userId].guide.email = req.body.guide.email;
                        if (req.body.guide.cellular)
                            data[userId].guide.cellular = req.body.guide.cellular;

                    }
                    // console.log("af:", data[userId].duration)
                }


                writeFile(JSON.stringify(data, null, 2), () => {
                    return res.status(200).send(`users id: updated`);
                });
                // }
            }
        },
            true);
    },
    // DELETE
    delete_user: function (req, res) {

        readFile(data => {

            const userId = req.params["id"];
            // add the new user
            if (req.body.delete != undefined) {
                data[userId].path.splice(0, data[userId].path.length);//ipmortent function!!!!!!!!!!!
            }



            else if (req.body.country != undefined) {
                let index_to_del = 0;
                data[userId].path.forEach(function (part, index) {

                    if (this[index].name == req.body.name && this[index].country == req.body.country) {
                        index_to_del = index;
                        // delete this[index];
                    }

                }, data[userId].path);

                data[userId].path.splice(index_to_del, 1);

            }
            else
                //---------else----------------------------------
                delete data[userId];
            //-------------------------------------------
            // let loacation = req.params["name"];  
            // delete data[userId].path[location];

            // console.log(req.body);
            // if (req.body.path[req.body] != undefined) {
            //     delete data[userId].path[req.body];
            // }

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    }
};