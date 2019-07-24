class RandomizerAPI {
    async fetchRandomizer(id) {
        return { 
            name: "Fantasy Creatures",
            description: "Generate random creatures for your fantasy game with abilities and attributes according to their type",
            schema: `{
            "fields": {
                "Creature Name": [
                    "@g{0} Dragon",
                    "@g{0} Troll"
                ],
                "Attack": {
                    "min": 5,
                    "max": 11
                },
                "Health": {
                    "min": 100,
                    "max": 500
                },
                "Description": {
                    "options": [
                        [
                            "Increased @{0}% move speed while hidden. ",
                            "Deal bonus @{1} @g{0} damage while attacking. "
                        ],
                        [
                            "While moving has increased resistance.",
                            "Immune to @g{0} damage."
                        ]
                    ],
                    "properties": [
                        {
                            "min": 5,
                            "max": 11
                        },
                        {
                            "min": 100,
                            "max": 251
                        }
                    ]
                }
            },
            "globalProperties": [
                [
                    "Fire",
                    "Frost",
                    "Earth"
                ]
            ]
        }`};
    }
}

export default new RandomizerAPI();