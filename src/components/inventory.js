import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getInventory, addResponse } from "../redux/actions";

class Inventory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemId: ""
    };

    this.postGrab.bind(this);
    this.handlerTextChange.bind(this);
    this.handlerGrab.bind(this);
    this.handlerDrop.bind(this);
  }

  handlerTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlerGrab = async () => {
    const grabReturn = await this.postGrab();
    console.log("grabReturn", grabReturn);
    this.props.getInventory(grabReturn.data.player_items);
    this.props.addResponse(grabReturn.data.message || grabReturn.data.error);
  };

  handlerDrop = async (itemId) => {
    const dropReturn = await this.postDrop(itemId);
    console.log("dropReturn", dropReturn, "itemId", itemId);
    this.props.getInventory(dropReturn.data.player_items);
    this.props.addResponse(dropReturn.data.message || dropReturn.data.message);
  };

  postGrab = () => {
    console.log(`itemid: ${this.state.itemId}`);
    return axios
      .post(
        "https://cspt5-f-mud-backend.herokuapp.com/api/adv/grab/",
        {
          item: this.state.itemId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("mud_token")}`
          }
        }
      )
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        return err.message;
      });
  };

  postDrop = itemId => {
    return axios
      .post(
        "https://cspt5-f-mud-backend.herokuapp.com/api/adv/drop/",
        {
          item: itemId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("mud_token")}`
          }
        }
      )
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        return err.message;
      });
  };

  render() {
    return (
      <div className="inventory">
        <h2>Player Inventory</h2>
        <input
          name="itemId"
          onChange={this.handlerTextChange}
          placeholder="Enter Item ID:"
          value={this.state.itemId}
        />
        <button onClick={() => this.handlerGrab(this.state.itemId)}>
          Pick Up
        </button>

        <ul>
          {Object.keys(this.props.items).map(item => {
              //console.log("Item to map through", this.props.items[item]);
            return (
              <li>
                {Object.values(this.props.items[item])}
                <button onClick={() => this.handlerDrop(item)}>
                  Drop Item
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("inventory mapstatetoprops", state);
  const items = state.getInventory.items;
  return { items };
};

export default connect(mapStateToProps, { getInventory, addResponse })(Inventory);
