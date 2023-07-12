import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebaseConfig';
import { doc, getDocs, deleteDoc, collection, updateDoc, addDoc } from "firebase/firestore";
import {
  addTransaction, transactionsFetchDataSuccess, deleteTransaction,
  editTransaction, editLoan, loansFetchDataSuccess, deleteWithdrawal, deleteProduct,
  productsFetchDataSuccess, withdrawalsFetchDataSuccess, addWithdrawal, addProduct,
  deleteAccount, accountsFetchDataSuccess, addAccount, editProduct, editAccount,
  editWithdrawal, editDeposit, addDeposit, depositsFetchDataSuccess, deleteDeposit
} from '../actions/actions';
import { loans, transactions, products, withdrawals, accounts, deposits } from "./reducers"

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialAuthState = { isLoggedIn: false };


export const login = (user) => ({
  type: LOGIN,
  user,
});

export const logout = (user) => ({
  type: LOGIN,
});

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.user };
    case LOGOUT:
      AsyncStorage.removeItem('@loggedInUserID:id');
      AsyncStorage.removeItem('@loggedInUserID:key');
      AsyncStorage.removeItem('@loggedInUserID:password');
      return { ...state, isLoggedIn: false, user: {} };
    default:
      return state;
  }
}

export function handleItemFormSubmit(data, url) {
  if (typeof data._id === "undefined") {
    delete data._id;
  }
  return async (dispatch) => {
    typeof data._id !== "undefined"
      ? //send post request to edit the item
      updateDoc(doc(db, url, data._id), data)
        .then((docRef) => {
          let modifiedObject = Object.assign(
            {},
            data,
          );
          switch (url) {
            case "transactions":
              dispatch(editTransaction(modifiedObject));
              break;
            case "loans":
              dispatch(editLoan(modifiedObject));
              break;
            case "products":
              dispatch(editProduct(modifiedObject));
              break;
            case "accounts":
              dispatch(editAccount(modifiedObject));
              break;
            case "withdrawals":
              dispatch(editWithdrawal(modifiedObject));
              break;
            case "deposits":
              dispatch(editDeposit(modifiedObject));
              break;
          }
        })
        .catch((error) => {
          console.log("Error updating document => ", error.response);
        }).finally(() => {
        })
      : //send post to create item
      addDoc(collection(db, url), data)
        .then((docRef) => {
          let addedItem = Object.assign({}, data, {
            _id: docRef.id,
          });
          switch (url) {
            case "transactions":
              dispatch(addTransaction(addedItem));
              break;
            case "loans":
              dispatch(editLoan(addedItem));
              break;
            case "withdrawals":
              dispatch(addWithdrawal(addedItem));
              break;
            case "products":
              dispatch(addProduct(addedItem));
              break;
            case "accounts":
              dispatch(addAccount(addedItem));
              break;
            case "deposits":
              dispatch(addDeposit(addedItem));
              break;
          }

        })
        .catch((error) => {
          console.log("Error adding document => ", error.response);
        }).finally(() => {
        });
  }
}


export function fetchDataFromUrl(url) {
  return async (dispatch) => {
    try {
      const snapshot = await getDocs(collection(db, url))
      const fetchedItems = snapshot.docs.map((doc) => {
        const fetchedObject = Object.assign({}, doc.data(),
          {
            _id: doc.id,
          }
        );
        return fetchedObject;
      });
      switch (url) {
        case "transactions":
          dispatch(transactionsFetchDataSuccess(fetchedItems));
          break;
        case "loans":
          dispatch(loansFetchDataSuccess(fetchedItems));
          break;
        case "withdrawals":
          dispatch(withdrawalsFetchDataSuccess(fetchedItems));
          break;
        case "products":
          dispatch(productsFetchDataSuccess(fetchedItems));
          break;
        case "accounts":
          dispatch(accountsFetchDataSuccess(fetchedItems));
          break;
        case "deposits":
          dispatch(depositsFetchDataSuccess(fetchedItems));
          break;
      }
    } catch (error) {
    }
  }
}

export function handleDelete(itemId, url) {
  //send request to server to delete selected item
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, url, itemId))
      switch (url) {
        case "transactions":
          dispatch(deleteTransaction(itemId));
          break;
        case "loans":
          dispatch(editLoan(itemId));
          break;
        case "withdrawals":
          dispatch(deleteWithdrawal(itemId));
          break;
        case "products":
          dispatch(deleteProduct(itemId));
          break;
        case "accounts":
          dispatch(deleteAccount(itemId));
          break;
        case "deposits":
          dispatch(deleteDeposit(itemId));
          break;
      }
    }
    catch (error) {
      console.log("Failed to Delete Document!", error);
    }
  }
}

const AppReducer = combineReducers({
  auth,
  transactions,
  loans,
  products,
  withdrawals,
  accounts,
  deposits,
});

export default AppReducer;
