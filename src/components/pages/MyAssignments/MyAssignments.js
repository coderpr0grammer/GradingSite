import React from "react";
import { PieChart, Pie } from "recharts";
import "./MyAssignments.css";

function MyAssignments() {
  const data = [{ name: "grade", score: 80, fill: "#004A62" }];

  return (
    <div className="App">
      <header className="App-header">
      <h2>Grade Your Papers Now</h2>
        <PieChart width={700} height={700}>
        <Pie data={data} dataKey="score" outerRadius={250} fill="#ECF8E5" innerRadius={150} startAngle={90} endAngle={450}/>
        </PieChart>
      </header>
    </div>
  );
}




export default MyAssignments;
