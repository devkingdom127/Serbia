import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from 'react-redux';

// Import Custom Component
import ALink from "../../common/ALink";

// Import Server
import { assetURL } from "../../../../server";
import { actions as CartAction } from "../../../../store/cart";
import Qty from "../../features/qty";

function ProductDetail( props ) {
    const { product, certifications, colors, relatedProducts } = props;
    const [qty, setQty] = useState(100);

    useEffect(() => {
        document.querySelector("body").addEventListener("click", onBodyClick);

        return (() => {
            document.querySelector("body").removeEventListener("click", onBodyClick);
        })
    }, [])

    function onBodyClick(e) {
        e.target.closest('.toolbox-sort.opened') || (document.querySelector('.toolbox-sort.opened') && document.querySelector('.toolbox-sort.opened').classList.remove('opened'));
    }

    function openList(e) {
        e.currentTarget.classList.toggle('opened');
    }

    function changeQty ( value ) {
        setQty( value );
    }

    function onAddCartClick(e) {
        e.preventDefault();
    
        if( product.category !== "Credits"  ) {
            props.addToCart(product);
        } else {
            props.addToCart({ ...product, amount: product.amount / qty }, qty);
        }   
    }

    function sidebarToggle ( e ) {
        let body = document.querySelector( 'body' );
        e.preventDefault();
        if ( body.classList.contains( 'sidebar-opened' ) ) {
            body.classList.remove( 'sidebar-opened' );
        } else {
            body.classList.add( 'sidebar-opened' );
        }
    }

    return (
        <>
            {
                product && 
                <>
                    <div className="toolbox pt-3 pb-3 flex-wrap pl-5 pr-5 lg:pl-7 lg:pr-7 mr-1.5 ml-1.5 flex items-center justify-between" style={{ background: '#141414' }}>
                        <a href="#" className="sidebar-toggle" onClick={ e => sidebarToggle( e ) }>
                            <svg data-name="Layer 3" id="Layer_3" viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="15" x2="26" y1="9" y2="9" className="cls-1"></line>
                                <line x1="6" x2="9" y1="9" y2="9" className="cls-1"></line>
                                <line x1="23" x2="26" y1="16" y2="16" className="cls-1"></line>
                                <line x1="6" x2="17" y1="16" y2="16" className="cls-1"></line>
                                <line x1="17" x2="26" y1="23" y2="23" className="cls-1"></line>
                                <line x1="6" x2="11" y1="23" y2="23" className="cls-1"></line>
                                <path
                                    d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                                    className="cls-2"></path>
                                <path d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z" className="cls-2"></path>
                                <path d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z" className="cls-3"></path>
                                <path
                                    d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                                    className="cls-2"></path>
                            </svg>
                        </a>

                        <div className="flex items-center order-1">
                            {
                                product.trade_type &&
                                <>
                                    <Image
                                        src={`/images/${product.trade_type == "instant_delivery" ? "clock.svg" : "p2p.svg"}`}
                                        width={24}
                                        height={24}
                                    />

                                    <div className={`text-xs ml-2 font-semibold ${ product.trade_type == "instant_delivery" ? "text-green" : "text-yellow" }`}
                                    style={{ textTransform: "capitalize" }} >

                                        {
                                            product.trade_type == "instant_delivery" ?
                                                "Instant Delivery" : "Player 2 Player"
                                        }
                                    </div>
                                </>
                            }
                        </div>
                
                        <nav aria-label="breadcrumb" className="breadcrumb-nav lg:w-1/3 order-3 sm:order-2">
                            <ol className="breadcrumb flex items-center justify-center whitespace-nowrap">
                                <li className={`breadcrumb-item`}><ALink href="/">RL.Express</ALink></li>                               
                                {
                                    product.category  &&
                                    <li className="breadcrumb-item text-white capitalize"><ALink href={{ pathname: '/shop', query: { category: product.category.name } }} className="capitalize">{ product.category.name }</ALink></li>
                                }
                                {
                                    product.title  &&
                                    <li className="breadcrumb-item text-white capitalize"><a href="#;" className="capitalize">{ product.title }</a></li>
                                }
                            </ol>
                        </nav>

                        <div className="flex mt-2 items-center order-2 sm:order-3">
                            {
                                product.user && 
                                    <>
                                        <img className="w-10 h-10 rounded-full bg-gradient-to-l from-brown1 to-brown2" src={assetURL + '/user/profile/' + product.user.image} width="50" height="50" alt="user"/>

                                        <div className="ml-2">
                                            <div className="text-xs text-fill-white">
                                                {product.user ? product.user.username : "store"}
                                            </div>

                                            <div className="text-gray text-xs">{"View Player Store"}</div>
                                        </div>
                                    </>
                            }
                        </div>
                    </div>

                    <div className="product-single-container mr-1.5 ml-1.5 flex sm:items-center items-start mb-1.5 pl-5 pr-5 xl:pl-16 xl:pr-16 pb-8 relative flex-col sm:flex-row" style={{ background: '#141414' }}>
                        <div className="product-single-media">
                            { 
                                product.image && 
                                <img
                                    src={assetURL+ '/product/' + product.image}
                                    width="388"
                                    height="388"
                                    alt="product"
                                />
                            }
                        </div>

                        <div className="product-single-details sm:pl-10 mt-5 sm:mt-0">
                            <h2 className="xl:text-4xl text-3xl mb-1.5">{ product.title }  { product.color && `- ${ product.color.name }`  }</h2>
                            {
                                product.rarity && 
                                <h4 className="text-base text-gray mb-2">Rarity: { product.rarity.name }</h4>
                            }

                            {
                                product.category && 
                                <h4 className="text-base text-gray mb-2">Category: { product.category.name }</h4>
                            }

                            <h4 className="text-base text-gray mb-2">Paint: { product.color ? product.color.name : 'none' }</h4>

                            <h4 className="text-base text-gray mb-2">Certification: { product.certification ? product.certification.name : 'none' }</h4>
                            
                            {
                                product.series && 
                                <h4 className="text-base text-gray mb-2">Series: { product.subseries.name }</h4>
                            }

                            <h1 className="xl:text-5xl text-4xl mb-1.5">${ product.amount }</h1>
                            <h4 className="text-base text-gray mb-3" style={{ color: '#5f5f5f' }}>Suggested Price: ${ product.suggested_amount }</h4>

                            <div className="mb-5">
                                {
                                    product.category && product.category.name == 'Credits' && <Qty price={product.amount} onChangeQty={ changeQty }/>
                                }
                            </div>

                            <a href="#;" className="xl:mb-0 mb-5 add-cart focus:outline-none bg-gradient-to-l hover:from-brown1 hover:to-brown2 duration-500 rounded-lg cursor-pointer flex items-center justify-center h-10 text-lg md:text-xl px-2 md:px-6 text-center w-full md:w-auto bg-brown1 hover:bg-brown2" onClick={onAddCartClick}>ADD TO CART</a>

                            <h4 className="text-base text-gray flex items-center absolute right-3 bottom-1">
                                Powered by: 
                                <img src="/images/logoSmall.png" width="32" height="32" alt="picture"/>
                                <span className="text-white">RLINSIDER.GG</span>
                            </h4>
                        </div>
                    </div>

                    <div className="mr-1.5 ml-1.5 pl-5 pt-2.5 pb-2.5 pr-5 flex items-start flex-col sm:flex-row" style={{ background: '#141414' }}>
                        <div className="widget widget-color sm:w-2/3">
                            <h3 className="widget-title capitalize">
                                Paint
                            </h3>

                            <div className="widget-body pb-0 pt-0">
                                <ul className="config-swatch-list">
                                    <li className={`tooltip relative ${ !product.color ? 'active' : 'disabled' }`}>
                                        <a href="#;" className="color-empty"
                                            style={ { background: '#141414' } }
                                        ></a>
                                        <span className="tooltiptext tooltip-top">None</span>
                                    </li>
                                    {
                                        colors.length > 0 && colors.map( ( item, index ) => (
                                            <li className={ `tooltip relative ${ product.color && product.color.name == item.name && 'active' } ${ relatedProducts.find( product=> product.color && product.color.name == item.name ) || product.color && product.color.name == item.name ? '' : 'disabled'}` } key={ `color-${ index }` } >
                                                {
                                                    relatedProducts.find( product=> product.color && product.color.name == item.name ) ?
                                                    <ALink href={`/product/${relatedProducts.find( product=> product.color && product.color.name == item.name ).id}`}
                                                        style={ { background: `linear-gradient( 135deg, ${ item.value }88 0%, ${ item.value }88 50%, ${ item.value } 51%, ${ item.value } 100%)` } }
                                                    ></ALink>
                                                    :
                                                    <a href="#;"
                                                        style={ { background: `linear-gradient( 135deg, ${ item.value }88 0%, ${ item.value }88 50%, ${ item.value } 51%, ${ item.value } 100%)` } }
                                                    ></a>
                                                }
                                                <span className="tooltiptext tooltip-top">{ item.name }</span>
                                            </li>
                                        ) )
                                    }
                                </ul>
                            </div>
                        </div>

                        <div className="toolbox-item toolbox-sort select-custom relative mt-4 sm:mt-0" onClick={openList}>
                           <h4 className="items-center ml-auto capitalize lg:flex">
                                Certification:
                            </h4>

                            <a href="#;" className="sort-menu-trigger items-center  capitalize flex pl-0">
                                {
                                    product.certification ? product.certification.name :'Any'
                                }
                                <svg className="ml-2" width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.12946 4.856C4.17075 4.90041 4.22599 4.93672 4.29043 4.96181C4.35488 4.98689 4.42659 5 4.49939 5C4.57219 5 4.6439 4.98689 4.70835 4.96181C4.77279 4.93672 4.82803 4.90041 4.86932 4.856L8.91964 0.522964C8.96652 0.472987 8.99401 0.414449 8.99913 0.353711C9.00424 0.292973 8.98679 0.232358 8.94866 0.178452C8.91053 0.124546 8.85318 0.0794107 8.78284 0.0479494C8.71251 0.0164882 8.63188 -9.54414e-05 8.54971 4.13189e-07H0.449073C0.367096 0.000251199 0.286762 0.0170481 0.216711 0.0485847C0.14666 0.0801213 0.089541 0.125204 0.0514976 0.178986C0.0134543 0.232767 -0.00407424 0.293212 0.000796921 0.35382C0.00566809 0.414428 0.0327547 0.472905 0.0791438 0.522964L4.12946 4.856Z" fill="white"/>
                                </svg>

                                <svg className="active ml-2" width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.87054 0.144001C4.82925 0.0995898 4.77401 0.0632782 4.70957 0.0381923C4.64512 0.0131068 4.57341 0 4.50061 0C4.42781 0 4.3561 0.0131068 4.29165 0.0381923C4.22721 0.0632782 4.17197 0.0995898 4.13068 0.144001L0.0803633 4.47704C0.0334806 4.52701 0.00598812 4.58555 0.000871658 4.64629C-0.0042448 4.70703 0.0132113 4.76764 0.051343 4.82155C0.0894737 4.87545 0.146823 4.92059 0.217158 4.95205C0.287494 4.98351 0.368125 5.0001 0.450293 5L8.55093 5C8.6329 4.99975 8.71324 4.98295 8.78329 4.95142C8.85334 4.91988 8.91046 4.8748 8.9485 4.82101C8.98655 4.76723 9.00407 4.70679 8.9992 4.64618C8.99433 4.58557 8.96725 4.52709 8.92086 4.47704L4.87054 0.144001Z" fill="url(#paint0_linear_160:3880)"/>
                                    <defs>
                                    <linearGradient id="paint0_linear_160:3880" x1="9" y1="2.5" x2="0" y2="2.5" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#D2BD8E"/>
                                    <stop offset="1" stopColor="#C3A46B"/>
                                    </linearGradient>
                                    </defs>
                                </svg>
                            </a>

                            <ul className="sort-list" style={{ background: '#202020' }}>
                                {
                                    certifications.length > 0 && certifications.map( ( item, index ) => (
                                        <li className={ `relative  ${ product.certification && product.certification.name == item.name && 'active' }  ${ relatedProducts.find( product=> product.certification && product.certification.name == item.name ) || product.certification && product.certification.name == item.name ? '' : 'disabled text-gray'}` } key={ `color-${ index }` } >
                                            {
                                                relatedProducts.find( product=> product.certification && product.certification.name == item.name ) ?
                                                <ALink href={`/product/${relatedProducts.find( product=> product.certification && product.certification.name == item.name ).id}`}
                                                >{item.name}</ALink>
                                                :
                                                <a href="#;">{item.name}</a>
                                            }
                                        </li>
                                    ) )
                                }
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default connect(null, {  ...CartAction })(React.memo(ProductDetail));