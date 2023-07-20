import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db } from '../firebaseConfig';
import { doc, getDocs, deleteDoc, collection, updateDoc, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addTransaction, transactionsFetchDataSuccess, deleteTransaction,
  editTransaction, editLoan, loansFetchDataSuccess, deleteWithdrawal, deleteProduct,
  productsFetchDataSuccess, withdrawalsFetchDataSuccess, addWithdrawal, addProduct, editProduct,
  editWithdrawal, editDeposit, addDeposit, depositsFetchDataSuccess, deleteDeposit, usersFetchDataSuccess
} from '../actions/actions';
import { loans, transactions, products, withdrawals, userProfile, deposits, users } from "./reducers"

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USER_PROFILE = 'USER_PROFILE';

const initialAuthState = { isLoggedIn: false };


export const login = (user) => ({
  type: LOGIN,
  user,
});

export const setUserProfile = (userProfile) => ({
  type: USER_PROFILE,
  userProfile,
});

export const logout = (user) => ({
  type: LOGIN,
});

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, user: action.user };
    case USER_PROFILE:
      return { ...state, userProfile: action.userProfile };
    case LOGOUT:
      return async () => {
        await AsyncStorage.removeItem('@loggedInUserID:id');
        await AsyncStorage.removeItem('@loggedInUserID:key');
        await AsyncStorage.removeItem('@loggedInUserID:password');
        return { ...state, isLoggedIn: false, user: {}, userProfile: {} };
      }
    default:
      return state;
  }
}

export function updateUserProfile(userId, userData) {
  return async (dispatch) => {
    //send post request to edit the item
    updateDoc(doc(db, "users", userId), userData)
      .then((docRef) => {
        let modifiedObject = Object.assign(
          {},
          data,
        );
        dispatch(setUserProfile(modifiedObject));
      })
  }
}

export async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), "product_images");
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}

export function handleItemFormSubmit(data, url) {

  if (typeof data._id === "undefined") {
    delete data._id;
  }
  return async (dispatch) => {
    const user_id = await AsyncStorage.getItem("@loggedInUserID:id")
    typeof data._id !== "undefined"
      ? //send post request to edit the item
      updateDoc(doc(db, "users", user_id, url, data._id), data)
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
      addDoc(url == "products" ? collection(db, "products") : collection(db, "users", user_id, url), data)
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
      const user_id = await AsyncStorage.getItem("@loggedInUserID:id")
      let urlToFetchFrom;
      if (url == "products") {
        urlToFetchFrom = "products"
      }
      else if (url == "users") {
        urlToFetchFrom = "users"
      }
      else {
        urlToFetchFrom = `users/${user_id}/${url}`
      }
      const snapshot = await getDocs(collection(db, urlToFetchFrom))
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
        case "users":
          dispatch(usersFetchDataSuccess(fetchedItems));
          break;
        case "withdrawals":
          dispatch(withdrawalsFetchDataSuccess(fetchedItems));
          break;
        case "products":
          dispatch(productsFetchDataSuccess(fetchedItems));
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
      const user_id = await AsyncStorage.getItem("@loggedInUserID:id")
      await deleteDoc(doc(db, "users", user_id, url, itemId))
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
  deposits,
  users,
});

export default AppReducer;
