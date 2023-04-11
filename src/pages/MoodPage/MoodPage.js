import "./MoodPage.scss";
import { LineChart, Line } from "recharts";

const MoodPage = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 100, pv: 1300, amt: 500 },
  ];
  return (
    <section className="mood">
      <div className="mood__wrapper">Mood page</div>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </section>
  );
};

export default MoodPage;
