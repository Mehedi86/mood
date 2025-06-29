import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';
  const phone = localStorage.getItem('phone');

  if (loggedIn && phone) {
    setUser({ phone }); // Set actual phone number in context
  } else {
    setUser(null);
  }
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider
