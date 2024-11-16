// import React, { useState, useRef, useEffect } from "react";
// import {
//   Button,
//   Form,
//   Container,
//   Row,
//   Col,
//   Card,
//   Alert,
// } from "react-bootstrap";

// const SmartMathOperation = ({ operationType }) => {
//   // Existing state
//   const [firstNumCharacters, setFirstNumCharacters] = useState("");
//   const [secondNumCharacters, setSecondNumCharacters] = useState("");
//   const [numProblems, setNumProblems] = useState("");
//   const [problems, setProblems] = useState([]);
//   const [showAlert, setShowAlert] = useState(false);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const printRef = useRef();

//   // New AI-related state
//   const [difficultyLevel, setDifficultyLevel] = useState("medium");
//   const [studentHistory, setStudentHistory] = useState([]);
//   const [adaptiveMode, setAdaptiveMode] = useState(false);
//   const [lastPerformance, setLastPerformance] = useState(null);

//   const operationConfig = {
//     addition: {
//       title: "Addition Problems",
//       symbol: "+",
//       calculate: (num1, num2) => num1 + num2,
//       patterns: {
//         easy: ["carrying", "no-carrying"],
//         medium: ["mixed-carrying", "consecutive"],
//         hard: ["multiple-carrying", "near-numbers"],
//       },
//     },
//     multiplication: {
//       title: "Multiplication Problems",
//       symbol: "x",
//       calculate: (num1, num2) => num1 * num2,
//       patterns: {
//         easy: ["single-digit", "multiples-of-10"],
//         medium: ["double-digit", "mixed"],
//         hard: ["triple-digit", "complex"],
//       },
//     },
//     subtraction: {
//       title: "Subtraction Problems",
//       symbol: "-",
//       calculate: (num1, num2) => num1 - num2,
//       patterns: {
//         easy: ["no-borrowing", "simple-borrowing"],
//         medium: ["single-borrow", "mixed"],
//         hard: ["multiple-borrow", "near-numbers"],
//       },
//     },
//   };

//   const { title, symbol, calculate, patterns } = operationConfig[operationType];

//   // AI difficulty adjustment based on performance
//   const adjustDifficulty = (performance) => {
//     if (performance > 0.85) return "hard";
//     if (performance > 0.6) return "medium";
//     return "easy";
//   };

//   // AI pattern recognition for number generation
//   const generatePatternedNumber = (length, pattern) => {
//     const max = Math.pow(10, length) - 1;
//     const min = Math.pow(10, length - 1);
//     let num = Math.floor(Math.random() * (max - min + 1)) + min;

//     switch (pattern) {
//       case "carrying":
//         return Math.floor(num / 10) * 10 + 9;
//       case "near-numbers":
//         return Math.floor(num / 100) * 100 + 99;
//       case "consecutive":
//         return parseInt(
//           String(num)
//             .split("")
//             .map((d, i) => (parseInt(d) + i) % 10)
//             .join("")
//         );
//       default:
//         return num;
//     }
//   };

//   // AI-powered problem generation
//   const generateProblems = () => {
//     const firstCharCount = parseInt(firstNumCharacters) || 0;
//     const secondCharCount = parseInt(secondNumCharacters) || 0;
//     const problemCount = parseInt(numProblems) || 0;

//     if (firstCharCount <= 0 || secondCharCount <= 0 || problemCount <= 0) {
//       setShowAlert(true);
//       return;
//     }

//     setShowAlert(false);
//     const currentPatterns = patterns[difficultyLevel];
//     const generatedProblems = [];

//     for (let i = 0; i < problemCount; i++) {
//       const selectedPattern = currentPatterns[i % currentPatterns.length];
//       let num1 = generatePatternedNumber(firstCharCount, selectedPattern);
//       let num2 = generatePatternedNumber(secondCharCount, selectedPattern);

//       if (operationType === "subtraction" && num1 < num2) {
//         [num1, num2] = [num2, num1];
//       }

//       const answer = calculate(num1, num2);
//       generatedProblems.push({
//         num1,
//         num2,
//         answer,
//         pattern: selectedPattern,
//         difficulty: difficultyLevel,
//       });
//     }

//     setProblems(generatedProblems);
//     updateStudentHistory(generatedProblems);
//   };

//   // AI performance tracking
//   const updateStudentHistory = (newProblems) => {
//     const historyEntry = {
//       timestamp: new Date(),
//       problemSet: newProblems,
//       difficulty: difficultyLevel,
//       operationType,
//     };
//     setStudentHistory((prev) => [...prev, historyEntry]);
//   };

//   // AI adaptive learning
//   useEffect(() => {
//     if (adaptiveMode && lastPerformance) {
//       const newDifficulty = adjustDifficulty(lastPerformance);
//       setDifficultyLevel(newDifficulty);
//     }
//   }, [adaptiveMode, lastPerformance]);

//   // Existing formatting functions
//   const formatNumber = (num, width) => {
//     return String(num).padStart(width, " ");
//   };

//   const formatProblem = (
//     index,
//     num1,
//     num2,
//     includeAnswer = false,
//     answer = null
//   ) => {
//     const maxWidth = Math.max(
//       String(num1).length,
//       String(num2).length,
//       answer ? String(answer).length : 0
//     );

//     const paddedNum1 = formatNumber(num1, maxWidth);
//     const paddedNum2 = formatNumber(num2, maxWidth);
//     const indexStr = `${index + 1}.`.padEnd(4);
//     const dashes = "-".repeat(maxWidth);
//     const answerStr = includeAnswer
//       ? formatNumber(answer, maxWidth)
//       : " ".repeat(maxWidth);

//     return (
//       <pre
//         style={{
//           fontFamily: "monospace",
//           fontSize: "1.2rem",
//           lineHeight: "1.5",
//           margin: 0,
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {`${indexStr}${paddedNum1}\n`}
//         {`   ${symbol}${paddedNum2}\n`}
//         {`    ${dashes}\n`}
//         {`    ${answerStr}`}
//       </pre>
//     );
//   };

//   // Enhanced download with AI insights
//   const downloadAnswers = () => {
//     let answersText = `${title} - Answers\nDifficulty Level: ${difficultyLevel}\n\n`;
//     problems.forEach((problem, index) => {
//       answersText += `${index + 1}. ${problem.num1} ${symbol} ${
//         problem.num2
//       } = ${problem.answer} (Pattern: ${problem.pattern})\n`;
//     });

//     // Add AI insights
//     if (studentHistory.length > 0) {
//       answersText += "\nLearning Progress Insights:\n";
//       answersText += `Total Sets Completed: ${studentHistory.length}\n`;
//       answersText += `Current Difficulty: ${difficultyLevel}\n`;
//     }

//     const blob = new Blob([answersText], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `${title.toLowerCase().replace(/\s+/g, "-")}-answers.txt`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   // Existing print handling components
//   const handlePrint = () => {
//     const printContent = printRef.current;
//     const originalDisplay = printContent.style.display;
//     printContent.style.display = "block";

//     const style = document.createElement("style");
//     style.textContent = `
//       @media print {
//         html, body {
//           height: 100% !important;
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow: hidden !important;
//           -webkit-print-color-adjust: exact;
//         }
//         body * {
//           visibility: hidden;
//         }
//         #printSection, #printSection * {
//           visibility: visible;
//         }
//         #printSection {
//           position: absolute;
//           left: 0;
//           top: 0;
//           width: 100%;
//           height: auto;
//         }
//         .print-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px;
//           margin-bottom: 20px;
//         }
//         .print-logo {
//           height: 60px;
//           width: auto;
//         }
//         .print-title {
//           font-size: 24px;
//           font-weight: bold;
//           margin: 0;
//         }
//         .print-date {
//           font-size: 14px;
//           color: #666;
//         }
//         .print-container {
//           display: block;
//           break-inside: avoid;
//           page-break-inside: avoid;
//         }
//         .print-row {
//           display: flex;
//           flex-direction: row;
//           flex-wrap: wrap;
//           width: 100%;
//           margin: 0;
//           padding: 10px;
//           gap: 20px;
//         }
//         .print-column {
//           width: calc(50% - 10px);
//           padding: 0;
//           box-sizing: border-box;
//         }
//         .print-card {
//           border: 1px solid #ddd;
//           padding: 10px;
//           margin-bottom: 10px;
//           break-inside: avoid;
//           page-break-inside: avoid;
//         }
//         @page {
//           margin: 15mm;
//           size: A4;
//         }
//       }
//     `;
//     document.head.appendChild(style);
//     window.print();
//     document.head.removeChild(style);
//     printContent.style.display = originalDisplay;
//   };

//   // Existing print components
//   const PrintProblemsList = ({ startIndex, endIndex }) => {
//     return problems.slice(startIndex, endIndex).map((problem, index) => (
//       <div key={startIndex + index} className="print-card">
//         {formatProblem(startIndex + index, problem.num1, problem.num2, false)}
//       </div>
//     ));
//   };

//   const ProblemsList = ({ startIndex, endIndex }) => {
//     return problems.slice(startIndex, endIndex).map((problem, index) => (
//       <Card key={startIndex + index} className="mb-3">
//         <Card.Body>
//           {formatProblem(
//             startIndex + index,
//             problem.num1,
//             problem.num2,
//             showAnswers,
//             problem.answer
//           )}
//         </Card.Body>
//       </Card>
//     ));
//   };

//   const PrintComponent = () => {
//     const problemsPerColumn = Math.ceil(problems.length / 2);
//     const currentDate = new Date().toLocaleDateString();

//     return (
//       <div id="printSection">
//         <div className="print-header">
//           <img
//             src="/src/Assets/BabySprout.png"
//             alt="Company Logo"
//             className="print-logo"
//           />
//           <div className="text-center">
//             <h2 className="print-title">{title}</h2>
//             <div className="print-date">Date: {currentDate}</div>
//             <div>Difficulty Level: {difficultyLevel}</div>
//           </div>
//           <div style={{ width: "200px" }}>Marks Secured :</div>
//         </div>
//         <div className="print-container">
//           <div className="print-row">
//             <div className="print-column">
//               <PrintProblemsList startIndex={0} endIndex={problemsPerColumn} />
//             </div>
//             {problems.length > problemsPerColumn && (
//               <div className="print-column">
//                 <PrintProblemsList
//                   startIndex={problemsPerColumn}
//                   endIndex={problems.length}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <>
//       <Container>
//         <Row className="my-4 justify-content-center">
//           <Col md="auto">
//             <h1
//               className="display-4 text-dark text-center"
//               style={{ fontWeight: "bold", textShadow: "2px 2px 4px #FFFFFF" }}
//             >
//               {title}
//             </h1>
//           </Col>
//         </Row>

//         {showAlert && (
//           <Alert
//             variant="danger"
//             onClose={() => setShowAlert(false)}
//             dismissible
//           >
//             Please enter values greater than 0 for both number lengths and
//             problems.
//           </Alert>
//         )}

//         <Row className="my-4 justify-content-center">
//           <Col md={3}>
//             <Form.Group
//               controlId="difficultyLevel"
//               style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//                 padding: "20px",
//                 borderRadius: "8px",
//               }}
//             >
//               <Form.Label
//                 className="h5 text-white"
//                 style={{
//                   fontWeight: "bold",
//                   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
//                 }}
//               >
//                 Difficulty Level
//               </Form.Label>
//               <Form.Select
//                 value={difficultyLevel}
//                 onChange={(e) => setDifficultyLevel(e.target.value)}
//                 className="shadow-sm"
//                 style={{
//                   borderColor: "#ffffff",
//                   color: "#000",
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                 }}
//               >
//                 <option value="easy">Easy</option>
//                 <option value="medium">Medium</option>
//                 <option value="hard">Hard</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group
//               controlId="firstNumCharacters"
//               style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//                 padding: "20px",
//                 borderRadius: "8px",
//               }}
//             >
//               <Form.Label
//                 className="h5 text-white"
//                 style={{
//                   fontWeight: "bold",
//                   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
//                 }}
//               >
//                 First Number Length
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={firstNumCharacters}
//                 onChange={(e) => {
//                   setFirstNumCharacters(e.target.value);
//                   setProblems([]);
//                 }}
//                 min="1"
//                 max="10"
//                 className="shadow-sm"
//                 style={{
//                   borderColor: "#ffffff",
//                   color: "#000",
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                 }}
//               />
//             </Form.Group>
//           </Col>
//           {/* <Col md={3}>
//             <Form.Group
//               controlId="secondNumCharacters"
//               style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//                 padding: "20px",
//                 borderRadius: "8px",
//               }}
//             >
//               <Form.Label
//                 className="h5 text-white"
//                 style={{
//                   fontWeight: "bold",
//                   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
//                 }}
//               >
//                 Second Number Length
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={secondNumCharacters}
//                 onChange={(e) => {
//                   setSecondNumCharacters(e.target.value);
//                   setProblems([]);
//                 }}
//                 min="1"
//                 max="10"
//                 className="shadow-sm"
//                 style={{
//                   borderColor: "#ffffff",
//                   color: "#000",
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                 }}
//               />
//             </Form.Group>
//           </Col> */}
//           <Col md={3}>
//             <Form.Group
//               controlId="secondNumCharacters"
//               style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//                 padding: "20px",
//                 borderRadius: "8px",
//               }}
//             >
//               <Form.Label
//                 className="h5 text-white"
//                 style={{
//                   fontWeight: "bold",
//                   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
//                 }}
//               >
//                 Second Number Length
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={secondNumCharacters}
//                 onChange={(e) => {
//                   setSecondNumCharacters(e.target.value);
//                   setProblems([]);
//                 }}
//                 min="1"
//                 max="10"
//                 className="shadow-sm"
//                 style={{
//                   borderColor: "#ffffff",
//                   color: "#000",
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                 }}
//               ></Form.Control>
//             </Form.Group>
//           </Col>
//           <Col md={3}>
//             <Form.Group
//               controlId="numProblems"
//               style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.7)",
//                 padding: "20px",
//                 borderRadius: "8px",
//               }}
//             >
//               <Form.Label
//                 className="h5 text-white"
//                 style={{
//                   fontWeight: "bold",
//                   textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
//                 }}
//               >
//                 Number of Problems
//               </Form.Label>
//               <Form.Control
//                 type="number"
//                 value={numProblems}
//                 onChange={(e) => {
//                   setNumProblems(e.target.value);
//                   setProblems([]);
//                 }}
//                 min="1"
//                 max="20"
//                 className="shadow-sm"
//                 style={{
//                   borderColor: "#ffffff",
//                   color: "#000",
//                   backgroundColor: "#fff",
//                   borderRadius: "5px",
//                 }}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="my-4 justify-content-center">
//           <Col md="auto">
//             <Form.Check
//               type="switch"
//               id="adaptive-mode"
//               label="Enable Adaptive Mode"
//               checked={adaptiveMode}
//               onChange={(e) => setAdaptiveMode(e.target.checked)}
//               className="mb-3 text-white"
//             />
//             <Button
//               variant="primary"
//               onClick={generateProblems}
//               className="me-3 shadow-lg"
//               style={{
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 borderRadius: "8px",
//               }}
//             >
//               Generate Problems
//             </Button>
//             <Button
//               variant="secondary"
//               onClick={handlePrint}
//               className="me-3 shadow-lg"
//               style={{
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 borderRadius: "8px",
//               }}
//             >
//               Print Problems
//             </Button>
//             {problems.length > 0 && (
//               <>
//                 <Button
//                   variant={showAnswers ? "warning" : "success"}
//                   onClick={() => setShowAnswers(!showAnswers)}
//                   className="me-3 shadow-lg"
//                   style={{
//                     padding: "10px 20px",
//                     fontSize: "16px",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   {showAnswers ? "Hide Answers" : "Show Answers"}
//                 </Button>
//                 <Button
//                   variant="info"
//                   onClick={downloadAnswers}
//                   className="shadow-lg"
//                   style={{
//                     padding: "10px 20px",
//                     fontSize: "16px",
//                     borderRadius: "8px",
//                   }}
//                 >
//                   Download Answers
//                 </Button>
//               </>
//             )}
//           </Col>
//         </Row>
//         <Row className="my-4">
//           {problems.length > 0 && (
//             <>
//               <Col md={6}>
//                 <ProblemsList
//                   startIndex={0}
//                   endIndex={Math.ceil(problems.length / 2)}
//                 />
//               </Col>
//               {problems.length > 1 && (
//                 <Col md={6}>
//                   <ProblemsList
//                     startIndex={Math.ceil(problems.length / 2)}
//                     endIndex={problems.length}
//                   />
//                 </Col>
//               )}
//             </>
//           )}
//         </Row>
//         <div ref={printRef} style={{ display: "none" }}>
//           <PrintComponent />
//         </div>
//       </Container>
//     </>
//   );
// };

// export default SmartMathOperation;