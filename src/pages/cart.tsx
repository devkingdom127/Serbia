import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

import { assetURL } from '../../server';

// Import Custom Component
import ALink from '../components/common/ALink';
import Button from '../components/common/button';
import Loading from 'react-loading-components';

// Store
import { actions as CartAction } from "../../store/cart";
import { actions as UserAction } from "../../store/user";
import server, {  baseUrl } from "../../server";

function Cart ( props ) {
    const [ cartList, setCartList ] = useState( [] );
    const [ loading, setLoading ] = useState(false);
    const { user } = props;
    const router = useRouter();

    useEffect( () => {
        setCartList( [ ...props.cart ] );
    }, [ props.cart ] )

    function closeSidebar () {
        document.querySelector( 'body' ).classList.contains( 'sidebar-opened' ) && document.querySelector( 'body' ).classList.remove( 'sidebar-opened' );
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

    function purchase() {
        if ( !user.balance || getCartTotal( cartList ) > user.balance ) {
            toast( "You can not purchase, Please deposit money first." );
            return;
        }

        if (getCartTotal( cartList) == 0 ) {
            toast( "Please add item to purchase." );
        }

        setLoading(true);
        server.post(`${baseUrl}/purchase`, {
            client_id: user.clientId,
            items: cartList
        })
        .then((response: any) => {
            props.updateCart([]);
            props.updateUser({clientId: user.clientId, username: user.username, balance: response.data.balance, clientSecret: user.clientSecret});
            setLoading(false);
            router.push('/');
        })
        .catch((error) => {
            toast( "You can not purchase, Please deposit money first." );
            setLoading(false);
        });
    }

    function removeFromCart ( item, id ) {
        props.removeFromCart( item );
    }

    function getCartTotal(items) {
        let total = 0;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                total += parseFloat(items[i].price) * parseFloat(items[i].qty);
            }
        }

        return total;
    }

    function getQtyTotal(items) {
        let total = 0;
    
        if (items) {
            for (let i = 0; i < items.length; i++) {
                total += parseInt(items[i].qty, 10);
            }
        }
    
        return total;
    }

    return (
        <main className="main cart" style={{ backgroundColor: '#1f1f1f' }}>
            <div className="container">
                <div className="grid grid-cols-12 grid-rows-1 grid-flow-col gap-0">
                    <div className="col-span-12 lg:col-span-8 xl:col-span-8 mt-1.5 lg:ml-0 mb-1.5 lg:pl-3 lg:pr-10 sm:pr-5 sm:pl-5 pr-3 pl-3">
                        <div className="flex justify-between items-center mb-3 mt-5">
                            <h6 className="font-light text-2xl">{ getQtyTotal(cartList) } items</h6>
                            <a href="#" className="flex items-center " title="Remove Product" onClick={ ( e ) => { e.preventDefault(); props.removeAllCarts(); } }>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.33334 1.16667V2H12.8333C12.966 2 13.0931 2.05268 13.1869 2.14645C13.2807 2.24022 13.3333 2.36739 13.3333 2.5C13.3333 2.63261 13.2807 2.75979 13.1869 2.85356C13.0931 2.94733 12.966 3 12.8333 3H0.500001C0.367392 3 0.240215 2.94733 0.146447 2.85356C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24022 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.500001 2H4V1.16667C4 0.522667 4.52267 0 5.16667 0H8.16668C8.81068 0 9.33334 0.522667 9.33334 1.16667ZM5.00001 1.16667C5.00001 1.12247 5.01756 1.08007 5.04882 1.04882C5.08008 1.01756 5.12247 1 5.16667 1H8.16668C8.21088 1 8.25327 1.01756 8.28453 1.04882C8.31578 1.08007 8.33334 1.12247 8.33334 1.16667V2H5.00001V1.16667Z" fill="white"/>
                                    <path d="M1.99814 4.11897C1.99244 4.05315 1.97375 3.98911 1.94315 3.93055C1.91255 3.87199 1.87064 3.82007 1.81986 3.77781C1.76908 3.73554 1.71042 3.70375 1.64728 3.68429C1.58414 3.66483 1.51777 3.65808 1.452 3.66442C1.38623 3.67076 1.32237 3.69008 1.26412 3.72125C1.20586 3.75242 1.15436 3.79483 1.11259 3.84602C1.07082 3.89722 1.03961 3.95618 1.02077 4.01951C1.00192 4.08284 0.995817 4.14927 1.0028 4.21498L1.94414 13.947C1.97229 14.2354 2.10681 14.5031 2.32149 14.6978C2.53617 14.8925 2.81564 15.0004 3.10547 15.0003H10.2281C10.5181 15.0003 10.7976 14.8924 11.0123 14.6976C11.227 14.5027 11.3615 14.2349 11.3895 13.9463L12.3315 4.21498C12.3442 4.0829 12.304 3.95117 12.2196 3.84878C12.1352 3.74638 12.0136 3.68171 11.8815 3.66897C11.7494 3.65624 11.6177 3.6965 11.5153 3.78089C11.4129 3.86529 11.3482 3.9869 11.3355 4.11897L10.3941 13.8497C10.3902 13.8909 10.371 13.9292 10.3403 13.9571C10.3096 13.9849 10.2696 14.0003 10.2281 14.0003H3.10547C3.06402 14.0003 3.02405 13.9849 2.99335 13.9571C2.96266 13.9292 2.94345 13.8909 2.93947 13.8497L1.99814 4.11897Z" fill="white"/>
                                </svg>
                                <span className="font-light text-md ml-1 mt-1">CLEAR CART</span>
                            </a>
                        </div>

                        <div className="cart-table-container">
                            {
                                cartList.length === 0 ? 
                                <h6 className="font-light mb-3 mt-5 text-2xl">No items</h6>
                                :
                                cartList.map( ( item, index ) => (
                                    <div className="flex items-center justify-between mb-3" key={ index }>
                                        <div className="flex items-center">
                                            <div className="product-img mr-4">
                                                <img
                                                    src={assetURL+ '/product/' + item.image}
                                                    width="135"
                                                    height="135"
                                                    alt="product"
                                                />
                                            </div>    

                                            <div className="product-detail">
                                                {
                                                    item.category && 
                                                    <h4 className="text-base text-gray mb-1">{ item.category.name }</h4>
                                                }

                                                <div className="text-brown1 font-semibold text-fill-white leading-4 mb-1">{item.title}</div>
                                                <div className="text-brown1 text-xs" style={{ color: item.color && item.color.value }}>{item.color && item.color.name}</div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-2xl font-light p-0 mb-2">{`$${item.amount}`} <span className="text-xs">x {item.qty}</span></div>
                                            
                                            <a href="#" className="flex items-center " title="Remove Product" onClick={ ( e ) => { e.preventDefault(); removeFromCart( item, index ); } }>
                                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.33334 1.16667V2H12.8333C12.966 2 13.0931 2.05268 13.1869 2.14645C13.2807 2.24022 13.3333 2.36739 13.3333 2.5C13.3333 2.63261 13.2807 2.75979 13.1869 2.85356C13.0931 2.94733 12.966 3 12.8333 3H0.500001C0.367392 3 0.240215 2.94733 0.146447 2.85356C0.0526784 2.75979 0 2.63261 0 2.5C0 2.36739 0.0526784 2.24022 0.146447 2.14645C0.240215 2.05268 0.367392 2 0.500001 2H4V1.16667C4 0.522667 4.52267 0 5.16667 0H8.16668C8.81068 0 9.33334 0.522667 9.33334 1.16667ZM5.00001 1.16667C5.00001 1.12247 5.01756 1.08007 5.04882 1.04882C5.08008 1.01756 5.12247 1 5.16667 1H8.16668C8.21088 1 8.25327 1.01756 8.28453 1.04882C8.31578 1.08007 8.33334 1.12247 8.33334 1.16667V2H5.00001V1.16667Z" fill="white"/>
                                                    <path d="M1.99814 4.11897C1.99244 4.05315 1.97375 3.98911 1.94315 3.93055C1.91255 3.87199 1.87064 3.82007 1.81986 3.77781C1.76908 3.73554 1.71042 3.70375 1.64728 3.68429C1.58414 3.66483 1.51777 3.65808 1.452 3.66442C1.38623 3.67076 1.32237 3.69008 1.26412 3.72125C1.20586 3.75242 1.15436 3.79483 1.11259 3.84602C1.07082 3.89722 1.03961 3.95618 1.02077 4.01951C1.00192 4.08284 0.995817 4.14927 1.0028 4.21498L1.94414 13.947C1.97229 14.2354 2.10681 14.5031 2.32149 14.6978C2.53617 14.8925 2.81564 15.0004 3.10547 15.0003H10.2281C10.5181 15.0003 10.7976 14.8924 11.0123 14.6976C11.227 14.5027 11.3615 14.2349 11.3895 13.9463L12.3315 4.21498C12.3442 4.0829 12.304 3.95117 12.2196 3.84878C12.1352 3.74638 12.0136 3.68171 11.8815 3.66897C11.7494 3.65624 11.6177 3.6965 11.5153 3.78089C11.4129 3.86529 11.3482 3.9869 11.3355 4.11897L10.3941 13.8497C10.3902 13.8909 10.371 13.9292 10.3403 13.9571C10.3096 13.9849 10.2696 14.0003 10.2281 14.0003H3.10547C3.06402 14.0003 3.02405 13.9849 2.99335 13.9571C2.96266 13.9292 2.94345 13.8909 2.93947 13.8497L1.99814 4.11897Z" fill="white"/>
                                                </svg>
                                                <span className="font-light text-md ml-1">Remove</span>
                                            </a>
                                        </div>
                                    </div>
                                ) )
                            }
                        </div>
                    </div>

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

                    <div className="sidebar-overlay" onClick={ closeSidebar }></div>
                    <aside className="mt-10 mr-1.5 p-3 lg:col-span-4 xl:col-span-4 mb-1.5 sidebar-shop product mobile-sidebar cart-summary">
                        <div >
                            <h3>CART</h3>
                            <a href="#" className="btn-close absolute right-5 top-3" onClick={ closeSidebar }>x</a>
                            <h6 className="text-xs font-light mb-6">{ getQtyTotal(cartList) } items</h6>

                            <table className="table table-totals">
                                <tbody>
                                    <tr>
                                        <td className="text-gray text-md">Available Balance</td>
                                        <td className="text-gray text-md">${ getCartTotal( cartList ).toFixed( 2 ) }</td>
                                    </tr>

                                    <tr>
                                        <td className="text-gray text-md">Applied Cash Balance</td>
                                        <td className="text-gray text-md">${ getCartTotal( cartList ).toFixed( 2 ) }</td>
                                    </tr>

                                    <tr>
                                        <td className="text-gray text-md">New Balance</td>
                                        <td className="text-gray text-md">${ getCartTotal( cartList ).toFixed( 2 ) }</td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td className="text-gray">Total</td>
                                        <td className="text-gray">${ getCartTotal( cartList ).toFixed( 2 ) }</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="checkout-methods text-center">
                                {
                                    loading?
                                        <div className="mr-auto ml-auto inline-block">
                                            <Loading type='three_dots' width={40} height={40} fill='#f44242' />
                                        </div>
                                    :
                                        <Button onClick={purchase} className="btn btn-block rounded-b-xl bg-brown1 hover:bg-brown2 btn-sell w-100">Purchase</Button>
                                }
                            </div>

                            <p className="text-xs font-light text-white mt-5 leading-5">
                                After purchasing any item(s) off the marketplace, you can find your newly accuired items in your <br/><a href="#" className="underline">RL.Express Invertory</a>
                            </p>
                        </div>
                    </aside>    
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = ( state ) => {
    return {
        cart: state.cartlist.cart ? state.cartlist.cart : [],
        user: state.user.user? state.user.user: {}
    }
}

export default connect( mapStateToProps, { ...CartAction, ...UserAction } )( Cart );