import { ReactNode, createContext, useEffect, useState } from "react";
import { Experience } from "../types/customTypes";

interface ExperiencesContextType {
  experiences: Experience[];
  urlParams: string | null;
  fetchExperiences: () => Promise<void>;
}
//!Add Query params + state var to Type above

const initialContext = {
  experiences: [
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
  ],
  urlParams: null,
  fetchExperiences: () => Promise.resolve(),
};

interface ProviderPropsType {
  children: ReactNode;
}

export const ExperiencesContext =
  createContext<ExperiencesContextType>(initialContext); //!Fix TS error

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

  const fetchExperiences = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const results = await fetch(
        `http://localhost:5005/api/experiences/${urlParams}`,
        requestOptions
      );

      console.log("results :>> ", results);

      if (results.status === 200) {
        const data = await results.json();
        console.log("data :>> ", data);
        const experienceList = data.data as Experience[];

        console.log("experienceList :>> ", experienceList);

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
