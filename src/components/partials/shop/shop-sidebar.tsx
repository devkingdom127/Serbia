import { useEffect, useState } from 'react';
import SlideToggle from 'react-slide-toggle';
// import InputRange from 'react-input-range';
import { useRouter } from 'next/router';

// Import Custom Component
import ALink from '../../common/ALink';

// Import Server
import server, { baseUrl } from '../../../../server';

export default function ShopSidebar ( ) { 
    const router = useRouter();
    const query = router.query;
    const [ colors, setColors ] = useState([]);
    const [ rarities, setRarities ] = useState([]);
    const [ certifications, setCertifications ] = useState([]);
    const [ series, setSeries ] = useState([]);
    const [ priceRange, setRange ] = useState( { min: 0, max: 1000 } );
    const [timer, setTimer] = useState(null);

    useEffect(()=>{
        server.get(`${baseUrl}/shop/sidebar`).then((response) => {
            const temp: any = response.data;
            setColors(temp.colors.data);
            setRarities(temp.rarities.data);
            setCertifications(temp.certifications.data);
            setSeries(temp.series);
        }).catch((error) => ({ error: JSON.stringify(error) }));


    }, [])

    useEffect( () => {
        if (timer) clearTimeout(timer);
        
        let timerId = setTimeout(() => {
            document.getElementById('filter-price') && document.getElementById('filter-price').click();
        }, 500);

        setTimer(timerId);
    }, [ priceRange ] )

    function onChangePriceRange ( value ) {
        setRange( { ...value, min: parseFloat( value.min.toString().indexOf( '-' ) >= 0 ? value.min.toString().substring(1) : value.min ) } );
    }

    function closeSidebar () {
        document.querySelector( 'body' ).classList.contains( 'sidebar-opened' ) && document.querySelector( 'body' ).classList.remove( 'sidebar-opened' );
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

    function clearPrice () {
        setRange({ min: 0, max: 1000 });
    }

    function changeMinCount ( e ) {
        let value = parseFloat( e.target.value.indexOf( '-' ) >= 0 ? e.target.value.substring(1) : e.target.value );
        setRange({ ...priceRange, min: value < priceRange.max ? value : value && priceRange.max });
    }

    function changeMaxCount ( e ) {
        let value = parseFloat( e.target.value.indexOf( '-' ) >= 0 ? e.target.value.substring(1) : e.target.value );
        setRange({ ...priceRange, max: value < priceRange.min ? value ? priceRange.min : 1 : value });
    }    

    return (
        <>
            <div className="sidebar-overlay" onClick={ closeSidebar }></div>
            <nav className={ `sidebar-shop mobile-sidebar m-1.5 p-7 col-span-3` }>
                <a href="#" className="btn-close absolute right-5 top-3" onClick={ closeSidebar }>x</a>
                
                <div className="sidebar-wrapper">
                    <div className="widget overflow-hidden">
                        <SlideToggle>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) =>
                                (
                                    <>
                                        <h3 className="widget-title">
                                            <a className={ `capitalize d-flex items-center ${ toggleState === 'COLLAPSED' ? 'collapsed' : ''  }`} href="#;" role="button" >
                                                Price
                                                {
                                                    toggleState === 'COLLAPSED' ?
                                                    <i className="sicon-arrow-down" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                                    :
                                                    <i className="sicon-arrow-up" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                                }
                                                
                                                <ALink id="filter-price" className="filter-price" href={{ query: { ...query, min_price: priceRange.min ? priceRange.min.toFixed(2) : 0, max_price: priceRange.max ? priceRange.max.toFixed(2) : 1 } }}></ALink>

                                                {
                                                    (priceRange.min !== 0 || priceRange.max !== 1000) &&
                                                    <span className="text-xs text-gray ml-2 clear-price" onClick={ clearPrice }>Clear</span>
                                                }
                                            </a>
                                        </h3>

                                        <div ref={ setCollapsibleElement }>
                                            <div className="widget-body pb-0 mt-3">
                                                <svg width="325" height="25" viewBox="0 0 325 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <rect x="315" y="23" width="12" height="2" rx="1" fill="#1F1F1F"/>
                                                    <rect x="300" y="22" width="12" height="3" rx="1" fill="#1F1F1F"/>
                                                    <rect x="285" y="22" width="12" height="3" rx="1" fill="#1F1F1F"/>
                                                    <rect x="270" y="22" width="12" height="3" rx="1" fill="#1F1F1F"/>
                                                    <rect x="255" y="14" width="12" height="11" rx="1" fill="#1F1F1F"/>
                                                    <rect x="240" y="16" width="12" height="9" rx="1" fill="#1F1F1F"/>
                                                    <rect x="225" y="8" width="12" height="17" rx="1" fill="#1F1F1F"/>
                                                    <rect x="210" y="11" width="12" height="14" rx="1" fill="#1F1F1F"/>
                                                    <rect x="195" y="14" width="12" height="11" rx="1" fill="#1F1F1F"/>
                                                    <rect x="180" y="18" width="12" height="7" rx="1" fill="#1F1F1F"/>
                                                    <rect x="165" y="20" width="12" height="5" rx="1" fill="#1F1F1F"/>
                                                    <rect x="150" y="14" width="12" height="11" rx="1" fill="#1F1F1F"/>
                                                    <rect x="135" y="8" width="12" height="17" rx="1" fill="#1F1F1F"/>
                                                    <rect x="120" y="18" width="12" height="7" rx="1" fill="#1F1F1F"/>
                                                    <rect x="105" y="11" width="12" height="14" rx="1" fill="#1F1F1F"/>
                                                    <rect x="90" y="14" width="12" height="11" rx="1" fill="#1F1F1F"/>
                                                    <rect x="75" y="11" width="12" height="14" rx="1" fill="#1F1F1F"/>
                                                    <rect x="60" y="4" width="12" height="21" rx="1" fill="#1F1F1F"/>
                                                    <rect x="45" y="11" width="12" height="14" rx="1" fill="#1F1F1F"/>
                                                    <rect x="30" y="8" width="12" height="17" rx="1" fill="#1F1F1F"/>
                                                    <rect x="15" y="2" width="12" height="23" rx="1" fill="#1F1F1F"/>
                                                    <rect width="12" height="25" rx="1" fill="#1F1F1F"/>
                                                </svg>
                                                <form action="#">
                                                    <div className="price-slider-wrapper">
                                                        {/* <InputRange
                                                            maxValue={ 1000 }
                                                            minValue={ 0 }
                                                            step={ 1 }
                                                            value={ priceRange }
                                                            onChange={ onChangePriceRange } /> */}
                                                    </div>

                                                    <div
                                                        className="filter-price-action grid grid-cols-2 gap-4">
                                                        <div className="filter-price-text flex flex-col border-2 rounded-sm pl-2 pr-2 pt-1 pb-1">
                                                            <span className="min-price text-xs">min</span>
                                                            <input type="number" className="bg-transparent outline-none text-gray" min="0" max="1000" value={ priceRange.min ? priceRange.min : 0 } onChange={ changeMinCount } style={{ height: '25px' }}/>
                                                        </div>

                                                        <div className="filter-price-text flex flex-col border-2 rounded-sm pl-2 pr-2 pt-1 pb-1">
                                                            <span className="max-price text-xs">max</span>
                                                            <input type="number" className="bg-transparent outline-none text-gray" min="0" max="1000" value={ priceRange.max ? priceRange.max : 1 } onChange={ changeMaxCount } style={{ height: '25px' }}/>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </>
                                ) }
                        </SlideToggle>
                    </div>

                    <div className="widget widget-color">
                        <SlideToggle>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <>
                                    <h3 className="widget-title">
                                        <a className={ `capitalize d-flex items-center ${ toggleState === 'COLLAPSED' ? 'collapsed' : '' }` } href="#;">
                                            Color
                                            {
                                                toggleState === 'COLLAPSED' ?
                                                <i className="sicon-arrow-down" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                                :
                                                <i className="sicon-arrow-up" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                            }
                                            {
                                                query.colors &&
                                                <ALink className="text-xs text-gray ml-2" href={{ query: { ...query, colors: '' } }}>Clear</ALink>
                                            }
                                        </a>
                                    </h3>
                                    <div className="overflow-hidden" ref={ setCollapsibleElement }>
                                        <div className="widget-body pb-0">
                                            <ul className="config-swatch-list">
                                                <li className={`tooltip relative ${ containsAttrInUrl( 'colors', 'none' ) ? 'active' : '' }`}>
                                                    <ALink href={ { query: { ...query, colors: getUrlForAttrs( 'colors', 'none' ) } } } className="color-empty"
                                                        style={ { background: '#141414' } }
                                                    ></ALink>
                                                    <span className="tooltiptext tooltip-top">None</span>
                                                </li>
                                            
                                                {
                                                    colors.length > 0 && colors.map( ( item, index ) => (
                                                        <li className={ `tooltip relative ${ containsAttrInUrl( 'colors', item.name ) ? 'active' : '' }` } key={ `color-${ index }` }>
                                                            <ALink
                                                                href={ { query: { ...query, colors: getUrlForAttrs( 'colors', item.name ) } } }
                                                                style={ { background: `linear-gradient( 135deg, ${ item.value }88 0%, ${ item.value }88 50%, ${ item.value } 51%, ${ item.value } 100%)` } }
                                                                
                                                            ></ALink>
                                                            <span className="tooltiptext tooltip-top">{ item.name }</span>
                                                        </li>
                                                    ) )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) }
                        </SlideToggle>
                    </div>

                    <div className="widget widget-select">
                        <SlideToggle>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <>
                                    <h3 className="widget-title">
                                        <a className={ `capitalize d-flex items-center ${ toggleState === 'COLLAPSED' ? 'collapsed' : '' }` } href="#;">
                                            Rarity
                                            {
                                                toggleState === 'COLLAPSED' ?
                                                <i className="sicon-arrow-down" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                                :
                                                <i className="sicon-arrow-up" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                            }

                                            {
                                                query.rarities &&
                                                <ALink className="text-xs text-gray ml-2" href={{ query: { ...query, rarities: '' } }}>Clear</ALink>
                                            }
                                        </a>
                                    </h3>
                                    <div className="overflow-hidden" ref={ setCollapsibleElement }>
                                        <div className="widget-body pb-0">
                                            <ul className="config-input-list">
                                                {
                                                    rarities.length > 0 && rarities.map( ( item, index ) => (
                                                        <li className={ `${ containsAttrInUrl( 'rarities', item.name ) ? 'active' : '' } mb-2` } key={ `rarity-${ index }` }>
                                                            <ALink
                                                                href={ { query: { ...query, rarities: getUrlForAttrs( 'rarities', item.name ) } } } className="text-base"
                                                            >{ item.name }</ALink>
                                                        </li>
                                                    ) )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) }
                        </SlideToggle>
                    </div>

                    <div className="widget widget-select">
                        <SlideToggle>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <>
                                    <h3 className="widget-title">
                                        <a className={ `capitalize d-flex items-center ${ toggleState === 'COLLAPSED' ? 'collapsed' : '' }` } href="#;">
                                            Certification
                                            {
                                                toggleState === 'COLLAPSED' ?
                                                <i className="sicon-arrow-down" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                                :
                                                <i className="sicon-arrow-up" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                            }

                                            {
                                                query.certifications &&
                                                <ALink className="text-xs text-gray ml-2" href={{ query: { ...query, certifications: '' } }}>Clear</ALink>
                                            }
                                        </a>
                                    </h3>
                                    <div className="overflow-hidden" ref={ setCollapsibleElement }>
                                        <div className="widget-body pb-0">
                                            <ul className="config-input-list">
                                                {
                                                    certifications.length > 0 && certifications.map( ( item, index ) => (
                                                        <li className={ `${ containsAttrInUrl( 'certifications', item.name ) ? 'active' : '' } mb-2` } key={ `certifications-${ index }` }>
                                                            <ALink
                                                                href={ { query: { ...query, certifications: getUrlForAttrs( 'certifications', item.name ) } } } className="text-base"
                                                            >{ item.name }</ALink>
                                                        </li>
                                                    ) )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) }
                        </SlideToggle>
                    </div>

                    <div className="widget widget-select">
                        <SlideToggle>
                            { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                <>
                                    <h3 className="widget-title">
                                        <a className={ `capitalize d-flex items-center ${ toggleState === 'COLLAPSED' ? 'collapsed' : '' }` } href="#;">
                                            Series
                                            {
                                                toggleState === 'COLLAPSED' ?
                                                <i className="sicon-arrow-down" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                                :
                                                <i className="sicon-arrow-up" onClick={ ( e ) => { e.preventDefault(), onToggle() } }></i>
                                            }

                                            {
                                                query.series &&
                                                <ALink className="text-xs text-gray ml-2" href={{ query: { ...query, series: '' } }}>Clear</ALink>
                                            }
                                        </a>
                                    </h3>
                                    <div className="overflow-hidden" ref={ setCollapsibleElement }>
                                        <div className="widget-body pb-0">
                                            <ul className="config-input-list">
                                                {
                                                    series.length > 0 && series.map( ( item, index ) => (
                                                        <li className={ `${ containsAttrInUrl( 'series', item.name ) ? 'active' : '' } mb-2` } key={ `series-${ index }` }>
                                                            <SlideToggle>
                                                                { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                                                                    <>
                                                                        <div className="widget">
                                                                            <h3 className="widget-title">
                                                                                <a
                                                                                    href="#"
                                                                                    className={ `capitalize text-gray text-base sub-text ${ toggleState === 'COLLAPSED' ? 'collapsed' : '' }` }
                                                                                    onClick={ ( e ) => { e.preventDefault(), onToggle() } }
                                                                                >
                                                                                    { item.name }
                                                                                    {
                                                                                        toggleState === 'COLLAPSED' ?
                                                                                        <i className="sicon-arrow-down"></i>
                                                                                        :
                                                                                        <i className="sicon-arrow-up"></i>
                                                                                    }
                                                                                </a>
                                                                            </h3>
                                                                            <div className="overflow-hidden" ref={ setCollapsibleElement }>
                                                                                <div className="widget-body pb-0">
                                                                                    <ul className="config-input-list sub-list">
                                                                                        {
                                                                                            item.subseries.length > 0 && item.subseries.map( ( subItem, index ) => (
                                                                                                <li className={ `${ containsAttrInUrl( 'series', subItem.name ) ? 'active text-brown1' : '' } mb-2` } key={ `subseries-${ index }` }>
                                                                                                    <ALink
                                                                                                        href={ { query: { ...query, series: getUrlForAttrs( 'series', subItem.name ) } } } className="text-md text-gray"
                                                                                                    >{ subItem.name }</ALink>
                                                                                                </li>
                                                                                            ) )
                                                                                        }
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                ) }
                                                            </SlideToggle>
                                                        </li>
                                                    ) )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) }
                        </SlideToggle>
                    </div>
                </div>
            </nav>
        </>
    )
}