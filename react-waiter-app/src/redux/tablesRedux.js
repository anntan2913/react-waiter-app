
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

// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const fetchTables = () => {
    return (dispatch) => {
        fetch("http://localhost:3131/api/tables")
            .then(res => res.json())
            .then(tables => dispatch(updateTables(tables)));
    };
};
export const updateTableOnServer = payload => ({ type: UPDATE_TABLE_ON_SERVER, payload});
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
          
          fetch(`http://localhost:3131/api/tables/${updatedTable.id}`, options)
                .then(() => dispatch(updateTableOnServer(updatedTable)))
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
    default:
        return statePart;
  };
};
export default tablesReducer;