import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { takeEvery } from "redux-saga/effects";
import { toast } from 'react-toastify';

export const actionTypes = {
    RefreshStore: "REFRESH_STORE",
    UpdateUser: "UPDATE_USER",
};

const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UpdateUser:
            return {
                ...state,
                user: action.payload.user
            };

        case actionTypes.RefreshStore:
            return initialState

        default:
            return state;
    }
}

export const actions = {
    updateUser: (user) => ({ type: actionTypes.UpdateUser, payload: { user } })
};

// export function* cartSaga() {
//     yield takeEvery(actionTypes.AddToCart, function* saga(e) {
//         toast('User info updated successfully');
//     });
// }

const persistConfig = {
    keyPrefix: "React-",
    key: "user",
    storage
}

export default persistReducer(persistConfig, userReducer);