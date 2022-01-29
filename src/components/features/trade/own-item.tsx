import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { assetURL } from "../../../../server";
import { actions as CartAction } from "../../../../store/cart";

const OwnItem = (props) => {
  const { item } = props;

  return (
    <div className="trade-item m-1">
      <div className="trade-img">
        <img src="/images/item_rect.svg" width="100%" height="165px" alt="item_1.svg" />
        <div className="subimg pr-2 pl-2 pb-4 pt-1">
          <img src={assetURL+ '/product/' + item.image} alt="item_1.svg" />
        </div>
        <div className="subimg1 row">
          <img className={item.title.length>14?"moveUpImg":""} src="/images/item_2.svg" alt="item_2.svg" />
          <h6 className={item.title.length>14?"moveUpLetter":""}>58</h6>
        </div>
        <div className="subimg2">
          {
          item.color?.name == "Black"?
            <img src="/images/color/Rectangle 77.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 77.svg" />
          :
          item.color?.name == "Grey"?
            <img src="/images/color/Rectangle 78.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 78.svg" />
          :
          item.color?.name == "Red"?
            <img src="/images/color/Rectangle 79.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 79.svg" />
          :
          item.color?.name == "Yellow"?
            <img src="/images/color/Rectangle 80.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 80.svg" />
          :
          item.color?.name == "Sienna"?
            <img src="/images/color/Rectangle 81.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 81.svg" />
          :
          item.color?.name == "Saffron"?
            <img src="/images/color/Rectangle 88.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 88.svg" />
          :
          item.color?.name == "Lime"?
            <img src="/images/color/Rectangle 82.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 82.svg" />
          :
          item.color?.name == "Crimson"?
            <img src="/images/color/Rectangle 83.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 83.svg" />
          :
          item.color?.name == "Orange"?
            <img src="/images/color/Rectangle 84.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 84.svg" />
          :
          item.color?.name == "Purple"?
            <img src="/images/color/Rectangle 85.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 85.svg" />
          :
          item.color?.name == "Cobalt"?
            <img src="/images/color/Rectangle 86.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 86.svg" />
          :
          item.color?.name == "teal"?
            <img src="/images/color/Rectangle 87.svg" style={{width:"16px", height:"16px"}} alt="Rectangle 87.svg" />
          :
          item.color?.name == "White"?
            <img src="/images/color/white.png" style={{width:"16px", height:"16px"}} alt="white.png" />
          :
          ""
          }
        </div>
      </div>
      <div className="item-text">
        <h6 className={item.title.length>14?"item-text moveUp":"item-text"} style={{ fontSize: "12px" }} >{ item.title }</h6>
      </div>
    </div>
  );
};

export default connect(null, {  ...CartAction })(React.memo(OwnItem));