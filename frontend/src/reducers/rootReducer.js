const initialState = {
  contacts: [],
  currentContact: null,
  filtered: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  error: null,
  alerts: [],
  user: null,
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

    /**
     * Users login & register
     */

    case "REGISTER_USER":
    case "LOGIN_USER":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null,
        alerts: [],
      };

    case "REGISTER_FAILED":
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        alerts: ["Registation falied!! "],
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOAD_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGIN_FAILED":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        alerts: ["Login failed!! "],
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOGOUT_USER":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        alerts: ["Logout complete! "],
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default rootReducer;
