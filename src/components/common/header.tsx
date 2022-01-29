import React, { useEffect, useState } from "react";
import Image from "next/image";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Loading from 'react-loading-components';
import Modal from 'react-modal';

// Import Custom Component
import ALink from "../common/ALink";
import Button from "../common/button";
import Input from "../common/input";

// Import Actions
import { actions as CartAction } from "../../../store/cart";
import { actions as UserAction } from "../../../store/user";

import server, {  baseUrl } from "../../../server";
import { toast } from "react-toastify";

Modal.setAppElement('body');

function Header ( props ) {
  const { cartItems, user } = props;
  const router = useRouter();
  const query = router.query;
  const [ searchText, setSearchText ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ loading2, setLoading2 ] = useState(false);
  const [ loading3, setLoading3 ] = useState(false);
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ modalIsOpenTwo, setIsOpenTwo ] = useState(false);
  let timer: any;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(77,77,77,0.6)',
      zIndex: '9000'
    }
  };

  useEffect(() => {
    if (query.code && !user.clientId) {
      setLoading(true);
      server.post(`${baseUrl}/epic-account`, {
          code: query.code
      })
      .then((response: any) => {
          props.updateUser({clientId: response.data.client_id, username: response.data.username, balance: response.data.balance});
          setLoading(false);
      })
      .catch((error) => {
          props.updateUser({});
          setLoading(false);
      });
    }
  }, []);

  function epicAuthHandler() {
    window.location.href="https://epicgames.com/id/login?client_id=xyza7891pudP4BzUriSwp5P5EjdfHxfH&responseType=code";
  }

  function depositMoney(e:any) {
    e.preventDefault();
    setIsOpen(true);
  }

  function closeModal () {
    document.getElementById( "deposit-modal" ).classList.remove( "ReactModal__Content--after-open" );

    if ( document.querySelector( ".ReactModal__Overlay" ) ) {
        (document.querySelector( ".ReactModal__Overlay" ) as HTMLElement).style.opacity = '0';
    }

    timer = setTimeout( () => {
      setIsOpen(false);
    }, 350 );
  }

  function closeModalTwo () {
    document.getElementById( "withdraw-modal" ).classList.remove( "ReactModal__Content--after-open" );

    if ( document.querySelector( ".ReactModal__Overlay" ) ) {
        (document.querySelector( ".ReactModal__Overlay" ) as HTMLElement).style.opacity = '0';
    }

    timer = setTimeout( () => {
      setIsOpenTwo(false);
    }, 350 );
  }

  function submitModal(e) {
    e.preventDefault();
    const value = (document.querySelector('#deposit-amount') as HTMLInputElement).value;
    setLoading2(true);
    server.post(`${baseUrl}/deposit-start`, {
      amount: value,
      client_id: user.clientId
    })
    .then((response: any) => {
      props.updateUser({clientId: user.clientId, username: user.username, balance: user.balance, clientSecret: response.data.client_secret});
      closeModal();
      setLoading2(false);
      router.push('/deposit');
    })
    .catch((error) => {
      setLoading2(false);
    });
  }

  function submitModalTwo(e) {
    e.preventDefault();
    const value = (document.querySelector('#withdraw-amount') as HTMLInputElement).value;

    if (parseFloat(value) > parseFloat(user.balance)) {
      toast("Withdraw money is larger than your balance");
      return;
    }

    setLoading3(true);
    server.post(`${baseUrl}/withdraw`, {
      amount: value,
      client_id: user.clientId
    })
    .then((response: any) => {
      if (response.data.url) {
        toast("Account Verification Needed");
        setTimeout(() => {
          window.location.href=response.data.url;
        }, 200);
      } else if (response.data.balance) {
        props.updateUser({clientId: user.clientId, username: user.username, balance: response.data.balance, clientSecret: user.clientSecret});
        closeModalTwo();
        setLoading3(false);
        toast("Money withdrawed successfully");
      }
    })
    .catch((error) => {
      setLoading3(false);
      toast("Verify your account");
    });
  }

  function logOut() {
    props.updateUser({});
    router.push('/');
  }

  function openWithdrawModal(e:any) {
    e.preventDefault();
    setIsOpenTwo(true);
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

  function getCartTotal(items) {
    let total = 0;
    if (items) {
        for (let i = 0; i < items.length; i++) {
            total += parseFloat(items[i].price);
        }
    }

    return total;
  }

  function openMobileMenu ( e ) {
    e.preventDefault();
    document.querySelector( "body" ).classList.toggle( "mmenu-active" );
    e.currentTarget.classList.toggle( "active" );
  }

  const menuArray = [
    "Credits",
    "Car Bodies",
    "Wheels",
    "Decals",
    "Toppers",
    "Boosts",
    "Goal Explosions",
    "Antennas",
    "Trails",
    "Banners",
    "Misc",
  ];

  return (
    <header className="header">
      <div className="flex items-center justify-between px-1 md:px-4 lg:px-8 py-1 border-b-2 border-white" style={{ background: '#141414' }}>
        <div className="flex items-center space-x-4 text-brown">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-brown1 to-brown2 text-transparent bg-clip-text">
            <ALink href="/">RL.Express</ALink>
          </div>

          <div className="flex items-center space-x-2 text-base text-brown1 border-2 border-brown1 rounded-full px-4 d-none d-sm-flex">
            <div className="w-8 h-4 relative" >
              <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12.0049H14.1567V14.9995H0V12.0049Z" fill="url(#paint0_linear_415_736)"/>
                <path d="M0.012084 0.000456695H13.8965V2.99514H0.012084V0.000456695Z" fill="url(#paint1_linear_415_736)"/>
                <path d="M15.1017 0.000456695L27.6535 14.9995L23.7785 15L12.8076 1.9254L15.1017 0.000456695Z" fill="url(#paint2_linear_415_736)"/>
                <path d="M15.1017 0.000456695L27.6535 14.9995L23.7785 15L12.5353 0.00045727L15.1017 0.000456695Z" fill="url(#paint3_linear_415_736)"/>
                <path d="M12.8075 13.0751L23.7784 0.000462827L26.0725 1.92541L15.1016 15L12.8075 13.0751Z" fill="url(#paint4_linear_415_736)"/>
                <path d="M12.8075 13.0751L23.7784 0.000462827L26.0725 1.92541L15.1016 15L12.8075 13.0751Z" fill="url(#paint5_linear_415_736)"/>
                <path d="M12.3991 15L23.7792 0H27.6535L15.1024 14.9995L12.3991 15Z" fill="url(#paint6_linear_415_736)"/>
                <path d="M0.012084 5.99913H13.0798V8.99381H0.012084V5.99913Z" fill="url(#paint7_linear_415_736)"/>
                <defs>
                <linearGradient id="paint0_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint1_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint2_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint3_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint4_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint5_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint6_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                <linearGradient id="paint7_linear_415_736" x1="0" y1="7.5" x2="27.6535" y2="7.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D2BD8E"/>
                <stop offset="1" stopColor="#C3A46B"/>
                </linearGradient>
                </defs>
              </svg>

            </div>
            { location.pathname !== '/trade' ? 
              <ALink href="/trade">Trade bot</ALink>
              : <ALink href="/">Marketplace</ALink>
            }
          </div>
        </div>

        <div className="flex items-center rounded-full px-2 py-1 d-none d-xl-flex">
          <div className="w-6 h-6 relative">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5958 15.2288L13.2906 10.9231C13.9617 9.82141 14.3158 8.5558 14.3136 7.26574C14.3136 3.37252 10.9403 9.21306e-08 7.04745 9.21306e-08C6.12192 -0.000149575 5.20543 0.182053 4.35033 0.536201C3.49522 0.89035 2.71826 1.4095 2.06382 2.06401C1.40937 2.71852 0.890265 3.49556 0.53615 4.35074C0.182036 5.20593 -0.00014956 6.12251 9.21218e-08 7.04812C9.21218e-08 10.9402 3.37334 14.3139 7.26504 14.3139C8.51248 14.315 9.73759 13.983 10.8138 13.3522L15.1419 17.683C15.3454 17.886 15.6211 18 15.9086 18C16.1961 18 16.4718 17.886 16.6753 17.683L17.7496 16.6085C18.1723 16.1858 18.0185 15.6515 17.5958 15.2288ZM2.16915 7.04812C2.169 6.40733 2.29507 5.7728 2.54016 5.18075C2.78525 4.5887 3.14456 4.05073 3.59756 3.59757C4.05057 3.14442 4.5884 2.78495 5.18034 2.5397C5.77227 2.29444 6.40672 2.16821 7.04745 2.16821C9.74293 2.16821 12.1445 4.56886 12.1445 7.26574C12.1442 8.55988 11.63 9.80093 10.715 10.716C9.79999 11.6311 8.55906 12.1453 7.26504 12.1456C4.56956 12.1445 2.16915 9.74272 2.16915 7.04812Z" fill="white"/>
            </svg>

          </div>

          <Input
            value={searchText}
            placeholder="Search your item..."
            onChange={(evt) => {
              evt.preventDefault();
              setSearchText(evt.target.value);
            }}
          />
        </div>

        <button className="mobile-menu-toggler mr-2 p-1.5 d-lg-none ml-auto py-2" type="button" onClick={ openMobileMenu }>
            <i className="fa fa-bars text-white" style={{ fontSize: '20px'}}></i>
        </button>
        
        <div className="flex items-center space-x-4 d-lg-flex d-none">
          {
            loading?
             <Loading type='tail_spin' width={30} height={30} fill='#f44242' />
              : 
              <>
                {
                  user && user.clientId && user.username ?
                  <>
                    <Button onClick={logOut} className="rounded-b-xl bg-brown1 hover:bg-brown2 btn-sell">Log out</Button>
                    <div className="cart-total-price p-1.5 flex items-center justify-items-center rounded" style={{ background: '#232323' }}>
                      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.75 4.03676H1.6875V3.49662L14.0625 2.54598V3.49662H15.75V1.87622C15.75 0.687919 14.7476 -0.14605 13.5236 0.0213923L2.2275 1.5705C1.00238 1.73902 0 2.84846 0 4.03676V14.8395C0 15.4125 0.237053 15.962 0.65901 16.3672C1.08097 16.7724 1.65326 17 2.25 17H15.75C16.3467 17 16.919 16.7724 17.341 16.3672C17.7629 15.962 18 15.4125 18 14.8395V6.1973C18 5.62429 17.7629 5.07474 17.341 4.66956C16.919 4.26438 16.3467 4.03676 15.75 4.03676ZM14.0625 11.6051C13.8408 11.6051 13.6213 11.5631 13.4165 11.4815C13.2118 11.4 13.0257 11.2806 12.869 11.13C12.7123 10.9794 12.588 10.8007 12.5033 10.604C12.4185 10.4073 12.3749 10.1965 12.375 9.98365C12.3751 9.77078 12.4188 9.56001 12.5037 9.36338C12.5886 9.16674 12.713 8.98809 12.8698 8.83762C13.0266 8.68715 13.2128 8.56781 13.4176 8.48642C13.6224 8.40503 13.8419 8.36317 14.0636 8.36324C14.5113 8.36338 14.9406 8.5343 15.2571 8.83839C15.5736 9.14247 15.7513 9.55482 15.7511 9.98472C15.751 10.4146 15.573 10.8269 15.2563 11.1307C14.9396 11.4346 14.5102 11.6053 14.0625 11.6051Z" fill="#141414"/>
                      </svg>

                      <h6 className="mr-2">${user.balance ? parseFloat(user.balance).toFixed(2) : 0}</h6>
                      <a href="#" className="p-1 bg-brown1 hover:bg-brown2 w-7 flex justify-center rounded text-dark" onClick={depositMoney} >
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 8.5C17 9.28342 16.932 9.91667 16.1486 9.91667H9.91667V16.1486C9.91667 16.9306 9.28342 17 8.5 17C7.71658 17 7.08333 16.9306 7.08333 16.1486V9.91667H0.851416C0.0694164 9.91667 0 9.28342 0 8.5C0 7.71658 0.0694164 7.08333 0.851416 7.08333H7.08333V0.851416C7.08333 0.0679998 7.71658 0 8.5 0C9.28342 0 9.91667 0.0679998 9.91667 0.851416V7.08333H16.1486C16.932 7.08333 17 7.71658 17 8.5Z" fill="#141414"/>
                        </svg>
                      </a>
                    </div>
      
                    <ALink href="/cart/" className="flex items-center">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.35 5.75C24.134 5.37577 23.8247 5.06392 23.4523 4.84484C23.0799 4.62577 22.657 4.50696 22.225 4.5H6.225L5.5 1.675C5.42675 1.4023 5.26333 1.16243 5.03635 0.994466C4.80937 0.8265 4.5322 0.740334 4.25 0.750001H1.75C1.41848 0.750001 1.10054 0.881697 0.866116 1.11612C0.631696 1.35054 0.5 1.66848 0.5 2C0.5 2.33152 0.631696 2.64946 0.866116 2.88388C1.10054 3.1183 1.41848 3.25 1.75 3.25H3.3L6.75 16.075C6.82325 16.3477 6.98667 16.5876 7.21365 16.7555C7.44063 16.9235 7.7178 17.0097 8 17H19.25C19.4808 16.9993 19.707 16.9347 19.9033 16.8133C20.0997 16.692 20.2586 16.5186 20.3625 16.3125L24.4625 8.1125C24.6402 7.74002 24.7229 7.32934 24.7033 6.9171C24.6837 6.50487 24.5623 6.10391 24.35 5.75ZM18.475 14.5H8.95L6.9125 7H22.225L18.475 14.5Z" fill="white"/>
                      <path d="M7.375 23.25C8.41053 23.25 9.25 22.4105 9.25 21.375C9.25 20.3395 8.41053 19.5 7.375 19.5C6.33947 19.5 5.5 20.3395 5.5 21.375C5.5 22.4105 6.33947 23.25 7.375 23.25Z" fill="white"/>
                      <path d="M19.875 23.25C20.9105 23.25 21.75 22.4105 21.75 21.375C21.75 20.3395 20.9105 19.5 19.875 19.5C18.8395 19.5 18 20.3395 18 21.375C18 22.4105 18.8395 23.25 19.875 23.25Z" fill="white"/>
                      </svg>

                      <span className="text-xs ml-2">{getQtyTotal(cartItems)}</span>
                    </ALink>

                    <Button onClick={openWithdrawModal} className="rounded-b-xl bg-brown1 hover:bg-brown2 btn-sell">Withdraw</Button>
                    
                    <img src="/images/avatar.png" className="ml-2 mr-2 mb-2 mt-2" width={38} height={38}  />
                    <h3 className="d-none d-md-block">{user.username}</h3>
                  </>
                  :
                  <>
                    <a href="#" className="flex items-center font-extralight border border-yellow hover:bg-yellow pl-2.5 pr-2.5 pt-1 pb-1 rounded" onClick={ epicAuthHandler }>Login / Sign Up</a>
                  </>
                }
              </>
          }
        </div>
      </div>

      <div className="pl-3 pr-3 py-3 flex " style={{ background: '#101010' }} >
        <div className="flex items-center space-x-4 d-lg-none ml-auto flex-wrap">
            {
              user && user.clientId && user.username ?
              <>
                <Button onClick={logOut} className="rounded-b-xl bg-brown1 hover:bg-brown2 btn-sell mt-2 mb-2">Log out</Button>
                <div className="cart-total-price p-1.5 flex items-center justify-items-center rounded mt-2 mb-2" style={{ background: '#232323' }}>
                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.75 4.03676H1.6875V3.49662L14.0625 2.54598V3.49662H15.75V1.87622C15.75 0.687919 14.7476 -0.14605 13.5236 0.0213923L2.2275 1.5705C1.00238 1.73902 0 2.84846 0 4.03676V14.8395C0 15.4125 0.237053 15.962 0.65901 16.3672C1.08097 16.7724 1.65326 17 2.25 17H15.75C16.3467 17 16.919 16.7724 17.341 16.3672C17.7629 15.962 18 15.4125 18 14.8395V6.1973C18 5.62429 17.7629 5.07474 17.341 4.66956C16.919 4.26438 16.3467 4.03676 15.75 4.03676ZM14.0625 11.6051C13.8408 11.6051 13.6213 11.5631 13.4165 11.4815C13.2118 11.4 13.0257 11.2806 12.869 11.13C12.7123 10.9794 12.588 10.8007 12.5033 10.604C12.4185 10.4073 12.3749 10.1965 12.375 9.98365C12.3751 9.77078 12.4188 9.56001 12.5037 9.36338C12.5886 9.16674 12.713 8.98809 12.8698 8.83762C13.0266 8.68715 13.2128 8.56781 13.4176 8.48642C13.6224 8.40503 13.8419 8.36317 14.0636 8.36324C14.5113 8.36338 14.9406 8.5343 15.2571 8.83839C15.5736 9.14247 15.7513 9.55482 15.7511 9.98472C15.751 10.4146 15.573 10.8269 15.2563 11.1307C14.9396 11.4346 14.5102 11.6053 14.0625 11.6051Z" fill="#141414"/>
                      </svg>

                  <h6 className="mr-2">${user.balance ? parseFloat(user.balance).toFixed(3) : 0}</h6>
                  <a href="#" className="p-1 bg-brown1 hover:bg-brown2 w-7 flex justify-center rounded text-dark" onClick={depositMoney}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8.5C17 9.28342 16.932 9.91667 16.1486 9.91667H9.91667V16.1486C9.91667 16.9306 9.28342 17 8.5 17C7.71658 17 7.08333 16.9306 7.08333 16.1486V9.91667H0.851416C0.0694164 9.91667 0 9.28342 0 8.5C0 7.71658 0.0694164 7.08333 0.851416 7.08333H7.08333V0.851416C7.08333 0.0679998 7.71658 0 8.5 0C9.28342 0 9.91667 0.0679998 9.91667 0.851416V7.08333H16.1486C16.932 7.08333 17 7.71658 17 8.5Z" fill="#141414"/>
                    </svg>
                  </a>
                </div>

                <ALink href="/cart/" className="flex items-center mt-2 mb-2 mr-2" style={{marginRight: '16px'}}>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24.35 5.75C24.134 5.37577 23.8247 5.06392 23.4523 4.84484C23.0799 4.62577 22.657 4.50696 22.225 4.5H6.225L5.5 1.675C5.42675 1.4023 5.26333 1.16243 5.03635 0.994466C4.80937 0.8265 4.5322 0.740334 4.25 0.750001H1.75C1.41848 0.750001 1.10054 0.881697 0.866116 1.11612C0.631696 1.35054 0.5 1.66848 0.5 2C0.5 2.33152 0.631696 2.64946 0.866116 2.88388C1.10054 3.1183 1.41848 3.25 1.75 3.25H3.3L6.75 16.075C6.82325 16.3477 6.98667 16.5876 7.21365 16.7555C7.44063 16.9235 7.7178 17.0097 8 17H19.25C19.4808 16.9993 19.707 16.9347 19.9033 16.8133C20.0997 16.692 20.2586 16.5186 20.3625 16.3125L24.4625 8.1125C24.6402 7.74002 24.7229 7.32934 24.7033 6.9171C24.6837 6.50487 24.5623 6.10391 24.35 5.75ZM18.475 14.5H8.95L6.9125 7H22.225L18.475 14.5Z" fill="white"/>
                      <path d="M7.375 23.25C8.41053 23.25 9.25 22.4105 9.25 21.375C9.25 20.3395 8.41053 19.5 7.375 19.5C6.33947 19.5 5.5 20.3395 5.5 21.375C5.5 22.4105 6.33947 23.25 7.375 23.25Z" fill="white"/>
                      <path d="M19.875 23.25C20.9105 23.25 21.75 22.4105 21.75 21.375C21.75 20.3395 20.9105 19.5 19.875 19.5C18.8395 19.5 18 20.3395 18 21.375C18 22.4105 18.8395 23.25 19.875 23.25Z" fill="white"/>
                      </svg>

                  <span className="text-xs ml-2">{getQtyTotal(cartItems)}</span>
                </ALink>
                <div style={{marginRight: '16px', marginLeft: 0}}>
                  <Button onClick={openWithdrawModal} className="rounded-b-xl bg-brown1 hover:bg-brown2 btn-sell mr-2 mt-2 mb-2">Withdraw</Button>
                </div>
                <div className="user-info mt-2 mb-2 d-flex" style={{alignItems: 'center', marginLeft: '0'}}>
                  <img src="/images/avatar.png" className="mr-2 user-avatar" width={38} height={38}  />
                  <h3>{user.username}</h3>
                </div>
              </>
              :
              <>
                <a href="#" className="flex items-center font`-extralight border border-yellow hover:bg-yellow pl-2.5 pr-2.5 pt-1 pb-1 rounded" onClick={ epicAuthHandler }>Login / Sign Up</a>
              </>
            }
          </div>
        { location.pathname !== '/trade' ? 
          <nav className="d-none d-lg-flex flex items-center justify-center space-x-8 flex-wrap py-3 ml-auto mr-auto" >
            {
              menuArray.map((item, index) => {
                return (
                  <div className={ `text-gray active-color-white hover:text-white cursor-pointer font-bold text-base text-transform-uppercase ${ query.category == item ? 'active' : '' }` } key={ index }>
                    <ALink href={  { pathname: '/shop', query: { ...query, category: item } }}>{item}</ALink>
                  </div>
                );
              })
            }
          </nav> : ''
        }
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        id="deposit-modal"
        contentLabel="Deposit Modal"
      >
        <div className="modal-content">
        {
            loading2?
             <Loading type='tail_spin' width={440} height={100} fill='#f44242' />
              : 
              <>
                <button type="button" className="close" onClick={ closeModal }>
                    <span aria-hidden="true"><i className="icon-close"></i></span>
                </button>
                <div className="form-box">
                    <h2 className="fa-2x mb-5 text-center">Deposit Money</h2>
                    <form action="#">
                        <div className="form-group">
                            <label htmlFor="deposit-amount">Amount *</label>
                            <input type="number" className="form-control" id="deposit-amount" name="amount" required />
                        </div>

                    </form>
                    <div className="form-choice">
                        <div className="row justify-between">
                            <div className="col-sm-6">
                                <a href="#" className="btn btn-login btn-g btn-cancel" onClick={closeModal}>
                                    Cancel
                                </a>
                                
                            </div>
                            <div className="col-sm-6">
                                <a href="#" className="btn btn-login btn-f btn-confirm" onClick={submitModal}>
                                    Confirm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
              </>
          }
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenTwo}
        onRequestClose={closeModal}
        style={customStyles}
        id="withdraw-modal"
        contentLabel="Withdraw Modal"
      >
        <div className="modal-content">
        {
            loading3?
             <Loading type='rings' width={440} height={200} fill='#f44242' />
              : 
              <>
                <button type="button" className="close" onClick={ closeModalTwo }>
                    <span aria-hidden="true"><i className="icon-close"></i></span>
                </button>
                <div className="form-box">
                    <h2 className="fa-2x mb-5 text-center">Withdraw Money</h2>
                    <form action="#">
                        <div className="form-group">
                            <label htmlFor="withdraw-amount">Amount *</label>
                            <input type="number" className="form-control" id="withdraw-amount" name="amount" required />
                        </div>

                    </form>
                    <div className="form-choice">
                        <div className="row justify-between">
                            <div className="col-sm-6">
                                <a href="#" className="btn btn-login btn-g btn-cancel" onClick={closeModalTwo}>
                                    Cancel
                                </a>
                            </div>
                            <div className="col-sm-6">
                                <a href="#" className="btn btn-login btn-f btn-confirm" onClick={submitModalTwo}>
                                    Confirm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
              </>
          }
        </div>
      </Modal>
    </header>
  );
};

function mapStateToProps(state) {
  return {
      cartItems: state.cartlist.cart ? state.cartlist.cart : [],
      user: state.user.user? state.user.user: {}
  }
}

export default connect(mapStateToProps, {...CartAction, ...UserAction} )(Header);