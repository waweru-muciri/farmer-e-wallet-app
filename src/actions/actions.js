import * as actionTypes from "../reducers/actionTypes";

export function editTransaction(transaction) {
    return {
        type: actionTypes.EDIT_APPOINTMENT,
        transaction,
    };
}

export function addTransaction(transaction) {
    return {
        type: actionTypes.ADD_APPOINTMENT,
        transaction,
    };
}

export function deleteTransaction(transactionId) {
    return {
        type: actionTypes.DELETE_APPOINTMENT,
        transactionId,
    };
}

export function transactionsFetchDataSuccess(transactions) {
    return {
        type: actionTypes.APPOINTMENTS_FETCH_DATA_SUCCESS,
        transactions,
    };
}

export function editLoan(loan) {
    return {
        type: actionTypes.EDIT_SERVICE,
        loan,
    };
}

export function addLoan(loan) {
    return {
        type: actionTypes.ADD_SERVICE,
        loan,
    };
}

export function deleteLoan(loanId) {
    return {
        type: actionTypes.DELETE_SERVICE,
        loanId,
    };
}


export function loansFetchDataSuccess(loans) {
    return {
        type: actionTypes.SERVICES_FETCH_DATA_SUCCESS,
        loans,
    };
}

export function editWithdrawal(withdrawal) {
    return {
        type: actionTypes.EDIT_WITHDRAWAL,
        withdrawal,
    };
}

export function addWithdrawal(withdrawal) {
    return {
        type: actionTypes.ADD_WITHDRAWAL,
        withdrawal,
    };
}

export function deleteWithdrawal(withdrawalId) {
    return {
        type: actionTypes.DELETE_WITHDRAWAL,
        withdrawalId,
    };
}

export function withdrawalsFetchDataSuccess(withdrawals) {
    return {
        type: actionTypes.WITHDRAWALS_FETCH_DATA_SUCCESS,
        withdrawals,
    };
}

export function editProduct(product) {
    return {
        type: actionTypes.EDIT_PRODUCT,
        product,
    };
}

export function addProduct(product) {
    return {
        type: actionTypes.ADD_PRODUCT,
        product,
    };
}

export function deleteProduct(productId) {
    return {
        type: actionTypes.DELETE_PRODUCT,
        productId,
    };
}


export function productsFetchDataSuccess(products) {
    return {
        type: actionTypes.PRODUCTS_FETCH_DATA_SUCCESS,
        products,
    };
}
export function editAccount(account) {
    return {
        type: actionTypes.EDIT_ACCOUNT,
        account,
    };
}

export function addAccount(account) {
    return {
        type: actionTypes.ADD_ACCOUNT,
        account,
    };
}

export function deleteAccount(accountId) {
    return {
        type: actionTypes.DELETE_ACCOUNT,
        accountId,
    };
}


export function accountsFetchDataSuccess(accounts) {
    return {
        type: actionTypes.ACCOUNTS_FETCH_DATA_SUCCESS,
        accounts,
    };
}

export function editDeposit(deposit) {
    return {
        type: actionTypes.EDIT_DEPOSIT,
        deposit,
    };
}

export function addDeposit(deposit) {
    return {
        type: actionTypes.ADD_DEPOSIT,
        deposit,
    };
}

export function deleteDeposit(depositId) {
    return {
        type: actionTypes.DELETE_DEPOSIT,
        depositId,
    };
}


export function depositsFetchDataSuccess(deposits) {
    return {
        type: actionTypes.DEPOSITS_FETCH_DATA_SUCCESS,
        deposits,
    };
}

