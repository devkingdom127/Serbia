import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Import Custom Component
import Carousel from "../../components/features/carousel";
import ProductDetail from "../../components/partials/product/product-detail";
import ProductOne from "../../components/features/products/product-one";
import OtherListings from "../../components/partials/product/other-listings";

// Import Server
import server, {  baseUrl } from "../../../server";

function Product () {
    const productId = useRouter().query.id;
    const [ product, setProduct ] = useState({});
    const [ relatedProducts, setRelatedProducts ] = useState([]);
    const [ otherProducts, setOtherProducts ] = useState([]);
    const [ colors, setColors ] = useState([]);
    const [ certifications, setCertifications ] = useState([]);

    useEffect(()=>{
        server.get(`${baseUrl}/product/${ productId }`).then((response) => {
            const temp: any = response.data;
            setProduct( temp.product );
            setRelatedProducts( temp.relatedProducts );
            setOtherProducts( temp.otherProducts );
            setColors(temp.colors.data);
            setCertifications(temp.certifications.data);
        }).catch((error) => ({ error: JSON.stringify(error) }));
    }, [productId])

    return (
        <main className="product" style={ { background: '#202020' } }>
            <div className="grid grid-cols-12 grid-rows-1 grid-flow-col gap-0">
                <div className="col-span-12 lg:col-span-8 xl:col-span-9 mt-1.5 lg:ml-0 mb-1.5">
                    <ProductDetail 
                        product={ product } 
                        colors={ colors } 
                        certifications= { certifications } 
                        relatedProducts = { relatedProducts }
                    />

                    <div className="related-products overflow-hidden ml-0.5 pb-10">
                        <h2 className="text-2xl font-extrabold mr-2 mt-5 pl-7 pb-4">Similar Items</h2>

                        <Carousel className="mb-5 mt-5" settings={ 6 }>
                            {
                                relatedProducts.length > 0 && relatedProducts.map((card, index) => {
                                    return <ProductOne item={card} key={index}/>;
                                })
                            }
                        </Carousel>
                    </div>
                </div>

                <OtherListings otherProducts = { otherProducts } />
            </div>
        </main>
    )
}

export default Product;