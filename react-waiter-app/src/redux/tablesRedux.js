import { API_URL } from "../config";

// selectors
export const getAllTables = ({ tables }) => tables.data;
export const getTableLoadingState = ({ tables }) => tables.loading;
export const getTableById = ({ tables }, id) => tables.data.find(table => table.id === id);
export const getTableUpdateError = ({ tables }) => tables.error;

// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE_ON_SERVER = createActionName('UPDATE_TABLE_ON_SERVER');
const UPDATE_ERROR = createActionName('UPDATE_ERROR');
const REMOVE_TABLE_ON_SERVER = createActionName('REMOVE_TABLE_ON_SERVER');

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
    return (dispatch) => {
        fetch(`${API_URL}/tables`)
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    };
};
export const updateTableOnServer = payload => ({ type: UPDATE_TABLE_ON_SERVER, payload });
export const updateError = error => ({ type: UPDATE_ERROR, error });
export const updateTableRequest = (updatedTable) => {
    return(dispatch) => {
        const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: updatedTable.id,
              status: updatedTable.status,
              peopleAmount: updatedTable.peopleAmount,
              maxPeopleAmount: updatedTable.maxPeopleAmount,
              bill: updatedTable.bill,
            }),
          };
          
          fetch(`${API_URL}/tables/${updatedTable.id}`, options)
                .then(() => dispatch(updateTableOnServer(updatedTable)))
                .catch(error => dispatch(updateError(error)));
    };
};
export const removeTableOnServer = payload => ({ type: REMOVE_TABLE_ON_SERVER, payload });
export const removeTableRequest = (selectedTableId) => {
    return(dispatch) => {
        const options = {
            method: 'DELETE'
        };

        fetch(`${API_URL}/tables/${selectedTableId}`, options)
            .then(() => dispatch(removeTableOnServer(selectedTableId)))
            .catch(error => dispatch(updateError(error)));
    };
};


const tablesReducer = (statePart = { data: [], loading: true, error: null }, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
        return { data: action.payload, loading: false, error: null  };
    case UPDATE_TABLE_ON_SERVER:
        return { data: statePart.data.map(table => table.id === action.payload.id ? action.payload : table), loading: false, error: null  };
    case UPDATE_ERROR:
        return { ...statePart, error: action.error, loading: false };
    case REMOVE_TABLE_ON_SERVER:
        return { data: statePart.data.filter(table => table.id !== action.payload), loading: false};
    default:
        return statePart;
  };
};
export default tablesReducer;