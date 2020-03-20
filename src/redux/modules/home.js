import url from '../../utils/url';
import FETCH_DATA from '../middleware/api';
import schema from '../modules/entities/products'
// actionType 内容
export const types = {
    FETCH_LIKES_REQUEST: 'HOME/FETCH_LIKES_REQUEST',
    FETCH_LIKES_SUCCESS: 'HOME/FETCH_LIKES_SUCCESS',
    FETCH_LIKES_FAILURE: 'HOME/FETCH_LIKES_FAILURE',
}

//action 的处理函数
export const actions = {
    loadLike:() => {
        return (dispatch, getState) => {
            const endPoint = url.getProductList(1,10);
            return dispatch(fetchLikes(endPoint))
        }
    }
    // loadLike: () => {
    //     return (dispatch, getState) => {
    //         dispatch(lickRequest())
    //         return get(url.getProductList(0, 10)).then(
    //             data => {
    //                 dispatch(lickSuccess(data));
    //             }, err => {
    //                 dispatch(lickFailure(err));
    //             }
    //         )
    //     }
    // }
}

const fetchLikes = endPoint => ({
    [FETCH_DATA]:{
        types: [
            types.FETCH_LIKES_REQUEST,
            types.FETCH_LIKES_SUCCESS,
            types.FETCH_LIKES_FAILURE
        ],
        endPoint,
        schema
    }
})

// dispatch 的 action
// const lickRequest = () => ({
//     type: types.FETCH_LIKES_REQUEST
// });

// const lickSuccess = (data) => ({
//     type: types.FETCH_LIKES_SUCCESS,
//     data
// });

// const lickFailure = (err) => ({
//     type: types.FETCH_LIKES_FAILURE,
//     err
// });

const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LIKES_REQUEST:
            break;
        case types.FETCH_LIKES_SUCCESS:
            break;
        case types.FETCH_LIKES_FAILURE:
            break;
        default:
            return state;
    }
}

export default reducer;