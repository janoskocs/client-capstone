import "./MoodPage.scss";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const MoodPage = () => {
  const { user } = useAuthContext();
  const [moodData, setMoodData] = useState(null);

  const getMoods = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}api/moments/mood`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const transformedArray =
        data &&
        data.map((item) => ({
          positive: item.mood.positive,
          negative: item.mood.negative,
          middle: item.mood.middle,
        }));
      setMoodData(transformedArray.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoods();
  }, []);

  console.log(moodData);

  return (
    <section className="mood">
      <div className="mood__wrapper">
        <h2 className="mood__title">Reflect</h2>
        <p className="mood__text">
          This chart shows the history of your emotions based on your moments
        </p>
      </div>
      {moodData && (
        <LineChart width={400} height={400} data={moodData}>
          <Line type="monotone" dataKey="positive" stroke="red" />
          <CartesianGrid stroke="#ccc" />
          <XAxis />
          <YAxis />
        </LineChart>
      )}
    </section>
  );
};

export default MoodPage;
