require('dotenv').config();
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const { seasonFromItem } = require('../entities');

const getF1Seasons = async () => {
    try {
        const resp = await dynamodb.query({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: '#pk = :pk',
            ExpressionAttributeNames: {
                '#pk': 'PK'
            },
            ExpressionAttributeValues: {
                ':pk': {'S': 'F1#SEASONS'}
            },
            ScanIndexForward: false
        }).promise();

        if (!resp.Items.length) {
            return {
                error: 'F1 Season list is empty.'
            };
        }
        const seasons = resp.Items.map((item) => seasonFromItem(item));
        console.log(seasons);
        return {
            seasons
        };
    } catch(error) {
        console.log('Error retrieving F1 Seasons')
        console.log(error)
        return {
            error: 'Could not retrieve F1 Seasons'
        }
    }
}

module.exports = {
    getF1Seasons
}