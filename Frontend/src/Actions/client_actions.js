import axios from "axios";
import { checkSession } from "./auth_actions";

const host = "http://localhost:8080";
const client_url = host + "/api/client"
const fetchUrl = host + "/api/client/getAllClients";
const updateUrl = host + "/api/client/update";
const createUrl = host + "/api/client/create";


export function createClient(client, dispatch) {
    if(!checkSession(dispatch)) {
        return;
    }
    dispatch({
        type: "CREATE_CLIENT_PENDING"
    })
    let accessToken = localStorage.getItem('accessToken');
    axios.post(createUrl, client, {
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(res => {
        let createdClient = {...res.data};
        console.log("create client successfully", createdClient);
        dispatch({
            type: 'CREATE_CLIENT_SUCCESS',
            payload: createdClient
        });
    })
    .catch(e => {
        console.log("failed in creating client", e.message);
        dispatch({
            type: 'CREATE_CLIENT_FAILURE'
        });
    });
}

export function updateClient(client, dispatch) {
    if(!checkSession(dispatch)) {
        return;
    }
    dispatch({
        type: "UPDATE_CLIENT_PENDING"
    })
    let accessToken = localStorage.getItem('accessToken');
    axios.post(updateUrl, client, {
        headers: {
            'Content-Type':'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(res => {
        let updatedClient = {...res.data};
        console.log("update client successfully", updatedClient);
        dispatch({
            type: 'UPDATE_CLIENT_SUCCESS',
            payload: updatedClient
        });
    })
    .catch(e => {
        console.log("failed in updating client", e.message);
        dispatch({
            type: 'UPDATE_CLIENT_FAILURE'
        });
    });
}

const fetchRequest = () => {
    return {
        type: 'FETCH_CLIENT_PENDING'
    }
}

const fetchSuccess = (clientList) => {
    return {
        type: 'FETCH_CLIENT_SUCCESS',
        payload: clientList,
    }
}

const fetchFailure = () => {
    return {
        type: 'FETCH_CLIENT_FAILURE'
    }
}

export function fetchClients(dispatch) {
    dispatch(fetchRequest());
    if(!checkSession(dispatch)) {
        dispatch(fetchFailure());
    }
    let accessToken = localStorage.getItem('accessToken');
    axios.get(fetchUrl, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(res => {
        let clientList = res.data;
        console.log(res.data);
        console.log("Fetched the client info successfully!", clientList);
        dispatch(fetchSuccess(clientList));
    })
    .catch(e => {
        console.error("Failed in fetching user data", e.message);
        dispatch(fetchFailure());
    })
}