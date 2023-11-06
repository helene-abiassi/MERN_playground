import { ReactNode, createContext, useEffect, useState } from "react";
import { Experience } from "../types/customTypes";
// import useMyFetch from "../hooks/useMyFetch";

interface ExperiencesContextType {
  experiences: Experience[];
  urlParams: string;
  fetchExperiences: () => Promise<void>;
  // loading: boolean;
  // error: string;
}
//!Add Query params + state var to Type above

const initialContext: ExperiencesContextType = {
  experiences: [
    {
      _id: "",
      author: {
        a_id: "",
        username: "",
        email: "",
        bio: "",
        member_since: Date(),
        user_image: "",
      },
      title: "",
      caption: "",
      publication_date: Date(),
      location: {
        country: "",
        city: "",
        longitude: "",
        latitude: "",
      },
      experienceType: "",
      text_body: "",
      photo: "",
      photo_body: "",
      bookmarked_by: [
        {
          _id: "",
          usernam: "",
          bio: "",
          member_since: Date(),
          user_image: "",
        },
      ],
      comments: [
        {
          _id: "",
          author: {
            _id: "",
            email: "",
            username: "",
            user_image: "",
          },
          date: Date(),
          message: "",
          experienceID: "",
        },
      ],
    },
  ],
  urlParams: "all",
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
  const [experiences, setExpriences] = useState<Experience[]>([
    {
      author: {
        a_id: "",
        username: "",
        email: "",
        bio: "",
        member_since: Date(),
        user_image: "",
      },
      title: "",
      caption: "",
      publication_date: Date(),
      location: {
        country: "",
        city: "",
        longitude: "",
        latitude: "",
      },
      experienceType: "",
      text_body: "",
      photo: "",
      photo_body: "",
      bookmarked_by: [
        {
          _id: "",
          usernam: "",
          bio: "",
          member_since: Date(),
          user_image: "",
        },
      ],
      comments: [
        {
          _id: "",
          author: {
            _id: "",
            email: "",
            username: "",
            user_image: "",
          },
          date: Date(),
          message: "",
        },
      ],
    },
  ]);

  const [urlParams, setUrlParams] = useState("all");

  // const { data, error, loading } = useMyFetch<Experience[]>(
  //   `http://localhost:5005/api/experiences/${urlParams}`
  // );

  const fetchExperiences = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const results = await fetch(
        `http://localhost:5005/api/experiences/${urlParams}`,
        requestOptions
      );

      // console.log("results :>> ", results);

      if (results.status === 200) {
        const data = await results.json();
        // console.log("data :>> ", data);
        const experienceList = data.data as Experience[];

        // console.log("experienceList :>> ", experienceList);

        setUrlParams(urlParams);
        setExpriences(experienceList);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [urlParams]);

  return (
    <ExperiencesContext.Provider
      value={{ experiences, fetchExperiences, urlParams }}
    >
      {props.children}
    </ExperiencesContext.Provider>
  );
};
