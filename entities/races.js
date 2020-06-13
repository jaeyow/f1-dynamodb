class Race {
    constructor({
        season,
        round,
        raceName, 
        raceDate, 
        circuitName
    }) {
        this.season = season;
        this.round = round;
        this.raceName = raceName;
        this.raceDate = raceDate;
        this.circuitName = circuitName;
    }

    key() {
        return {
            'PK': {
                'S': `SEASON#${this.season}`
            },
            'SK': {
                'S': `RACE#${this.round}`
            }
        }
    }

    toItem() {
        return {
            ...this.key(),
            'Type': {
                'S': 'RaceItem'
            },
            'CircuitName': {
                'S': this.circuitName
            },
            'RaceName': {
                'S': this.raceName
            },
            'RaceDate': {
                'S': this.raceDate
            },
            'Round': {
                'N': this.round
            },
            'Season': {
                'S': this.season
            }
        }
    }
}

const raceFromItem = (attributes) => {
    return new Race({
        season: attributes.SeasonId.S,
        circuitName: attributes.CircuitName.S,
        raceName: attributes.RaceName.S,
        raceDate: attributes.RaceDate.S,
        round: attributes.Round.N
    })
}

module.exports = {
    Race,
    raceFromItem
}