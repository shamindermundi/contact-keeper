const initialState = {
  contacts: [],
  currentContact: null,
  filtered: null,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  error: null,
  alerts: [],
};

const rootReducer = (state = initialState, action) => {
  console.log("redux store", state);

  switch (action.type) {
    /**
     * Contact add , delete ,update
     */
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload
        ),
      };

    case "SET_CURRENT_CONTACT":
      return {
        ...state,
        currentContact: action.payload,
      };

    case "CLEAR_CURRENT_CONTACT":
      return {
        ...state,
        currentContact: null,
      };

    case "FILTER_CONTACT":
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };

    case "CLEAR_FILTER":
      return {
        ...state,
        filtered: null,
      };

    /**
     * Alert set and remove
     */

    case "SET_ALERT":
      return { ...state, alerts: action.payload };

    case "REMOVE_ALERT":
      return { ...state, alerts: [] };
    default:
      return state;
  }
};

export default rootReducer;
