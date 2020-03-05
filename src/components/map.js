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
        }
    }

    componentDidMount() {
        this.getMap(this.props.baseUrl)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.coords != this.props.coords) {
            console.log('redrawing map!')
            this.createMap()
        }
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

    createMap = () => {
        let table = [];
        let maxX = 4;
        let maxY = 4;
        let shiftX = 0;
        let shiftY = 0;
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

    // createMap = (playerCoords = [0, 0]) => {
    //     let table = [];
    //     let maxX = Math.max(...this.state.coordX);
    //     let maxY = Math.max(...this.state.coordY);
    //     for (let i = maxY; i > -1; i--) {
    //         let children = [];
    //         for (let j = 0; j < maxX + 1; j++) {
    //             /* display player as 'P' */
    //             if (i === playerCoords[0] && j === playerCoords[1]) {
    //                 children.push(<td>P</td>);
    //                 /* display 'O' if coord is in map */
    //                 /* display 'X' if coord is not in map */
    //             } else {
    //                 /* todo: write more efficient method to see if coords
    //                 are in the map */
    //                 let flag = 0;
    //                 for (let idx = 0; idx < this.state.coordX.length; idx++) {
    //                     if (j === this.state.coordX[idx] && i === this.state.coordY[idx]) {
    //                         children.push(<td>O</td>);
    //                         flag = 1;
    //                     }
    //                 }
    //                 if (flag === 0) {
    //                     children.push(<td>X</td>);
    //                 }
    //             }
    //         }
    //         table.push(<tr>{children}</tr>);
    //     }
    //     this.setState({table: table})
    // };

    render() {
        return (
            <div id='map'>
                <table className='map'>{this.state.table}</table>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    coords: state.movement.coords
});

export default connect(mapStateToProps, { addResponse, updateLocation })(Map);
