//getToken in session

export const getToken = () => {
    if (window !== "undefined") {
      if (sessionStorage.getItem("token")) {
        return JSON.parse(sessionStorage.getItem("token"));
      }
    } else {
      return false;
    }
  };


  