const bodyParser = require('body-parser');
const { json } = require('body-parser');
const fs = require('fs');
let Guide = require('../models/Guide');
const Tour = require('../models/Tour');
const mongoose = require('../db/mongoose');
const { Mongoose } = require('mongoose');
const { cpuUsage } = require('process');
// const { use } = require('./routes');
// variables

const dataPath = './data/tours.json';

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

module.exports = {
    //READ
    read_users: function (req, res) {

        // Find all tours
        Tour.find().sort('id').then(Tours => res.send(Tours)
        ).catch(e => res.status(500).send())

    },

    // CREATE
    createTour: async function (req, res) {

        const tour = new Tour(req.body);
        //         }
        let isExist = false;
        //Verify if the tour already exist.
        let all_the_tours = await Tour.find({ 'id': { $eq: req.body.id } }).then((result) => {

            if (result.length != 0) {
                res.status(400).send("Tour already exists!!");
                isExist = true;
                return;
            }
        });

        for (var propName in req.body) {

            if (propName == "start_date") {
                var date_regex = /^(([0-9][0-9][0-9][0-9])\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01]))$/;
                if (!date_regex.test(req.body.start_date)) {
                    res.status(400).send("Invalid start_date field !!");
                    return;
                }
            }

            if (propName == "duration") {
                if (req.body.duration < 0) {
                    res.status(400).send("The duration must be positive!!");
                    return;
                }
                var duration_regex = /^[0-9]*$/;
                if (!duration_regex.test(req.body.duration)) {
                    res.status(400).send("Invalid duration field !!");
                    return;
                }
            }

            if (propName == "price") {
                if (req.body.price < 0) {
                    res.status(400).send("The price must be positive!!");
                    return;
                }
                var price_regex = /^[0-9]*$/;
                if (!price_regex.test(req.body.price)) {
                    res.status(400).send("Invalid price field !!");
                    return;
                }
            }

            if (propName == "guide") {
                for (var prop in req.body.guide) {

                    if (prop == "name") {
                        var name_regex = /^([A-Za-z]|[\u0590-\u05fe])*$/;
                        if (!name_regex.test(req.body.guide.name)) {
                            res.status(400).send("Invalid guide name field !!");
                            return;
                        }
                    }
                    if (prop == "email") {
                        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                        if (!regex.test(req.body.guide.email)) {
                            res.status(400).send("Invalid guide email field");
                            return;
                        }
                    }
                    if (prop == "cellular") {

                        let regex = /^[0-9]*$/;
                        if (!regex.test(req.body.guide.cellular) || req.body.guide.cellular.length < 7) {
                            res.status(400).send("Invalid guide cellular field");
                            return;
                        }
                    }
                }
            }
        }
        if (isExist == false) {
            tour.save().then(tour =>
                res.status(201).send(tour)
            ).catch(e => res.status(400).send(e));
        }

    },

    // UPDATE
    update_user: async function (req, res) {

        // readFile(data => {
        if (!req.params["id"]) {

            res.status(404).json({ errors });
            // stop further execution in this callback
            return;
        }
        else {

            let userId = req.params["id"];

            if (req.body.country != undefined) {

                for (var prop in req.body) {

                    if (prop == "name") {
                        var name_regex = /^([A-Za-z]|[\u0590-\u05fe])*$/;
                        if (!name_regex.test(req.body.name)) {
                            res.status(400).send("Invalid Location Name field !!");
                            return;
                        }
                    }
                    if (prop == "country") {
                        var country_regex = /^([A-Za-z]|[\u0590-\u05fe])*$/;
                        if (!country_regex.test(req.body.country)) {
                            res.status(400).send("Invalid Country Name field !!");
                            return;
                        }
                    }
                }

                let identical = false;
                await Tour.find({
                    "$and": [
                        { "id": userId },
                        { "path.name": req.body.name },
                        { "path.country": req.body.country }
                    ]
                }
                ).then(
                    (result) => {
                        if (result.length != 0) {
                            identical = true;
                        }
                    }
                ).catch(e => res.status(500).send());
                // data[userId].path.forEach(e => {
                //     if (e.name == req.body.name && e.country == req.body.country) {
                //         identical = true;
                //         return;
                //     }
                // });
                if (identical) {
                    res.status(400).send("The location already exists");
                    return;
                }
                else {
                    let new_location = { name: req.body.name, country: req.body.country };
                    // data[userId].path.push(JSON.parse(new_location));
                    await Tour.updateOne(
                        {
                            "id": userId,
                        },
                        {
                            "$addToSet": {
                                "path": new_location
                            },
                        }
                    ).then(
                        res.status(201).send('The location has been added')
                    ).catch(e => res.status(500).send());
                }

            }
            else {

                for (var propName in req.body) {

                    if (propName == "start_date") {
                        var date_regex = /^^$|(([0-9][0-9][0-9][0-9])\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01]))$/;
                        if (!date_regex.test(req.body.start_date)) {
                            res.status(400).send("Invalid start_date field !!");
                            return;
                        }
                    }

                    if (propName == "duration") {
                        if (req.body.duration < 0) {
                            res.status(400).send("The duration must be positive!!");
                            return;
                        }
                        var duration_regex = /^^$|[0-9]*$/;
                        if (!duration_regex.test(req.body.duration)) {
                            res.status(400).send("Invalid duration field !!");
                            return;
                        }
                    }

                    if (propName == "price") {
                        if (req.body.price < 0) {
                            res.status(400).send("The price must be positive!!");
                            return;
                        }
                        var price_regex = /^^$|[0-9]*$/;
                        if (!price_regex.test(req.body.price)) {
                            res.status(400).send("Invalid price field !!");
                            return;
                        }
                    }

                    if (propName == "guide") {
                        for (var prop in req.body.guide) {

                            if (prop == "name") {
                                var name_regex = /^^$|([A-Za-z]|[\u0590-\u05fe])*$/;
                                if (!name_regex.test(req.body.guide.name)) {
                                    res.status(400).send("Invalid guide name field !!");
                                    return;
                                }
                            }
                            if (prop == "email") {
                                let regex = /^^$|[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                if (!regex.test(req.body.guide.email)) {
                                    res.status(400).send("Invalid guide email field");
                                    return;
                                }
                            }
                            if (prop == "cellular") {

                                let regex = /^^$|[0-9]*$/;
                                if (req.body.guide.cellular != "" && req.body.guide.cellular.length < 7) {
                                    res.status(400).send("Invalid guide cellular field");
                                    return;
                                }
                                if (!regex.test(req.body.guide.cellular)) {

                                    res.status(400).send("Invalid guide cellular field");
                                    return;
                                }
                            }
                        }
                    }

                }

                let saveKeyGuide = [];
                let i = 0;

                for (var prop in req.body.guide) {
                    saveKeyGuide[i] = prop;
                    i++;
                }

                if (req.body.start_date) {

                    data[userId].start_date = req.body.start_date;
                }

                //-----------------------------------
                if (req.body.price) {
                    data[userId].price = req.body.price;
                }
                //-----------------------------------
                if (req.body.duration) {

                    data[userId].duration = req.body.duration;

                }
                if (req.body.guide) {

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
            // writeFile(JSON.stringify(data, null, 2), () => {
            //     return res.status(200).send(`users id: updated`);
            // });

        }
    },
    // true);
    // },
    // DELETE
    delete_user: async function (req, res) {

        if (!req.params["id"]) {

            res.status(404).json({ errors });
            // stop further execution in this callback
            return;
        }
        else {

            const userId = req.params["id"];
        
            //Delete path (You have to send "delete":true in the body)
             if(req.body.delete === true){
                Tour.updateOne(
                    {"id":userId},
                    {$set: {path: []}}
                ).then(
                    (result) => {
                        if (result) {
                            res.status(200).send("Deleted all the path")
                        }
                    }
                ).catch(e => res.status(500).send())
            }
            //Delete one location (You have to send the name and country of the location in the body)
            else if(req.body.name != undefined){
                Tour.updateOne(
                    { 'id': userId }, 
                    { $pull: { path: {"$and":[{ name: req.body.name },{country:req.body.country} ]}} },
                   
                ).then(
                    (result) => {
                        if (result) {
                            res.status(200).send("Location removed")
                        }
                    }
                ).catch(e => res.status(500).send())
            }
            else{
                Tour.findOneAndDelete({ "id": userId }).then((result) => {
                    if (result) {
                        res.status(200).send(`users id:${req.body.id} removed`);
                    }
                });
            }
        }
    }
};