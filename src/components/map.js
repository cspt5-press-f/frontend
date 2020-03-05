import React from 'react';
import { connect } from 'react-redux';
import { addResponse, updateLocation } from '../redux/actions';
import './map.css';
import axios from 'axios';

class Map extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            coordX: [],
            coordY: [],
            table: [],
            playerCoords: [0, 0],
        }
    }

    componentDidMount() {
        this.getMap(this.props.baseUrl)
    }

    getMap = (baseUrl) => {
        return axios
            .get(`${baseUrl}/api/adv/map/`)
            .then(res => {
                console.log('GET map response', res);
                this.setState({
                    coordX: res.data.x_coords,
                    coordY: res.data.y_coords
                })
                this.createMap()
                return res.data
            })
            .catch(err => {
                console.log('GET map error', err);
                return err.message;
            });
    };

    createMap = (playerCoords = [0, 0]) => {
        let table = [];
        let maxX = Math.max(...this.state.coordX);
        let maxY = Math.max(...this.state.coordY);
        for (let i = maxY; i > -1; i--) {
            let children = [];
            for (let j = 0; j < maxX + 1; j++) {
                /* display player as 'P' */
                if (i === playerCoords[0] && j === playerCoords[1]) {
                    children.push(<td>P</td>);
                    /* display 'O' if coord is in map */
                    /* display 'X' if coord is not in map */
                } else {
                    /* todo: write more efficient method to see if coords
                    are in the map */
                    let flag = 0;
                    for (let idx = 0; idx < this.state.coordX.length; idx++) {
                        if (j === this.state.coordX[idx] && i === this.state.coordY[idx]) {
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
        this.setState({table: table})
    };

    render() {
        return (
            <div id='map'>
                <button onClick={() => this.getMap(this.props.baseUrl)}>Generate Map!</button>
                <button onClick={() => console.log(this.state.x_coords, this.state.y_coords)}>Map Data</button>
                <table className='map'>{this.state.table}</table>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    coords: state.movement.coords
});

export default connect(mapStateToProps, { addResponse, updateLocation })(Map);
