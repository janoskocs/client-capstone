import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useGetMoments = () => {
  const { user } = useAuthContext();
  const [momentsList, setMomentsList] = useState(null);

  const getMoments = async (userId) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/moments/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMomentsList(data);
    } catch (error) {
      console.log(error);
    }
  };
  return { momentsList, getMoments };
};
