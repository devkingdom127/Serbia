import React, { useState } from "react";
import { connect } from 'react-redux';

import { actions as CartAction } from "../../../../store/cart";

const ProductItem = (props) => {
    const { item } = props;
    const [isHover, setIsHover] = useState(false);
    const [qty, setQty] = useState(100);

    function changeQty ( value ) {
        setQty( value );
    }

  return (
    <div className="trade-item m-1">
      <div className="trade-img">
        <img src="/images/item_rect.svg" width="100%" height="165px" alt="item_1.svg" />
        <div className="subimg pr-2 pl-2 pb-4 pt-1">
          <img src="/images/item_1.png" alt="item_1.svg" />
        </div>
        <div className="subimg1 row">
          <img className={item.name !="X-Devil: Vector" && item.name.length>15?"moveUpImg":""} src="/images/item_2.svg" alt="item_2.svg" />
          <h6 className={item.name !="X-Devil: Vector" && item.name.length>15?"moveUpLetter":""}>58</h6>
        </div>
        <div className="subimg2">
          <img src="/images/item_3.svg" alt="item_3.svg" />
        </div>
      </div>
      <div className={item.name !="X-Devil: Vector" && item.name.length>15?"item-text moveUp":"item-text"} >
        {item.name.length>20?
        <h6 className="item-text" style={{ fontSize: "11px" }} >{ item.name.slice(0, 20) }...</h6>
        :
        <h6 className="item-text" style={{ fontSize: "11px" }} >{ item.name }</h6>
        }
      </div>
    </div>
  );
};

export default connect(null, {  ...CartAction })(React.memo(ProductItem));