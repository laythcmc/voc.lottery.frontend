import store from "@/store";
import axios from "@/axios";
store.subscribe(mutation => {
  switch (mutation.type) {
    case "setToken":
      if (mutation.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem("user_token", mutation.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("user_token");
      }

      break;
  }
});
