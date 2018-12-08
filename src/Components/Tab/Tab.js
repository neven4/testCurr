import React, { Component } from 'react';
import './Tab.css';

import TabItem from '../TabItem/TabItem';

class Tab extends Component {  
    constructor() {
        super();
        
        this.state = {
            data: []
        };
    }
    
    componentDidMount() {
        fetch('https://api.coincap.io/v2/assets')
            .then((data) => data.json())
            .then((cur) => {
                let sortedCur = cur.data.sort((a,b) => Number(b.marketCapUsd) - Number(a.marketCapUsd));
                this.setState({ data: sortedCur });
            })
            .catch((err) => console.log(err));
    }
    
    roundNum(num) {
        if (num/1e12>1) {
            
            return `$${ Math.round(( +num / 1e12 ) * 100) / 100 }tr`;
            
        } else if ( num / 1e9 > 1 ) {
            
            return `$${( +num / 1e9 ).toFixed( 2 )}b`;
            
        } else if ( num / 1e6 > 1 ) {
            
            return `$${( +num / 1e6 ).toFixed( 2 )}m`;
            
        } else if (num/1e3>1) {
            
            return `$${( +num / 1e3 ).toFixed( 2 )}k`;
            
        } 
    }
    
    render() {
        let currency = this.state.data
            .map((e, index) => {
                return <TabItem rank={ e.rank }
                    key={ index }
                    name={ e.name }
                    price={ (+e.priceUsd).toFixed(6) }
                    capt={ this.roundNum(e.marketCapUsd) }
                    volume={ this.roundNum(e.volumeUsd24Hr) }
                />
            });

        return (
          <table className="table">
              <thead className='table-head'>
                <tr>
                    <th className='table-header_item table_num'>#</th>
                    <th className='table-header_item table_name'>Название</th>
                    <th className='table-header_item table_price'>Стоимость</th>
                    <th className='table-header_item table_capt'>Рыночная капитализация</th>
                    <th className='table-header_item table_vol'>Суточный объем</th>
                </tr>
              </thead>
              <tbody className='table-body'>
                <div className='table-body_scroll'>
                    { currency }
                </div>    
              </tbody>           
          </table>
        );
    }
}

export default Tab;
