import { ReactNode, createContext, useEffect, useState } from "react";
import { Experience } from "../types/customTypes";
// import useMyFetch from "../hooks/useMyFetch";

interface ExperiencesContextType {
  experiences: Experience[] | null;
  // urlParams: string;
  fetchExperiences: () => Promise<void>;
  // loading: boolean;
  // error: string;
}
//!Add Query params + state var to Type above

const initialContext: ExperiencesContextType = {
  experiences: null,
  // urlParams: "all",
  fetchExperiences: () => Promise.resolve(),
  // loading: true,
  // error: "",
};

interface ProviderPropsType {
  children: ReactNode;
}

export const ExperiencesContext =
  createContext<ExperiencesContextType>(initialContext);

export const ExperiencesContextProvider = (props: ProviderPropsType) => {
  const [experiences, setExperiences] = useState<Experience[] | null>(null);
  //FIXME think about the use of urlParams in a context (no specific url to be at when the context is rendered)

  // const [urlParams, setUrlParams] = useState("all");

  // const { data, error, loading } = useMyFetch<Experience[]>(
  //   `http://localhost:5005/api/experiences/${urlParams}`
  // );

  const fetchExperiences = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const results = await fetch(
        `http://localhost:5005/api/experiences/all`,
        requestOptions
      );

      // console.log("results :>> ", results);

      if (results.status === 200) {
        const data = await results.json();
        // console.log("data :>> ", data);
        const experienceList = data.data as Experience[];

        console.log("experienceList :>> ", experienceList);

        // setUrlParams(urlParams);
        setExperiences(experienceList);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <ExperiencesContext.Provider value={{ experiences, fetchExperiences }}>
      {props.children}
    </ExperiencesContext.Provider>
  );
};
