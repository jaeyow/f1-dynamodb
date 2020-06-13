require('dotenv').config();
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
const { resultFromItem } = require('../entities');

const getRaceResults = async ({result}) => {
    try {
        const resp = await dynamodb.query({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: '#pk = :pk AND begins_with(#sk, :sk)',
            ExpressionAttributeNames: {
                '#pk': 'PK',
                '#sk': 'SK'
            },
            ExpressionAttributeValues: {
                ':pk': result.key()['PK'],
                ':sk': {'S': `RACE#${result.round}#RESULT#`} 
            },
            ScanIndexForward: true
        }).promise();

        if (!resp.Items.length) {
            return {
                error: `F1 Season race results for round ${result.round} does not exist.`
            };
        }
        const results = resp.Items.map((item) => resultFromItem(item));
        console.log(results);
        return {
            results
        };
    } catch(error) {
        console.log(`Error retrieving ${result.season} F1 Season race results for round ${result.round}.`);
        console.log(error);
        return {
            error: `Error retrieving ${result.season} F1 Season race results for round ${result.round}.`
        };
    }
}

module.exports = {
    getRaceResults
}