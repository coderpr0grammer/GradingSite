import React from "react";
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";
import "./MyAssignments.css";

function MyAssignments() {
  const donutData = [{ name: "grade", score: 80, fill: "#1B0166" }];
  const barChart = [{ "name": 'Bar 1', "Amount": 5 }, { "name": 'Bar 2', "Amount": 3 }, { "name": 'Bar 3', "Amount": 9 }]

  return (
    <div className="App">
      <header className="App-header">
      <h1>Grade Your Papers Now</h1>
      var essay = prompt("Essay", "Insert your text here, upload a file, or scan a paper to start the evaluation...");

      <h3>Create Input Box</h3>
        <input type="text" id="myName" placeholder="Enter Name"/>
        <button id="btn">Save</button>
        <script src="code.js"></script>

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

    <div id="feedbackContainer">
    <h1 id="mediaHeader">Media Feedback</h1>
    <h3 class="wordValue">Word Count: 2318</h3>
    <h3 class="wordValue">Character Count: 23354</h3>
    <p id="feedbackText">Information goes here</p>
    <h3 id="feedbackSummary">Summary: GradeAssist thinks you have (surpassed/sufficiently met/not met) expectations</h3>
    </div>

    </header>
    </div>
  );
}




export default MyAssignments;
