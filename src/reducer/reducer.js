import actionTypes from "./actionTypes"

const initialState = {
    modal: false,
    backdrop: false,
    isLoggedIn: false,
    spinner: false,
    toggleNav: false
}

const reducer = (state = initialState, action) => {


    switch(action.type) {

        case actionTypes.activateNav:
            return {
                ...state,
                toggleNav: true,
                backdrop: true
            }

        case actionTypes.activateModal:
            return {
                ...state,
                modal: true,
                backdrop: true
            }

        case actionTypes.deactivateModal:
            return {
                ...state,
                modal: false,
                backdrop: false,
                spinner: false
            }

        case actionTypes.loggedIn:
            return {
                ...state,
                isLoggedIn: true
            }

        case actionTypes.loggedOut:
            return {
                ...state,
                isLoggedIn: false
            }

        case actionTypes.activateBackdrop:
            return {
                ...state,
                backdrop: true
            }
        
        case actionTypes.deactivateBackdrop:
            if (state.toggleNav) {
                return {
                    ...state,
                    toggleNav: false,
                    backdrop: false
                }
            }
            else if (state.modal){
                return {
                    ...state,
                    modal: false,
                    backdrop: false
                }
            } else {
                return {
                    ...state,
                    backdrop: false,
                }
            }

        case actionTypes.activateSpinner:
            console.log('triggered')
            return {
                ...state,
                spinner: true
            }

        case actionTypes.deactivateSpinner:
            return {
                ...state,
                spinner: false
            }

        default:
            return state;

    }
    
}

export default reducer;
