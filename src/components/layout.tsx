import { ToastContainer } from 'react-toastify';
import "react-multi-carousel/lib/styles.css";
import 'react-toastify/dist/ReactToastify.min.css';

// Custom Component
import Header from "./common/header";
import MobileMenu from "./common/mobile-menu";

function Layout({ children }) {
    return (
        <div className="page-wrapper min-h-screen text-white flex flex-col tracking-wide overflow-hidden" style={ { background: '#1f1f1f' } }>
            <Header />

            {children}

            <ToastContainer
                autoClose={3000}
                className="toast-container"
                position="bottom-right"
                closeButton={false}
                hideProgressBar={true}
                newestOnTop={true}
                draggable={false}
            />

            <MobileMenu />
        </div>
    )
}

export default Layout;