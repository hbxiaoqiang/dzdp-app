import { get } from '../../utils/request';

export const FETCH_DATA = 'FETCH DATA'

export default store => next => action => {
    const callAPI = action[FETCH_DATA];
    if(typeof callAPI === 'undefined'){
        return next(action)
    }

    const {endPoint, schema, types } = callAPI;
    if(typeof endPoint !== 'string'){
        throw new Error("endponit必须是一个字符串");
    }

    if(!schema) {
        throw new Error("schema必须是存在");
    }

    if(!Array.isArray(types) && types.length !== 3){
        throw new Error('需要包含3个anction type 的数组');
    }

    if(!types.every(type => typeof type === 'string')){
        throw new Error('type的每一项必须是字符串')
    }
    
    const actionWith = data => {
        const finalAction = {...action, ...data}
        delete finalAction[FETCH_DATA];
        return finalAction;
    }

    const [requestType,successType, failureType] = types;
    
    next(actionWith({type:requestType}));
    return fetchData(endPoint, schema).then(
        response => next(actionWith({
            type:successType,
            response
        })),
        error => next(actionWith({
            type:failureType,
            error:error.message || '出错！'
        }))
    )
}

const fetchData = (endPoint , schema) =>{
    return get(endPoint).then(data =>{
        return normalizeData(data, schema);
    })
}

const normalizeData = (data, schema) => {
    const {id, name} = schema;
    let kvObj = {};
    let ids = [];
    if(Array.isArray(data)){
        data.forEach(item => {
            kvObj[item[id]] = item
            ids.push(item[id])
        })
    } else {
        kvObj[data[id]] = data
        ids.push(data[id])
    }
    
    return {
        [name]:kvObj,
        ids
    }
}