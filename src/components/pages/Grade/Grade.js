import React from "react";
import { PieChart, Pie, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";
import "./Grade.css";

function Grade() {
  const donutData = [{ name: "grade", score: 80, fill: "#1B0166" }];
  const barChart = [{ "name": 'Bar 1', "Amount": 5 }, { "name": 'Bar 2', "Amount": 3 }, { "name": 'Bar 3', "Amount": 9 }]

  return (
    <div className="App">
      <header className="App-header">
      <h1 style={{color: "#28A334", fontSize: 50, fontWeight:1000}}>
      Grade Your Papers <span style={{color: '#150578'}}>Now</span>
      </h1>
      <input type="text" id="essay" placeholder="Insert your text here, upload a file, or scan a paper to start the evaluation..."/>
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
  const btn= document.getElementById("btn");
}




export default Grade;
