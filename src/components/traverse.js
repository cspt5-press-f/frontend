//  Assumes <x, y> vector

fakeMap = [
        {
            "coord": [0,1],
            "title": "Foyer", 
            "description": "Dim light filters in from the south. Dusty\npassages run north and east.",
            "players": ["Self"], 
        },
        {
            "coord": [0,0],
            "title": "Outside", 
            "description": "North of you, the cave mount beckons",
            "players": ["Self", "ReadyPlayerOne", "Sexy Lady"], 
        },
        {
            "coord": [0,2],
            "title": "Grand Overlook", 
            "description": "A steep cliff appears before you, falling into the darkness. Ahead to the north, a light flickers in the distance, but there is no way across the chasm.",
            "players": ["Self", "A Panda"], 
        },
        {
            "coord": [1,1],
            "title": "Narrow Passage", 
            "description": "The narrow passage bends here from west to north. The smell of gold permeates the air",
            "players": ["Self", "Great Spider"], 
        },
        {
            "coord": [1,2],
            "title": "Treasure Room", 
            "description": "ou've found the long-lost treasure chamber! Sadly, it has already been completely emptied by earlier adventurers. The only exit is to the south.",
            "players": ["Self", "The Queen"], 
        },
    ];


function traverse(direction, currentPosition=[0,0]) {
    dirVectors = {
        "n": [0, 1],
        "e": [1, 0],
        "s": [0, -1],
        "w": [-1, 0]
    };

    // Check for valid currentPosition
    for (i = 0; i < fakeMap.length; i++) {
        if (JSON.stringify(fakeMap[i]['coord']) == JSON.stringify(currentPosition)){
            currentRoom = fakeMap[i]
        }
      }
    if (typeof currentRoom == undefined) {
        console.log("Invalid starting position.")
        currentRoom = fakeMap[1]
        currentRoom['error'] = "You Cannot Move That Way!!!"
        return currentRoom;
    }
    
    // Calculate move and find new room
    movVector = dirVectors[direction];
    newPos = [(currentPosition[0] + movVector[0]), (currentPosition[1] + movVector[1])];

    for (i = 0; i < fakeMap.length; i++) {
        if (JSON.stringify(fakeMap[i]['coord']) == JSON.stringify(newPos)){
            return fakeMap[i];
        }
      }

    currentRoom['error'] = "You Cannot Move That Way!!!"
    return currentRoom;
    
}

// console.log(traverse("e", [0,1]));

export default traverse
