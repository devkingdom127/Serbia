import React from 'react';

const StateBox = props => {
  return (
    <div className="toolbox statebox pl-2 pr-1 sm:pl-3 sm:pr-3 lg:pl-7 lg:pr-7 lg:pt-7 mr-1 ml-1 mb-2" style={{ background: '#141414' }}>
      <div className='state col-span-12 lg:col-span-12'>
        <span>Status: <span className='val'>online</span></span>
      </div>
      <div className='btn col-span-12 lg:col-span-12'>
        <button className='trade'>Trade</button>
      </div>
      <div className='balance col-span-12 lg:col-span-12'>
        <span>Balance: </span>
        <div className="row justify-center items-baseline">
          <img src="/images/item_2.svg" alt="item_2.svg" />
          <span style={{color:"#c2a46b", position:"relative", top:"-3px"}}>&nbsp;7,463</span>
        </div>
      </div>
    </div>
  )
};

export default StateBox;
