import React from 'react';
import { connect } from 'react-redux';
import { addResponse, updateLocation } from '../redux/actions';
import './map.css';
import axios from 'axios';

export const getMap = baseUrl => {
    return axios
        .get(`${baseUrl}/api/map/`)
        .then(res => {
            console.log('GET map response', res);
            return {};
        })
        .catch(err => {
            console.log('GET map error', err);
            return {};
        });
};

const fakeMap = [
    {
        coord: [0, 1],
        title: 'Foyer',
        description: 'Dim light filters in from the south. Dusty\npassages run north and east.',
        players: ['Self']
    },
    {
        coord: [0, 0],
        title: 'Outside',
        description: 'North of you, the cave mount beckons',
        players: ['Self', 'ReadyPlayerOne', 'Sexy Lady']
    },
    {
        coord: [0, 2],
        title: 'Grand Overlook',
        description: 'A steep cliff appears before you, falling into the darkness. Ahead to the north, a light flickers in the distance, but there is no way across the chasm.',
        players: ['Self', 'A Panda']
    },
    {
        coord: [1, 1],
        title: 'Narrow Passage',
        description: 'The narrow passage bends here from west to north. The smell of gold permeates the air',
        players: ['Self', 'Great Spider']
    },
    {
        coord: [1, 2],
        title: 'Treasure Room',
        description: "ou've found the long-lost treasure chamber! Sadly, it has already been completely emptied by earlier adventurers. The only exit is to the south.",
        players: ['Self', 'The Queen']
    }
];

const Map = props => {
    const createMap = (mapJSON, playerCoords = [0, 0]) => {
        let table = [];
        let coordX = [];
        let coordY = [];
        fakeMap.forEach(room => {
            coordX.push(room.coord[0]);
            coordY.push(room.coord[1]);
        });
        let maxX = Math.max(...coordX);
        let maxY = Math.max(...coordY);
        console.log(coordX, maxX);
        console.log(coordY, maxY);
        for (let i = maxY; i > -1; i--) {
            let children = [];
            for (let j = 0; j < maxX + 1; j++) {
                /* display player as 'P' */
                if (i === playerCoords[0] && j === playerCoords[1]) {
                    children.push(<td>P</td>);
                    /* display ' ' if coord is in map */
                    /* display 'x' if coord is not in map */
                } else {
                    /* todo: write more efficient method to see if coords
                    are in the map */
                    let flag = 0;
                    for (let idx = 0; idx < mapJSON.length; idx++) {
                        if (j === mapJSON[idx]['coord'][0] && i === mapJSON[idx]['coord'][1]) {
                            children.push(<td>O</td>);
                            flag = 1;
                        }
                    }
                    if (flag === 0) {
                        children.push(<td>X</td>);
                    }
                }
            }
            table.push(<tr>{children}</tr>);
        }
        return table;
    };

    return (
        <div id='map'>
            <table className='map'>{createMap(fakeMap, [props.coords[1], props.coords[0]])}</table>
        </div>
    );
};

const mapStateToProps = state => ({
    coords: state.movement.coords
});

export default connect(mapStateToProps, { addResponse, updateLocation })(Map);
