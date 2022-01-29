
import Helmet from "react-helmet";
import { Provider, useStore } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import Layout from '../components/layout';
import { wrapper } from "../../store/index";

import "../styles/tailwind.css";
import "../styles/custom.scss";
import "../../public/sass/style.scss";

const MyApp = ({ Component, pageProps }) => {
	const store : any = useStore();
	
	return (
		<Provider store={store}>
            <PersistGate
                persistor={store.__persistor}
                loading={<div className="loading-overlay">
                    <div className="bounce-loader">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>}>
					
                <Helmet>
                    <meta charSet="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <title>React eCommerce Template</title>

                    <meta name="keywords" content="React Template" />
                    <meta name="description" content="React eCommerce Template" />
                    <meta name="author" content="SW-THEMES" />

                    <link rel="icon" href="/images/favicon.png" />
                    <link rel="stylesheet" type="text/css" href="/vendor/fontawesome-free/css/all.min.css" />
                    <link rel="stylesheet" type="text/css" href="/vendor/simple-line-icons/css/simple-line-icons.min.css" />
                </Helmet>

                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider >
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

export default wrapper.withRedux(MyApp);