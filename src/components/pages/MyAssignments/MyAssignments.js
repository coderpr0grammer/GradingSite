import React from "react";
import { PieChart, Pie } from "recharts";
import "./MyAssignments.css";

function MyAssignments() {
  const data = [{ name: "grade", score: 80, fill: "#004A62" }];

  return (
    <div className="App">
      <header className="App-header">
      <h1>Grade Your Papers Now</h1>
        <PieChart width={700} height={700}>
        <Pie data={data} dataKey="score" outerRadius={250} fill="#ECF8E5" innerRadius={150} startAngle={90} endAngle={450}/>
        </PieChart>
      </header>
      <body>
        <h3>Create Input Box</h3>
        <input type="text" id="myName" placeholder="Enter Name">
        <button id="btn">Save</button>
        <script src="code.js"></script>
      </body>
    </div>
    
  );
}




export default MyAssignments;
