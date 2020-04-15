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
};

const rootReducer = (state = initialState, action) => {
  //Add contact

  //Delete contact

  //Set contact

  //Clear current contact

  //Update contact

  //Filter contact

  //Clear contact

  return state;
};

export default rootReducer;
