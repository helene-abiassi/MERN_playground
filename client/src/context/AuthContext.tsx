import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import { LogInCredentials, LogInResponse } from "../components/Login";

interface AuthContextType {
  user: User | null;
  loginCredentials: LogInCredentials | null;
  setUser: (user: User) => void;
  logIn: () => void;
  setLoginCredentials: (loginCredentials: LogInCredentials) => void;
  logOut: () => void;
  getProfile: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthInitContext = {
  user: null,
  loginCredentials: null,
  setUser: () => console.log("context not initialized"),
  logIn: () => console.log("context not initialized"),
  setLoginCredentials: () => console.log("context not initialized"),
  logOut: () => console.log("context not initialized"),
  getProfile: () => console.log("context not initialized"),
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCredentials, setLoginCredentials] =
    useState<LogInCredentials | null>(null);

  const logIn = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials!.email);
    urlencoded.append("password", loginCredentials!.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5005/api/users/login",
        requestOptions
      );

      if (response.ok) {
        const results: LogInResponse = await response.json();
        console.log("results.username :>> ", results);
        const token = results.token; //Token should be added to every function for users (delete/update)
        if (token) {
          localStorage.setItem("token", token);
        }
      }
    } catch (err) {
      const error = err as Error;
      console.log("error :>> ", error.message);
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("you need to log in first!");
      //Redirect user to login/ protected route page
    }
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          requestOptions
        );

        if (!response.ok) {
          alert(response.statusText);
        }

        if (response.ok) {
          const result = await response.json();
          console.log("result to get my user profile :>> ", result);
          const user = result.userProfile as User;

          setUser(user);
        }
      } catch (err) {
        const error = err as Error;
        console.log("error :>> ", error.message);
      }
    }
  };

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");

    return token ? true : false;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      console.log("user is logged in");
      setIsLoggedIn(true);
    } else {
      console.log("user is NOT logged in");
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logOut,
        getProfile,
        logIn,
        loginCredentials,
        setLoginCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
