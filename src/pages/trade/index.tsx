import { useState, useEffect } from 'react';

import ProductBox from '../../components/partials/trade/product-box';
import OwnBox from '../../components/partials/trade/own-box';
import StateBox from '../../components/partials/trade/state-box';


const { products } = require('@rocketleagueapi/items');
import server, {  baseUrl } from "../../../server";

function Trade () {
    const [ ownItems, setItems ] = useState([]);
    useEffect(() => {
        server.get(`${baseUrl}/shop`)
          .then((response) => {
            const temp: any = response.data;

            if( typeof temp.products === typeof {} ) {
                setItems(Object.values(temp.products));
            } else {
                setItems(temp.products);
            }
        }).catch((error) => ({ error: JSON.stringify(error) }));
    }, [])
    return (
        <main className="shop" style={ { background: '#202020' } }>
            <div className="grid grid-cols-12 grid-rows-1 grid-flow-col gap-0 pr-7 pl-7 pt-3">
                <div className="col-span-12 lg:col-span-5 mt-1.5 mr-1 lg:ml-0 ml-1 mb-10 pb-3">
                    <ProductBox items={products} />
                </div>
                
                <div className="col-span-12 lg:col-span-2 mt-1.5 mr-4 ml-4 lg:ml-0 mb-10 pb-3">
                    <StateBox />
                </div>
                <div className="col-span-12 lg:col-span-5 mt-1.5 mr-1 lg:ml-0 ml-1 mb-10 pb-3">
                    <OwnBox items={ownItems} />
                </div>
            </div>
        </main>
    )
}

export default Trade;