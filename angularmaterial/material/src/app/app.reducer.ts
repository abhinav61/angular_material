export interface State {
    isLoading: boolean;
}
const intialState = {
  isLoading : false
};

export function appReducer(state= intialState,action){
    switch (action.type){
        case 'START_LOADING':
            return{
                isLoading:true
            };
        case 'STOP_LOADING':
            return{
                isLoading:false
            };
        default:
            return state;
    }
}