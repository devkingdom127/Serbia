import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter, withRouter } from 'next/router';

// Import Custom Component
import ALink from './ALink';

function MobileMenu () {
    const router = useRouter();
    const query = router.query;

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

    function closeMobileMenu () {
        document.querySelector( "body" ).classList.remove( "mmenu-active" );

        if ( document.querySelector( ".menu-toggler" ) ) {
            document.querySelector( ".menu-toggler" ).classList.remove( "active" );
        }
    }

    return (
        <>
            <div className="mobile-menu-overlay" onClick={ closeMobileMenu }></div>
            <div className="mobile-menu-container">
                <div className="mobile-menu-wrapper">
                    <span className="mobile-menu-close" onClick={ closeMobileMenu }>x</span>
                    <form className="search-wrapper mb-5" action="#">
                        <input type="text" className="form-control mb-0 w-100" placeholder="Search..." required />
                        <button className="btn icon-search text-white bg-transparent p-0" type="submit" style={{ width: '20px' }}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5958 15.2288L13.2906 10.9231C13.9617 9.82141 14.3158 8.5558 14.3136 7.26574C14.3136 3.37252 10.9403 9.21306e-08 7.04745 9.21306e-08C6.12192 -0.000149575 5.20543 0.182053 4.35033 0.536201C3.49522 0.89035 2.71826 1.4095 2.06382 2.06401C1.40937 2.71852 0.890265 3.49556 0.53615 4.35074C0.182036 5.20593 -0.00014956 6.12251 9.21218e-08 7.04812C9.21218e-08 10.9402 3.37334 14.3139 7.26504 14.3139C8.51248 14.315 9.73759 13.983 10.8138 13.3522L15.1419 17.683C15.3454 17.886 15.6211 18 15.9086 18C16.1961 18 16.4718 17.886 16.6753 17.683L17.7496 16.6085C18.1723 16.1858 18.0185 15.6515 17.5958 15.2288ZM2.16915 7.04812C2.169 6.40733 2.29507 5.7728 2.54016 5.18075C2.78525 4.5887 3.14456 4.05073 3.59756 3.59757C4.05057 3.14442 4.5884 2.78495 5.18034 2.5397C5.77227 2.29444 6.40672 2.16821 7.04745 2.16821C9.74293 2.16821 12.1445 4.56886 12.1445 7.26574C12.1442 8.55988 11.63 9.80093 10.715 10.716C9.79999 11.6311 8.55906 12.1453 7.26504 12.1456C4.56956 12.1445 2.16915 9.74272 2.16915 7.04812Z" fill="white"/>
                            </svg>
                        </button>
                    </form>

                    <nav className="mobile-nav">
                        <ul className="mobile-menu">
                            {
                                menuArray.map((item, index) => {
                                    return (
                                        <div className={ `text-gray active-color-white hover:text-white cursor-pointer font-bold text-base text-transform-uppercase ${ query.category == item ? 'active' : '' }` } key={ index }>
                                            <ALink href={  { pathname: '/shop', query: { ...query, category: item } }}>{item}</ALink>
                                        </div>
                                    );
                                })
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default withRouter( MobileMenu );