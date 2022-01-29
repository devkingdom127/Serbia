import React, { useEffect, useState } from "react";

// Custom Component
import ALink from "../components/common/ALink";
import Carousel from "../components/features/carousel";
import ProductOne from "../components/features/products/product-one";
import Container from "../components/common/container";

// Serve Url
import Server, { baseUrl } from "../../server/index";

function Home () {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    Server.get(`${baseUrl}/products`)
      	.then((response) => {
			const temp: any = response.data;

			setProducts(temp);
			setFilteredProducts(
			temp.filter((item) => item.category.name == 'Credits')
			);
		}).catch((error) => ({ error: JSON.stringify(error) }));
  }, []);

  return (
    <main className="home" style={{ background: 'linear-gradient(180deg, #222, #151515)' }}>
		<Container>
			<div className="flex items-end mt-10 mb-5">
				<div className="text-3xl font-bold mr-2 pl-2">Credits</div>
				<ALink href={{ pathname: '/shop', query: { category: 'credits' } }} className="underline">
					{"View All"}
				</ALink>
			</div>

			<Carousel className="mb-5 mt-5">
				{
					filteredProducts && filteredProducts.map((card, index) => {
						return <ProductOne item={card} key={index}/>;
					})
				}
			</Carousel>

			<div className="flex items-end mb-5 mt-7 pl-2 pt-4">
				<div className="text-3xl font-extrabold mr-2">
					{"Recently Listed"}
				</div>
				
				<ALink href={{ pathname: '/shop', query: { sortBy: 'newest' } }} className="underline">
					{"View All"}
				</ALink>
			</div>

			<Carousel className="mb-5 mt-5">
				{
					products && products.slice(0, 15).map((card, index) => {
						return <ProductOne item={card} key={index}/>;
					})
				}
			</Carousel>

			<div className="mb-10 pb-10"></div>
		</Container>
    </main>
  );
};

export default Home;
