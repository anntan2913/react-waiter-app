// selectors
export const getTableStatus = ({ tableStatus }) => tableStatus;

// actions
const createActionName = actionName => `app/tableStatus/${actionName}`;
const UPDATE_TABLESTATUS = createActionName('UPDATE_TABLESTATUS');

// action creators
export const updateTableStatus = payload => ({ type: UPDATE_TABLESTATUS, payload });
export const fetchTableStatus = () => {
    return (dispatch) => {
        fetch("http://localhost:3131/api/tableStatus")
            .then(res => res.json())
            .then(tableStatus => dispatch(updateTableStatus(tableStatus)));
    };
};

const tableStatusReducer = (statePart = [],  action) => {
  switch (action.type) {
    case UPDATE_TABLESTATUS:
        return [ ...action.payload];
    default:
        return statePart;
  };
};
export default tableStatusReducer;