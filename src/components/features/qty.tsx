import { useEffect, useState } from "react";

function Qty ( props ) {
  const { value = 100, price = 0, max = 10000, onChangeQty } = props;
  const [ current, setCurrent ] = useState( value );

  useEffect( () => {
    onChangeQty && onChangeQty( current );
  }, [ current ] )

  function increment () {
    if ( max <= 0 || current >= max )
        return;
      setCurrent( current + 10 );
  }

  function decrement () {
      if ( current > 10 ) {
          setCurrent( current - 10 );
      }
  }

  return (
    <div className="flex text-xs font-bold items-center justify-items-stretch">
      <button
        className="focus:outline-none bg-gradient-to-l hover:from-brown1 hover:to-brown2 cursor-pointer bg-gray1 py-1 w-5 rounded-l-md flex items-center justify-center"
        onClick={ decrement }
      >
        <div>{"-"}</div>
      </button>

      <div className="bg-gray1 py-1 px-5 m-1">{ `${ current }` }</div>

      <button
        className="focus:outline-none bg-gradient-to-l hover:from-brown1 hover:to-brown2 cursor-pointer bg-gray1 py-1 w-5 rounded-r-md flex items-center justify-center"
        onClick={ increment }
      >
        <div>{"+"}</div>
      </button>

      <div className="p-2">=</div>
      <div>${ (price * current / 100).toFixed(2) }</div>
    </div>
  );
};

export default Qty;
