require('dotenv').config();
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const { raceFromItem } = require('../entities');

const getF1SeasonRaces = async ({race}) => {
    try {
        const resp = await dynamodb.query({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: '#pk = :pk',
            ExpressionAttributeNames: {
                '#pk': 'PK'
            },
            ExpressionAttributeValues: {
                ':pk': race.key()['PK']
            },
            ScanIndexForward: false
        }).promise();

        if (!resp.Items.length) {
            return {
                error: 'F1 Season races list is empty.'
            };
        }
        const races = resp.Items.map((item) => raceFromItem(item));
        console.log(races);
        return {
            races
        };
    } catch(error) {
        console.log(`Error retrieving ${race.season} F1 Season races`)
        console.log(error)
        return {
            error: `Error retrieving ${race.season} F1 Season races`
        }
    }
}

module.exports = {
    getF1SeasonRaces
}