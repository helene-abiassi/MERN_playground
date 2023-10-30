import { useState } from "react";

type Props = {
  url: string;
};

interface ReturnData<T> {
  data: null | T;
  loading: boolean;
}

interface ErrorResponse {
  error: string;
}

function useMyFetch() {
  const [data, setData] = useState<null | T>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const results = (await response.json()) as T;
        setData(results);
      } else {
        const results = (await response.json()) as ErrorResponse;
        setError(results.error);
      }
    } catch (err) {
      console.log("error in useMyFetch hook :>> ", err);
      const { message } = err as Error;
      setError(message);
    }
  };
  return <div></div>;
}

export default useMyFetch;
