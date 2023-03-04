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
      <h1>Grade Your Papers Now</h1>
      var essay = prompt("Essay", "Insert your text here, upload a file, or scan a paper to start the evaluation...");
        <PieChart width={700} height={700}>
        <Pie data={data} dataKey="score" outerRadius={250} fill="#ECF8E5" innerRadius={150} startAngle={90} endAngle={450}/>
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
