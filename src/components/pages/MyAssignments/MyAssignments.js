import React from "react";
import { PieChart, Pie } from "recharts";

function MyAssignments() {
  const data = [{ name: "homeUtil", Grade: 90, fill: "#004A62" }];

  return (
    <div className="App">
      <header className="App-header">
        <h1>this is a test right ehre</h1>;
        <PieChart width={700} height={700}>
          <Pie
            data={data}
            dataKey="grade"
            outerRadius={250}
            fill="#ECF8E5"
            innerRadius={150}
            startAngle={90}
            endAngle={450}
          />
        </PieChart>
      </header>
    </div>
  );
}

export default MyAssignments;
