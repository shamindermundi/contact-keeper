import axios from "axios";

const getUser = async ({ loadUser, authError }) => {
  if (localStorage.token) {
    axios.defaults.headers.common["x-auth-token"] = localStorage.token;

    try {
      const res = await axios.get("/api/auth");
      loadUser(res.data);
    } catch (err) {
      authError();
    }
  } else {
    delete axios.defaults.headers.common["x-ath-token"];
  }
};

export default getUser;
