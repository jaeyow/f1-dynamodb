class F1Season {
    constructor({
        id,
        url
    }) {
        this.id = id
        this.url = url
    }

    key() {
        return {
            'PK': {
                'S': 'F1#SEASONS'
            },
            'SK': {
                'S': `SEASON#${this.id}`
            }
        }
    }

    toItem() {
        return {
            ...this.key(),
            'Type': {
                'S': 'SeasonItem'
            },
            'SeasonId': {
                'S': this.id
            },
            'SeasonUrl': {
                'S': this.url
            }
        }
    }
}

const seasonFromItem = (attributes) => {
    return new F1Season({
        id: attributes.SeasonId.S,
        url: attributes.SeasonUrl.S
    })
}

module.exports = {
    F1Season,
    seasonFromItem
}