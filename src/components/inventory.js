import React from "react";
import axios from "axios";
import connect from "react-redux";

class Inventory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='inventory'>
                <h2>Player Inventory</h2>
                <ul>
                    {this.props.items.map(item => {
                        return (
                            <li>{Object.values(item)[1]}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    
}

const mapStateToProps = state => ({
    items: state.movement.items,
})

export default connect(mapStateToProps, {})(inventory);