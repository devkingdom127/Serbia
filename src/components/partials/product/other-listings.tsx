import React from "react";
import { connect } from 'react-redux';

import { assetURL } from "../../../../server";
import { actions as CartAction } from "../../../../store/cart";
import ALink from "../../common/ALink";

function OtherListings( props ) {
    const { otherProducts } = props;

    function closeSidebar () {
        document.querySelector( 'body' ).classList.contains( 'sidebar-opened' ) && document.querySelector( 'body' ).classList.remove( 'sidebar-opened' );
    }

    function onAddCartClick(e, product) {
        e.preventDefault();

        props.addToCart(product);
    }

    return (
        <>
            <div className="sidebar-overlay" onClick={ closeSidebar }></div>
            <nav className="sidebar-shop product mobile-sidebar mt-1.5 mr-1.5 p-3 lg:col-span-4 xl:col-span-3 mb-1.5" style={{ background: '#141414' }}>
                <h2 className="pl-4 pt-2 pb-2">Other Listings</h2>
                <a href="#;" className="btn-close absolute right-5 top-3" onClick={ closeSidebar }>x</a>
                <table className="table table-other-listings mb-0">
                    <thead>
                        <tr>
                            <th className="thumbnail-col"></th>
                            <th className="item-col">Item</th>
                            <th className="certification-col">Certifi...</th>
                            <th className="seller-col">Seller</th>
                            <th className="price-col text-center pr-0 m-auto">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            otherProducts.length > 0 && otherProducts.map( (product, index) => (
                                <tr key={ index }>
                                    <td>
                                        <ALink href={`/product/${product.id}`}>
                                            <img
                                                src={assetURL+ '/product/' + product.image}
                                                width="55"
                                                height="55"
                                                alt="product"
                                            />
                                        </ALink>
                                    </td>
                                   <td>
                                        <h4 className="product-title overflow-hidden whitespace-nowrap overflow-ellipsis">{ product.title }</h4>
                                        <h4 className="product-title overflow-hidden whitespace-nowrap overflow-ellipsis text-gray">{ product.color.name }</h4>
                                    </td>
                                    <td>
                                        <h4 className="product-title overflow-hidden whitespace-nowrap overflow-ellipsis">{ product.certification ? product.certification.name : 'none' }</h4>
                                    </td>
                                     <td>
                                        <img className="rounded-full" src={assetURL + '/user/profile/' + product.user.image} width="45" height="45" alt="user"/>
                                    </td>
                                    <td className="pr-0">
                                        <h4 className="m-auto text-center product-title overflow-hidden whitespace-nowrap overflow-ellipsis">${ product.amount }</h4>
                                        <a href="#;" className="btn px-2 overflow-hidden whitespace-nowrap overflow-ellipsis focus:outline-none bg-gradient-to-l hover:from-brown1 hover:to-brown2 rounded-lg flex items-center justify-center h-6  text-center w-full md:w-auto bg-brown1 hover:bg-brown2" onClick={ e=> { onAddCartClick(e, product) } }><i className="sicon-basket"></i><span>ADD TO CART</span></a>
                                    </td> 
                                </tr>
                            ) )
                        }
                    </tbody>
                </table>
            </nav>
        </>
    );
}

export default connect(null, {  ...CartAction })(React.memo(OtherListings));