import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import server, { baseUrl } from '../../../../server';
import ALink from '../../common/ALink';
import ProductOne from '../../features/products/product-one';

export default function ProductsGrid(props) {
    const router = useRouter();
    const query = router.query;
    const [ products, setProducts ] = useState([]);
    const [ productCount, setProductCount ] = useState(0);
    const sortList = [
        {
            slug: "newest",
            name: "Newest"
        },
        {
            slug: "highest-percent",
            name: "Highest Discount by %"
        },
        {
            slug: "highest-amount",
            name: "Highest Discount by $"
        },
        { 
            slug: "cheapest-first",
            name: "Cheapest First"
        },
        {
            slug: "expensive-first",
            name: "Expensive First"
        },
        {
            slug: "name",
            name: "Alphabetical"
        }
    ];

    useEffect(()=>{
        server.get(`${baseUrl}/shop`, {
            params: {
                ...query,
                sortBy: query.sortBy ? query.sortBy : 'newest'
            },
        }).then((response) => {
            const temp: any = response.data;

            if( typeof temp.products === typeof {} ) {
                setProducts(Object.values(temp.products));
            } else {
                setProducts(temp.products);
            }

            setProductCount(temp.total_count);
        }).catch((error) => ({ error: JSON.stringify(error) }));
    }, [query])

    useEffect(() => {
        document.querySelector("body").addEventListener("click", onBodyClick);

        return (() => {
            document.querySelector("body").removeEventListener("click", onBodyClick);
        })
    }, [])

    function openList(e) {
        e.currentTarget.classList.toggle('opened');
    }

    function containsAttrInUrl ( type, value ) {
        const attr:any = query[ type ];
        const currentQueries = attr ? attr.split( ',' ) : [];
        return currentQueries && currentQueries.includes( value );
    }

    function getUrlForAttrs ( type, value ) {
        const attr:any = query[ type ];
        let currentQueries = attr ? attr.split( ',' ) : [];
        currentQueries = containsAttrInUrl( type, value ) ? currentQueries.filter( item => item !== value ) : [ ...currentQueries, value ];
        return currentQueries.join( ',' );
    }

    function onBodyClick(e) {
        e.target.closest('.toolbox-sort.opened') || (document.querySelector('.toolbox-sort.opened') && document.querySelector('.toolbox-sort.opened').classList.remove('opened'));
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

    function selectName() {
        const find = sortList.find(item => item.slug == query.sortBy);
        return find? find.name: 'Newest';
    }

    return (
        <>
            <div className="toolbox pl-2 pr-1 sm:pl-3 sm:pr-3 lg:pl-7 lg:pr-7 mr-1 ml-1 mb-2 flex items-center justify-between" style={{ background: '#141414' }}>
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

                <nav aria-label="breadcrumb" className="breadcrumb-nav lg:w-1/3">
                    <ol className="breadcrumb flex items-center">
                        <li className={`breadcrumb-item ${query.category || query.sortBy == 'newest' || 'text-white'}`}><ALink href="/">RL.Express</ALink></li>
                        {
                            query.category && 
                            <li className="breadcrumb-item text-white capitalize"><a href="#;" className="capitalize">{ query.category }</a></li>
                        }

                        {
                            query.sortBy == 'newest' && 
                            <li className="breadcrumb-item text-white "><a href="#;" className="capitalize">Recently Added</a></li>
                        }
                    </ol>
                </nav>

                <h6 className="flex justify-center d-none d-lg-flex text-gray">{ productCount } Items</h6>

                <div className="toolbox-item toolbox-sort select-custom relative lg:w-1/3 d-flex" onClick={openList}>
                    <a href="#;" className="sort-menu-trigger items-center ml-auto capitalize lg:flex lg:justify-end">
                        { selectName() }
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
                            sortList.map((item, index) => (
                                <li className={`relative ${ containsAttrInUrl('sortBy', item.slug) ? 'active' : '' }`} key={`sortBy-${index}`}>
                                    <ALink
                                        href={{ query: { ...query, sortBy: getUrlForAttrs('sort', item.slug) } }}
                                    >{item.name}
                                    </ALink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            
            <div className="row">
                 {
                    products.length > 0 && products.map((item, index) => (
                        <div className="col-6 col-sm-4 col-xl-3 col-xxl-5 col-xxxl-6" key={`product-${index}`}>
                            <ProductOne item={item} />
                        </div>
                    ))
                 }
            </div>
            {
                products.length === 0 ?
                    <div className="info-box with-icon pl-2 text-yellow text-md"><p>No products were found matching your selection.</p></div>
                    : ''
            }
        </>
    )
}