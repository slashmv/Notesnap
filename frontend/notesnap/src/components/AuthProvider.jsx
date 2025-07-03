import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const navigate = useNavigate();
  const loginAction = async (data) => {
    if (Object.keys(token).length !== 0) return;
    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res && !("error" in res)) {
      setUser(res);
      navigate("/");
      localStorage.setItem("user", JSON.stringify(res));
      setToken(res);
      return;
    }
    throw new Error(res.error);
  };

  const logOut = () => {
    setUser(null);
    setToken({});
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
