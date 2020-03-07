import React from 'react';
import { connect } from 'react-redux';
import { addResponse, updateLocation } from '../redux/actions';
import update from 'immutability-helper';
import './map.css';
import axios from 'axios';

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coordX: [],
            coordY: [],
            shiftX: 0,
            shiftY: 0,
            table: [],
            mapBool: [
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false]
            ]
        };
    }

    componentDidMount = async () => {
        await this.createMap(this.props.coord);
        await this.drawMap();
    };

    componentDidUpdate(prevProps) {
        if (prevProps.coords != this.props.coords) {
            this.drawMap();
        }
    }

    getMap = () => {
        return axios
            .get(`https://cspt5-f-mud-backend.herokuapp.com/api/adv/map/`)
            .then(res => {
                // console.log('GET map response', res);
                this.setState({
                    coordX: res.data.x_coords,
                    coordY: res.data.y_coords
                });
                this.createMap();
                return res.data;
            })
            .catch(err => {
                // console.log('GET map error', err);
                return err.message;
            });
    };

    createMap = async () => {
        let maxX = 4;
        let maxY = 4;
        for (let i = 0; i <= maxX; i++) {
            for (let j = 0; j <= maxY; j++) {
                let mapBool = await update(this.state.mapBool, {
                    [i]: {
                        [j]: { $set: await this.getCoord(this.props.baseUrl, [i + this.state.shiftX, j + this.state.shiftY]) }
                    }
                });
                await this.setState({ mapBool: mapBool });
            }
        }
    };

    getCoord = (coord) => {
        return axios
            .post(
                `https://cspt5-f-mud-backend.herokuapp.com/api/adv/coord`,
                { coord: coord },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem('mud_token')}`
                    }
                }
            )
            .then(res => {
                // console.log('POST coord response', res);
                return res.data.coord_exist;
            })
            .catch(err => {
                // console.log('POST coord error', err);
                return err.message;
            });
    };

    drawMap = () => {
        let table = [];
        let maxX = 4;
        let maxY = 4;
        for (let i = maxY; i > -1; i--) {
            let children = [];
            for (let j = 0; j < maxX + 1; j++) {
                /* display player as 'P' */
                if (i === this.props.coords[1] && j === this.props.coords[0]) {
                    children.push(<td>P</td>);
                    /* display 'O' if coord is in map */
                    /* display 'X' if coord is not in map */
                } else {
                    /* todo: write more efficient method to see if coords
                    are in the map */
                    if (this.state.mapBool[j][i]) {
                        children.push(<td>O</td>);
                    } else {
                        children.push(<td>X</td>);
                    }
                }
            }
            table.push(<tr>{children}</tr>);
        }
        this.setState({ table: table });
    };

    render() {
        return (
            <div id='map'>
                <table className='map'>
                    <tbody>{this.state.table}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    coords: state.movement.coords
});

export default connect(mapStateToProps, { addResponse, updateLocation })(Map);
