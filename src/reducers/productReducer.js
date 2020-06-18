export const initialState = {
    data:{},
    temp:'yes'
}

export const productReducer =(state=initialState,action)=>{
    switch(action.type){
        case "PRODUCTS":
            return{...state,
            //data: action.payload,
            temp: 'no'};
            default:
                return{...state};
    }
}
export default productReducer;
