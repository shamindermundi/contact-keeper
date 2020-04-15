const initialState = {
  contacts: [
    {
      id: 1,
      name: "john",
      email: "j@d.com",
      phone: "551-444-3232",
      type: "personal",
    },
    {
      id: 2,
      name: "mona",
      email: "mona@d.com",
      phone: "221-444-4343",
      type: "personal",
    },
    {
      id: 3,
      name: "max",
      email: "max@d.com",
      phone: "233-444-67676",
      type: "professional",
    },
  ],
  loading: false,
  currentContact: null,
  filtered: null,
};

const rootReducer = (state = initialState, action) => {
  console.log("redux store", state);

  switch (action.type) {
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

    default:
      return state;
  }
};

export default rootReducer;
