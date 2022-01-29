// Custom Component
import ProductsGrid from "../../components/partials/shop/product-grid";
import ShopSidebar from "../../components/partials/shop/shop-sidebar";

function Shop () {
    return (
        <main className="shop" style={ { background: '#202020' } }>
            <div className="grid grid-cols-12 grid-rows-1 grid-flow-col gap-0">
                <ShopSidebar />

                <div className="col-span-12 lg:col-span-9 mt-1.5 mr-1 lg:ml-0 ml-1 mb-10 pb-3">
                    <ProductsGrid  />
                </div>
            </div>
        </main>
    )
}

export default Shop;