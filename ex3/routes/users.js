const bodyParser = require('body-parser');
const { json } = require('body-parser');
const fs = require('fs');
const { cpuUsage } = require('process');
const { use } = require('./routes');
// variables

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
//--------------------------------------------------------
function checkDate(field) {
    var allowBlank = true;
    var minYear = 1902;
    var maxYear = (new Date()).getFullYear();

    var errorMsg = "";

    // regular expression to match required date format
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    if (field.value != '') {
        if (regs = field.value.match(re)) {
            if (regs[1] < 1 || regs[1] > 31) {
                errorMsg = "Invalid value for day: " + regs[1];
            } else if (regs[2] < 1 || regs[2] > 12) {
                errorMsg = "Invalid value for month: " + regs[2];
            } else if (regs[3] < minYear || regs[3] > maxYear) {
                errorMsg = "Invalid value for year: " + regs[3] + " - must be between " + minYear + " and " + maxYear;
            }
        } else {
            errorMsg = "Invalid date format: " + field.value;
        }
    } else if (!allowBlank) {
        errorMsg = "Empty date not allowed!";
    }

    if (errorMsg != "") {
        alert(errorMsg);
        field.focus();
        return false;
    }

    return true;
}
//--------------------------------------------------------

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
                let saveKey = [];
                let i = 0;

                for (var propName in req.body) {
                    if (propName != "id" && propName != "start_date" && propName != "duration" && propName != "price" && propName != "guide" && propName != "path") {

                        console.log("In verifs validity field ", propName);
                        res.status(400).send("Invalid fields !!");
                        return;
                        // saveKey[i] = propName;
                        // i++;
                    }
                    if (propName == "start_date") {
                        var date_regex = /^(([0-9][0-9][0-9][0-9])\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01]))$/;
                        if (!date_regex.test(req.body.start_date)) {
                            console.log(req.body.start_date);
                            res.status(400).send("Invalid start_date field!!");
                            return;
                        }
                    }

                    if (propName == "guide") {
                        for (var prop in req.body.guide) {

                            if (prop == "name") {
                                var name_regex = /^[A-Za-z]+$/;
                                if (!name_regex.test(req.body.guide.name)) {
                                    res.status(400).send("Invalid guide name field !!");
                                    return;
                                }
                            }
                            if (prop == "email") {
                                let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                if (!regex.test(req.body.guide.email)) {
                                    res.status(400).send("Invalid guide email field");
                                    return
                                }
                            }
                            if (prop == "cellular") {

                                let regex = /^[0-9]$/;
                                if (!regex.test(req.body.guide.cellular) && req.body.guide.cellular.length < 7) {
                                    res.status(400).send("Invalid guide cellular field");
                                    return
                                }
                            }
                            // if (prop.valueOf() != "name" && prop.valueOf() != "email" && prop.valueOf() != "cellular") {
                            //     console.log(prop.valueOf());
                            //     res.status(400).send("Invalid guide field !!");
                            //     console.log("In verifs validity field ", prop);
                            // }
                        }
                    }

                    // let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    // if (!regex.test(req.body.email)) {
                    //     res.status(400).send("The email should be in the format: abc@domain.tld");
                    //     return
                    // }
                }
                console.log("Out verifs validity field");

                // if (req.body.id == undefined || req.body.id == null) {
                //     res.status(400).send("id is a required field");
                //     return;
                // }
                // else if ((req.body.id).length < 3) {

                //     res.status(400).send("The name must contain at least 3 letters");
                //     return;
                // }

                // if (req.body.start_date == undefined || req.body.start_date == null) {
                //     res.status(400).send("id is a required field");
                //     return;
                // }
                // else if (!checkDate(req.body.start_date)) {

                //     res.status(400).send("date is a required field ");
                //     return;
                // }
                // if (saveKey.length < 7) {
                //     res.status(400).send("Fields are missing1");
                //     return;

                // }
                // else if (saveKey.length > 7) {

                //     res.status(400).send("Invalid field!");
                //     return;

                // }
                // else {
                //     for (i = 0; i < saveKey.length; i++) {

                //         if (saveKey[i] !== "id" && saveKey[i] !== "start_date" && saveKey[i] !== "duration" && saveKey[i] !== "price"
                //             && saveKey[i] !== "name" && saveKey[i] !== "email" && saveKey[i] !== "cellular") {
                //             res.status(400).send("Invalid field!!");
                //             return;
                //         }
                //     }
                // }

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
                // let flag = false;
                // let saveKey = [];
                let saveKeyGuide = [];
                let i = 0;
                // for (var propName in req.body) {
                //     saveKey[i] = propName;
                //     i++;
                // }


                for (var prop in req.body.guide) {
                    saveKeyGuide[i] = prop;
                    i++;
                }
                let userId = req.params["id"];
                // let i = 0;
                // saveKey[i] === "name" || saveKey[i] === "country"
                // for (let i = 0; i < saveKey.length; i++) {
                if (req.body.country != undefined) {


                    let identical = false;
                    data[userId].path.forEach(e => {
                        if (e.name == req.body.name && e.country == req.body.country) {
                            identical = true;

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

                }
                if (req.body.guide) {
                    let userId = req.params["id"];
                    if (!data[userId]) {
                        return res.status(400).send("id doesn't exist!");

                    }
                    else {

                        for (let i = 4; i < saveKeyGuide.length; i++) {
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


            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`users id:${userId} removed`);
            });
        },
            true);
    }
};