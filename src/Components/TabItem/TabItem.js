import React, { Component } from 'react';
import './TabItem.css';

class TabItem extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price
    }
    
  }
  
  componentDidMount() {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${ this.props.name.toLowerCase() }`);
    let name = this.props.name.toLowerCase();
     
    pricesWs.onmessage = (msg) => {
      let price = +JSON.parse(msg.data)[name];
      
      this.setState({
        price: price.toFixed(6)
      });
    }
  }
  
  render() {
    const {
      rank,
      name,
      capt,
      volume,
    } = this.props;
  
    return (
      <tr className='table-body_row'>
        <td className='table-body_item table_num'> { rank } </td>
        <td className='table-body_item table_name'> { name } </td>
        <td className='table-body_item table_price'> ${ this.state.price } </td>
        <td className='table-body_item table_capt'> { capt } </td>
        <td className='table-body_item table_vol'> { volume } </td>
      </tr>
    );
  }
        

}

export default TabItem;
