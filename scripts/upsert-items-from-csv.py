import codecs
import csv
import boto3

session = boto3.Session(profile_name='jaeyow-dynamodb')
client = session.client('dynamodb')

def write_item(row):
    pk = "SEASON#{season}".format(
        season=row['SeasonId']
    )
    sk = "RACE#{round}".format(
        round=row['Round']
    )
    client.put_item(
        TableName="F1Table",
        Item={
            "PK": {"S": pk or 'NULL' },
            "SK": {"S": sk or 'NULL' },
            "Type": {"S": 'RaceItem' },
            "CircuitName": {"S": row.get('CircuitName') or 'NULL' },
            "RaceName": {"S": row.get('RaceName') or 'NULL' },
            "RaceDate": {"S": row.get('RaceDate') or 'NULL' },
            "Round": {"N": row.get('Round') },
            "SeasonId": {"S": row.get('SeasonId') or 'NULL' },
        },
    )

if __name__ == "__main__":
    count = 0
    with codecs.open('f1-season-races.csv', 'r', encoding='utf8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            write_item(row)
            count += 1
            # if count % 1000 == 0:
            print("Writing {} to DynamoDB...".format(row.get('RaceName')))