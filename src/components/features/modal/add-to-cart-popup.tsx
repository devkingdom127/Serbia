import React from 'react';
import { assetURL } from '../../../../server';

function CartPopup(props) {
    const { product } = props;

    return (
        <div className="minipopup-area">
            <div className="minipopup-box flex" style={{ top: "0" }}>
                <div className="product media-with-lazy flex items-center">
                    <figure className="product-media w-1/3 mr-3">
                        <img
                            src={assetURL + '/product/' + product.image}
                            width="105"
                            height="105"
                            alt="product"
                        />
                    </figure>
                    <div className="product-detail">
                        <a className="product-name font-black text-white" href="#">{product.title}</a>

                        <p>has been added to your cart.</p>
                    </div>
                </div>
                <button className="mfp-close"></button>
            </div>
        </div>
    )
}

export default CartPopup;