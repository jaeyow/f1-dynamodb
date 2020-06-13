class Result {
    constructor({
        season,
        round,
        finishPosition, 
        finishStatus, 
        finishPoints, 
        finishTime, 
        driverId, 
        driverName,
        driverNumber,
        constructorId, 
        constructorName, 
        totalLaps
    }) {
        this.season = season;
        this.round = round;
        this.finishPosition = finishPosition;
        this.finishStatus = finishStatus;
        this.finishPoints = finishPoints;
        this.finishTime = finishTime;
        this.driverId = driverId;
        this.driverName = driverName;
        this.driverNumber = driverNumber;
        this.constructorId = constructorId;
        this.constructorName = constructorName;
        this.totalLaps = totalLaps;
    }

    key() {
        return {
            'PK': {
                'S': `SEASON#${this.season}`
            },
            'SK': {
                'S': `RACE#${this.round}#RESULT#${this.finishPosition}`
            }
        }
    }

    toItem() {
        return {
            ...this.key(),
            'Type': {
                'S': 'ResultItem'
            },
            'FinishPosition': {
                'N': this.finishPosition
            },
            'FinishStatus': {
                'S': this.finishStatus
            },
            'FinishPoints': {
                'N': this.finishPoints
            },
            'FinishTime': {
                'S': this.finishTime
            },
            'DriverId': {
                'S': this.driverId
            },
            'DriverName': {
                'S': this.driverName
            },
            'DriverNumber': {
                'N': this.driverNumber
            },
            'ConstructorId': {
                'S': this.constructorId
            },
            'ConstructorName': {
                'S': this.constructorName
            },
            'TotalLaps': {
                'N': this.totalLaps
            },
            'SeasonId': {
                'S': this.season
            },
            'Round': {
                'N': this.round
            }
        }
    }
}

const resultFromItem = (attributes) => {
    return new Result({
        season: attributes.SeasonId.S,
        round: attributes.Round.N,
        finishPosition: attributes.FinishPosition.N,
        finishStatus: attributes.FinishStatus.S,
        finishPoints: attributes.FinishPoints.N,
        finishTime: attributes.FinishTime.S,
        driverId: attributes.DriverId.S,
        driverName: attributes.DriverName.S,
        driverNumber: attributes.DriverNumber.N,
        constructorId: attributes.ConstructorId.S,
        constructorName: attributes.ConstructorName.S,
        totalLaps: attributes.TotalLaps.N
    })
}

module.exports = {
    Result,
    resultFromItem
}