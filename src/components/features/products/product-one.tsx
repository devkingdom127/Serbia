import React, { useState } from "react";
import Image from "next/image";
import { connect } from 'react-redux';

// Import Custom Component
import ALink from "../../common/ALink";
import Qty from "../qty";
import { assetURL } from "../../../../server";
import { actions as CartAction } from "../../../../store/cart";

const ProductOne = (props) => {
    const { item } = props;
    const [isHover, setIsHover] = useState(false);
    const [qty, setQty] = useState(100);

    function changeQty ( value ) {
        setQty( value );
    }

    function onAddCartClick(e) {
        e.preventDefault();

        if( item.category !== "Credits"  ) {
            props.addToCart(item);
        } else {
            props.addToCart({ ...item, amount: item.amount / qty }, qty);
        }   
    }

  return (
    <div
        className={`mx-1 relative duration-700 mb-1.5 card ${
            isHover ? "mt-5" : ""
        }`}

        onMouseLeave={() => {
            setIsHover(false);
        }}

        onMouseEnter={() => {
            setIsHover(true);
        }}
    >
        <div className={`px-2 relative z-50 cart duration-700 pt-2`} style={{ background: '#141414' }}>
            <ALink href={`/product/${item.id}`}>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <Image
                            src={`/images/${item.trade_type == "instant_delivery" ? "clock.svg" : "p2p.svg"}`}
                            width={10}
                            height={10}
                        />

                        <div className={`text-xs ml-2 font-semibold ${ item.trade_type == "instant_delivery" ? "text-green" : "text-yellow" }`}
                        style={{ textTransform: "capitalize" }} >
                            {item.trade_type}
                        </div>
                    </div>

                    {
                        item.category == "Credits" && (
                            <div className="text-xs font-semibold">{`x${item.stock}`}</div>
                        )
                    }
                </div>

                <div className="flex justify-center py-2">
                    <img
                        src={assetURL+ '/product/' + item.image}
                        width="105"
                        height="105"
                        alt="product"
                    />
                </div>
            </ALink>
            <div className="px-3 pb-1">
                <div>
                    <div className="flex items-end">
                        <div className="text-xl font-bold p-0">{`$${item.amount}`}</div>
                        {
                            item.category.name == 'Credits' &&
                            <div className="text-sm font-semibold text-gray">{"/100"}</div>
                        }
                    </div>

                    <div className="text-gray text-xs mt-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {`Suggested Price $${item.suggested_amount}`}
                    </div>
                </div>

                <div className="text-brown1 text-xs font-bold mt-1" style={{ textTransform: "uppercase" }}>
                    {item.category.name}
                </div>

                <div className="flex flex-col h-12 justify-center space-y-1">
                    {
                        item.category.name !== 'Credits' ? (
                            <>
                                <div className="text-brown1 font-semibold text-fill-white leading-4">{item.title}</div>
                                <div className="text-brown1 text-xs" style={{ color: item.color && item.color.value }}>{item.color && item.color.name}</div>
                            </>
                        ) 
                        : (
                            <Qty price={item.amount} onChangeQty={ changeQty }/>
                        )
                    }
                </div>

                <div className="flex mt-2 items-center">
                    <img className="w-5 h-5 rounded-full bg-gradient-to-l from-brown1 to-brown2" src={assetURL + '/user/profile/' + item.user.image} width="20" height="20" alt="user"/>

                    <div className="ml-2">
                        <div className="text-xs text-fill-white">
                            {item.user ? item.user.username : "store"}
                        </div>

                        <div className="text-gray text-xs">{"View Player Store"}</div>
                    </div>
                </div>
            </div>
        </div>

        <div
            className={`absolute z-0 cursor-pointer h-10 flex justify-center items-center duration-700 left-0 right-0 rounded-b-xl  ${
            isHover ? "-bottom-10 bg-brown1 hover:bg-brown2" : "bottom-0"
            }`}
            onClick={onAddCartClick}
        >
            Add to Cart
        </div>
    </div>
  );
};

export default connect(null, {  ...CartAction })(React.memo(ProductOne));