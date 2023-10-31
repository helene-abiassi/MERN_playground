import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../types/customTypes";
import { LogInCredentials, LogInResponse } from "../components/Login";

interface AuthContextType {
  user: User | null;
  loginCredentials: LogInCredentials | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  logIn: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
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
  isLoading: true,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: false) => console.log("context not initialized"),
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
  const [isLoading, setIsLoading] = useState(true);
  const [loginCredentials, setLoginCredentials] =
    useState<LogInCredentials | null>(null);

  const logIn = async () => {
    setIsLoggedIn(false);
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
        const token = results.token; //Token should be added to every function4 users (delete/update)
        if (token) {
          localStorage.setItem("token", token);
          setUser(user);
          setIsLoggedIn(true);

        
        }
      }
    } catch (err) {
      const error = err as Error;
      console.log("error :>> ", error.message);
    }
  }; //Redirect user to login/ protected route page
  //!Navigate hook cannot be imported

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("you need to log in first!");
      setUser(null);
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
          setIsLoading(false);
        }

        if (response.ok) {
          const result = await response.json();
          console.log("result to get my user profile :>> ", result);
          const user = result.userProfile as User;

          setUser(user);
          setIsLoggedIn(true);
          //!ADD before catch password and email validation
        }
      } catch (err) {
        const error = err as Error;
        setIsLoading(false);

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

  //call here a function that:
  //1st get the token from the localstorage
  //2nd attach the token to a fetch request
  //3rd send request to your backend
  //4rd in the response from the request, recieves the User information
  //5th sets the User state variable with that info

  const authenticateUser = async () => {
    const token = localStorage.getItem("token");

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

        if (response.ok) {
          const result = await response.json();
          console.log("result to get my user profile :>> ", result);
          const user = result.userProfile as User;

          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setIsLoading(false);
        }
      } catch (err) {
        const error = err as Error;
        setIsLoading(false);
        console.log("error :>> ", error.message);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn) {
      console.log("user is logged in");
      setIsLoggedIn(true);
      setIsLoading(false);
      authenticateUser();
    } else {
      console.log("user is NOT logged in");
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

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
        isLoading,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
