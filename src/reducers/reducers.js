import * as actionTypes from "./actionTypes";

export function loans(state = [], action) {
    switch (action.type) {
        case actionTypes.SERVICES_FETCH_DATA_SUCCESS:
            return action.loans;

        case actionTypes.EDIT_SERVICE:
            return state.map((loan) =>
                loan._id === action.loan._id
                    ? Object.assign({}, loan, action.loan)
                    : loan
            );

        case actionTypes.ADD_SERVICE:
            return [...state, action.loan];

        case actionTypes.DELETE_SERVICE:
            return state.filter((loan) => loan._id !== action.loanId);
        default:
            return state;
    }
}

export function products(state = [], action) {
    switch (action.type) {
        case actionTypes.PRODUCTS_FETCH_DATA_SUCCESS:
            return action.products;

        case actionTypes.EDIT_PRODUCT:
            return state.map((product) =>
                product._id === action.product._id
                    ? Object.assign({}, product, action.product)
                    : product
            );

        case actionTypes.ADD_PRODUCT:
            return [...state, action.product];

        case actionTypes.DELETE_PRODUCT:
            return state.filter((product) => product._id !== action.productId);
        default:
            return state;
    }
}

export function withdrawals(state = [], action) {
    switch (action.type) {
        case actionTypes.WITHDRAWALS_FETCH_DATA_SUCCESS:
            return action.withdrawals;

        case actionTypes.EDIT_WITHDRAWAL:
            return state.map((withdrawal) =>
                withdrawal._id === action.withdrawal._id
                    ? Object.assign({}, withdrawal, action.withdrawal)
                    : withdrawal
            );

        case actionTypes.ADD_WITHDRAWAL:
            return [...state, action.withdrawal];

        case actionTypes.DELETE_WITHDRAWAL:
            return state.filter((withdrawal) => withdrawal._id !== action.withdrawalId);
        default:
            return state;
    }
}

export function transactions(state = [], action) {
    switch (action.type) {
        case actionTypes.APPOINTMENTS_FETCH_DATA_SUCCESS:
            return action.transactions;

        case actionTypes.EDIT_APPOINTMENT:
            return state.map((transaction) =>
                transaction._id === action.transaction._id
                    ? Object.assign({}, transaction, action.transaction)
                    : transaction
            );

        case actionTypes.ADD_APPOINTMENT:
            return [...state, action.transaction];

        case actionTypes.DELETE_APPOINTMENT:
            return state.filter((transaction) => transaction._id !== action.transactionId);

        default:
            return state;
    }
}

export function userProfile(state = {}, action) {
    switch (action.type) {
        case actionTypes.USER_PROFILE_FETCH_DATA_SUCCESS:
            return action.userProfile;

        case actionTypes.EDIT_USER_PROFILE:
            return state.map((userProfile) =>
                userProfile._id === action.userProfile._id
                    ? Object.assign({}, userProfile, action.userProfile)
                    : userProfile
            );

        case actionTypes.ADD_USER_PROFILE:
            return [...state, action.userProfile];

        case actionTypes.DELETE_USER_PROFILE:
            return state.filter((userProfile) => userProfile._id !== action.userProfileId);
        default:
            return state;
    }
}

export function deposits(state = [], action) {
    switch (action.type) {
        case actionTypes.DEPOSITS_FETCH_DATA_SUCCESS:
            return action.deposits;

        case actionTypes.EDIT_DEPOSIT:
            return state.map((deposit) =>
                deposit._id === action.deposit._id
                    ? Object.assign({}, deposit, action.deposit)
                    : deposit
            );

        case actionTypes.ADD_DEPOSIT:
            return [...state, action.deposit];

        case actionTypes.DELETE_DEPOSIT:
            return state.filter((deposit) => deposit._id !== action.depositId);
        default:
            return state;
    }
}
