"use strict";

const mysql = require('mysql');
const zodiacCombination = require('./getZodiacCombination');
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

exports.handler = function (event, context, callback) {

    const dob_1 = event.params.querystring.dob;
    const sex_at_birth_1 = event.params.querystring.sex_at_birth;
    const dob_2 = event.params.querystring.friend_dob;
    const sex_at_birth_2 = event.params.querystring.friend_sex_at_birth;

    const user_1 = new zodiacCombination(`${dob_1}`, sex_at_birth_1);
    const user_2 = new zodiacCombination(`${dob_2}`, sex_at_birth_2);
    const user_info = user_1.getInfo();
    const user_info_2 = user_2.getInfo();

    const {westernId, elementId, animalId, sex, trio} = user_info;

    const db = mysql.createConnection({
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        user: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME
    });

    db.connect((error) => {
        if (error) throw error;
        console.log("Connected");
    });

    const friendshipType = sex_at_birth_1 === sex_at_birth_2 ? 1 : 0;
    const friend_1_sql = `SELECT summary FROM character_profiles WHERE westernId=${westernId} AND elementId=${elementId} AND animalId=${animalId} AND sex=${sex_at_birth_1}`;
    const friend_2_sql = `SELECT summary FROM character_profiles WHERE westernId=${user_info_2.westernId} AND elementId=${user_info_2.elementId} AND animalId=${user_info_2.animalId} AND sex=${sex_at_birth_2}`;
    const sql = `SELECT summary, endPercentage FROM compatibility_summarys WHERE endPercentage = CEILING((SELECT score FROM
        compatibility_scores
      WHERE
        westernId_1 = ${westernId}
        AND elementId_1 = ${elementId}
        AND animalId_1 = ${animalId}
        AND westernId_2 = ${user_info_2.westernId}
        AND elementId_2 = ${user_info_2.elementId}
        AND animalId_2 = ${user_info_2.animalId}
        AND type = ${friendshipType}))`;

    let result_object = {
        combination_1: trio,
        combination_2: user_info_2.trio
    };

    db.query(friend_1_sql, function (err, friend_summary_1) {
        if (err) throw err;
        db.query(friend_2_sql, function(err, friend_summary_2) {
            if (err) throw err;
            result_object["character_profile_1"] = friend_summary_1[0].summary;
            result_object["character_profile_2"] = friend_summary_2[0].summary;
            db.query(sql, function (err, compatibility_object) {
                result_object["summary"] = compatibility_object[0].summary;
                result_object["compatibility_score"] = compatibility_object[0].endPercentage;
                const response = {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: result_object
                };
                callback(err, response);
                db.connection.end(function (err) { callback(err, result_object);});
            });
        })
    });
};