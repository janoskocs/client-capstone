import "./MoodPage.scss";
import {
  ResponsiveContainer,
  AreaChart,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
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
        data.map((item, index) => {
          let mood = { post: `Post ${index}`, mood: 0, name: "Neutral" };
          if (item.mood.positive === 1) {
            mood.mood = 1;
            mood.name = "Happy";
          } else if (item.mood.negative === 1) {
            mood.mood = -1;
            mood.name = "Sad";
          } else {
            mood.mood = 0;
            mood.name = "Neutral";
          }
          return mood;
        });
      setMoodData(transformedArray.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoods();
  }, []);

  const gradientOffset = () => {
    const dataMax = Math.max(...moodData.map((i) => i.mood));
    const dataMin = Math.min(...moodData.map((i) => i.mood));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = moodData && gradientOffset();
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
        <AreaChart
          width={600}
          height={400}
          data={moodData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{ value: "Mood level", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#000"
            fill="url(#splitColor)"
          />
        </AreaChart>
      )}
    </section>
  );
};

export default MoodPage;
