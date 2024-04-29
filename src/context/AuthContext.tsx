import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebaseApp";
import { AuthProps } from "../typings/auth.types";

const AuthContext = createContext({
  user: null as User | null,
});

export function AuthContextProvider({ children }: AuthProps) {
  const auth = getAuth(app);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
      }
    });
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
