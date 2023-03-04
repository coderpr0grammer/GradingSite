import React from "react";
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";
import "./MyAssignments.css";

function MyAssignments() {
  const donutData = [{ name: "grade", score: 80, fill: "#1B0166" }];
  const barChart = [{ "name": 'Bar 1', "Amount": 5 }, { "name": 'Bar 2', "Amount": 3 }, { "name": 'Bar 3', "Amount": 9 }]

  return (
    <div className="App">
      <header className="App-header">
        <PieChart width={400} height={400}>
        <Pie data={donutData} dataKey="score" outerRadius={170} fill="#1B0166" innerRadius={100} startAngle={90} endAngle={90 + donutData[0].score*3.6}/>
        </PieChart>
        <p id="gradeLabel" >{donutData[0].score}%</p>



  <BarChart width={300} height={200} data={barChart}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  {/* <YAxis /> */}
  <Tooltip />
  <Legend />
  <Bar dataKey="Amount" fill="#8884d8" />
</BarChart>



      </header>
    </div>
  );
}




export default MyAssignments;
