import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';

// Import Custom Component
import CartPopup from '../src/components/features/modal/add-to-cart-popup';

export const actionTypes = {
    AddToCart: "ADD_TO_CART",
    RemoveFromCart: "REMOVE_FROM_CART",
    RefreshStore: "REFRESH_STORE",
    UpdateCart: "UPDATE_CART",
};

const initialState = {
    cart: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AddToCart:
            const productTitle = action.payload.product.title;
            if (state.cart.findIndex(product => product.title === productTitle  && product.user.username === action.payload.product.user.username ) !== -1) {

                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product.title === productTitle && product.user.username === action.payload.product.user.username) {
                        cartAcc.push({ ...product, qty: parseInt(product.qty) + parseInt(action.qty), sum: product.amount * (parseInt(product.qty) + parseInt(action.qty)) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }

                    return cartAcc
                }, [])

                return { ...state, cart }
            }
        
            return {
                ...state,
                cart: [
                    ...state.cart,
                    {
                        ...action.payload.product,
                        qty: action.qty,
                        price: action.qty * action.payload.product.amount
                    }
                ]
            };

        case actionTypes.UpdateCart:
            return {
                ...state,
                cart: action.payload.products
            };

        case actionTypes.RemoveFromCart:
            let cart = state.cart.reduce((cartAcc, product) => {
                if (product.title !== action.payload.product.title || product.user.username !== action.payload.product.user.username) {
                    cartAcc.push(product);
                }

                return cartAcc;
            }, []);

            return { ...state, cart };

        case actionTypes.RefreshStore:
            return initialState

        default:
            return state;
    }
}

export const actions = {
    addToCart: (product, qty = 1) => ({ type: actionTypes.AddToCart, payload: { product }, qty }),
    removeFromCart: (product) => ({ type: actionTypes.RemoveFromCart, payload: { product } }),
    removeAllCarts: () => ({ type: actionTypes.RefreshStore, payload: {} }),
    updateCart: (products) => ({ type: actionTypes.UpdateCart, payload: { products } })
};

export function* cartSaga() {
    yield takeEvery(actionTypes.AddToCart, function* saga(e) {
        toast(<CartPopup product={e.payload.product} />);
    });
}

const persistConfig = {
    keyPrefix: "React-",
    key: "cart",
    storage
}

export default persistReducer(persistConfig, cartReducer);