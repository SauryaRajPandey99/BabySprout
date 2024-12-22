import React, { useState, useRef } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Badge,
} from "react-bootstrap";
import logo from "../../../Assets/BabySprout.png";

const CombinedMathOperation = () => {
  const [firstNumCharacters, setFirstNumCharacters] = useState("");
  const [secondNumCharacters, setSecondNumCharacters] = useState("");
  const [operationCounts, setOperationCounts] = useState({
    addition: "",
    subtraction: "",
    multiplication: "",
  });
  const [problems, setProblems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const printRef = useRef();

  const operationConfig = {
    addition: {
      symbol: "+",
      calculate: (num1, num2) => num1 + num2,
    },
    multiplication: {
      symbol: "×",
      calculate: (num1, num2) => num1 * num2,
    },
    subtraction: {
      symbol: "-",
      calculate: (num1, num2) => num1 - num2,
    },
  };

  const getProblemCount = (operation) => {
    return problems.filter((problem) => problem.operation === operation).length;
  };

  const handleOperationCountChange = (operation, value) => {
    setOperationCounts((prev) => ({
      ...prev,
      [operation]: value,
    }));
    setProblems([]);
  };

  const generateProblems = () => {
    const firstCharCount = parseInt(firstNumCharacters) || 0;
    const secondCharCount = parseInt(secondNumCharacters) || 0;
    const totalProblems = Object.values(operationCounts).reduce(
      (sum, count) => sum + (parseInt(count) || 0),
      0
    );

    if (firstCharCount <= 0 || secondCharCount <= 0) {
      setAlertMessage("First and second number lengths must be greater than 0");
      setShowAlert(true);
      return;
    }
    if (totalProblems < 2) {
      setAlertMessage(
        "Please enter at least 2 problem for any combined operation"
      );
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    setAlertMessage("");

    const maxFirstNumber = Math.pow(10, firstCharCount) - 1;
    const minFirstNumber = Math.pow(10, firstCharCount - 1);
    const maxSecondNumber = Math.pow(10, secondCharCount) - 1;
    const minSecondNumber = Math.pow(10, secondCharCount - 1);

    const generatedProblems = [];

    Object.entries(operationCounts).forEach(([operation, count]) => {
      const problemCount = parseInt(count) || 0;
      for (let i = 0; i < problemCount; i++) {
        let num1 =
          Math.floor(Math.random() * (maxFirstNumber - minFirstNumber + 1)) +
          minFirstNumber;
        let num2 =
          Math.floor(Math.random() * (maxSecondNumber - minSecondNumber + 1)) +
          minSecondNumber;

        if (operation === "subtraction" && num1 < num2) {
          [num1, num2] = [num2, num1];
        }

        const { symbol, calculate } = operationConfig[operation];
        const answer = calculate(num1, num2);
        generatedProblems.push({ num1, num2, symbol, answer, operation });
      }
    });

    for (let i = generatedProblems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generatedProblems[i], generatedProblems[j]] = [
        generatedProblems[j],
        generatedProblems[i],
      ];
    }

    setProblems(generatedProblems);
  };

  const formatNumber = (num, width) => {
    return String(num).padStart(width, " ");
  };

  const formatProblem = (
    index,
    num1,
    num2,
    symbol,
    includeAnswer = false,
    answer = null
  ) => {
    const maxWidth = Math.max(
      String(num1).length,
      String(num2).length,
      answer ? String(answer).length : 0
    );

    const paddedNum1 = formatNumber(num1, maxWidth);
    const paddedNum2 = formatNumber(num2, maxWidth);
    const indexStr = `${index + 1}.`.padEnd(4);
    const dashes = "-".repeat(maxWidth);
    const answerStr = includeAnswer
      ? formatNumber(answer, maxWidth)
      : " ".repeat(maxWidth);

    return (
      <pre
        style={{
          fontFamily: "monospace",
          fontSize: "1.2rem",
          lineHeight: "1.5",
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {`${indexStr}${paddedNum1}\n`}
        {`   ${symbol}${paddedNum2}\n`}
        {`    ${dashes}\n`}
        {`    ${answerStr}`}
      </pre>
    );
  };

  const downloadAnswers = () => {
    let answersText = "Combined Math Problems - Answers\n\n";
    problems.forEach((problem, index) => {
      answersText += `${index + 1}. ${problem.num1} ${problem.symbol} ${
        problem.num2
      } = ${problem.answer}\n`;
    });

    const blob = new Blob([answersText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Combined-math-problems-answers.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    const originalDisplay = printContent.style.display;
    printContent.style.display = "block";

    const style = document.createElement("style");
    style.textContent = `
      @media print {
        html, body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          -webkit-print-color-adjust: exact;
        }
        body * {
          visibility: hidden;
        }
        #printSection, #printSection * {
          visibility: visible;
        }
        #printSection {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: auto;
        }
        .print-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          margin-bottom: 20px;
        }
        .print-logo {
          height: 60px;
          width: auto;
        }
        .print-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        .print-date {
          font-size: 14px;
          color: #666;
        }
        .print-container {
          display: block;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        .print-row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          margin: 0;
          padding: 10px;
          gap: 20px;
        }
        .print-column {
          width: calc(50% - 10px);
          padding: 0;
          box-sizing: border-box;
        }
        .print-card {
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 10px;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        @page {
          margin: 15mm;
          size: A4;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
    printContent.style.display = originalDisplay;
  };

  const PrintProblemsList = ({ startIndex, endIndex }) => {
    return problems.slice(startIndex, endIndex).map((problem, index) => (
      <div key={startIndex + index} className="print-card">
        {formatProblem(
          startIndex + index,
          problem.num1,
          problem.num2,
          problem.symbol,
          false
        )}
      </div>
    ));
  };

  const ProblemsList = ({ startIndex, endIndex }) => {
    return problems.slice(startIndex, endIndex).map((problem, index) => (
      <Card key={startIndex + index} className="mb-3">
        <Card.Body>
          {formatProblem(
            startIndex + index,
            problem.num1,
            problem.num2,
            problem.symbol,
            showAnswers,
            problem.answer
          )}
        </Card.Body>
      </Card>
    ));
  };

  const PrintComponent = () => {
    const problemsPerColumn = Math.ceil(problems.length / 2);
    const currentDate = new Date().toLocaleDateString();

    return (
      <div id="printSection">
        <div className="print-header">
          <img src={logo} alt="Company Logo" className="print-logo" />
          <div className="text-center">
            <h2 className="print-title">Combined Math Problems</h2>
            <div className="print-date">Date: {currentDate}</div>
          </div>
          <div style={{ width: "200px" }}>Marks Secured :</div>
        </div>
        <div className="print-container">
          <div className="print-row">
            <div className="print-column">
              <PrintProblemsList startIndex={0} endIndex={problemsPerColumn} />
            </div>
            {problems.length > problemsPerColumn && (
              <div className="print-column">
                <PrintProblemsList
                  startIndex={problemsPerColumn}
                  endIndex={problems.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <Row className="my-4 justify-content-center">
        <Col md="auto">
          <h1
            className="display-4 text-dark text-center"
            style={{ fontWeight: "bold", textShadow: "2px 2px 4px #FFFFFF" }}
          >
            Combined Math Problems
          </h1>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Row className="my-4 justify-content-center">
        <Col md={4}>
          <Form.Group
            controlId="firstNumCharacters"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Form.Label
              className="h5 text-white"
              style={{
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              First Number Length
            </Form.Label>
            <Form.Control
              type="number"
              value={firstNumCharacters}
              onChange={(e) => {
                setFirstNumCharacters(e.target.value);
                setProblems([]);
              }}
              min="1"
              max="10"
              className="shadow-sm"
              style={{
                borderColor: "#ffffff",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group
            controlId="secondNumCharacters"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <Form.Label
              className="h5 text-white"
              style={{
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              Second Number Length
            </Form.Label>
            <Form.Control
              type="number"
              value={secondNumCharacters}
              onChange={(e) => {
                setSecondNumCharacters(e.target.value);
                setProblems([]);
              }}
              min="1"
              max="10"
              className="shadow-sm"
              style={{
                borderColor: "#ffffff",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-4 justify-content-center">
        <Col md={4}>
          <Form.Group
            controlId="additionCount"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <Form.Label
              className="h5 text-white d-flex justify-content-between align-items-center"
              style={{
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span>Number of Addition Problems</span>
              {problems.length > 0 && (
                <Badge bg="info" pill>
                  {getProblemCount("addition")}
                </Badge>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              value={operationCounts.addition}
              onChange={(e) =>
                handleOperationCountChange("addition", e.target.value)
              }
              min="0"
              max="20"
              className="shadow-sm"
              style={{
                borderColor: "#ffffff",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group
            controlId="subtractionCount"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <Form.Label
              className="h5 text-white d-flex justify-content-between align-items-center"
              style={{
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0, 0, 0,0.5)",
              }}
            >
              <span>Number of Subtraction Problems</span>
              {problems.length > 0 && (
                <Badge bg="info" pill>
                  {getProblemCount("subtraction")}
                </Badge>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              value={operationCounts.subtraction}
              onChange={(e) =>
                handleOperationCountChange("subtraction", e.target.value)
              }
              min="0"
              max="20"
              className="shadow-sm"
              style={{
                borderColor: "#ffffff",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group
            controlId="multiplicationCount"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <Form.Label
              className="h5 text-white d-flex justify-content-between align-items-center"
              style={{
                fontWeight: "bold",
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span>Number of Multiplication Problems</span>
              {problems.length > 0 && (
                <Badge bg="info" pill>
                  {getProblemCount("multiplication")}
                </Badge>
              )}
            </Form.Label>
            <Form.Control
              type="number"
              value={operationCounts.multiplication}
              onChange={(e) =>
                handleOperationCountChange("multiplication", e.target.value)
              }
              min="0"
              max="20"
              className="shadow-sm"
              style={{
                borderColor: "#ffffff",
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "5px",
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="my-4 justify-content-center">
        <Col md="auto">
          <Button
            variant="primary"
            onClick={generateProblems}
            className="me-3 shadow-lg"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Generate Problems
          </Button>
          <Button
            variant="secondary"
            onClick={handlePrint}
            className="me-3 shadow-lg"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Print Problems
          </Button>
          {problems.length > 0 && (
            <>
              <Button
                variant={showAnswers ? "warning" : "success"}
                onClick={() => setShowAnswers(!showAnswers)}
                className="me-3 shadow-lg"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "8px",
                }}
              >
                {showAnswers ? "Hide Answers" : "Show Answers"}
              </Button>
              <Button
                variant="info"
                onClick={downloadAnswers}
                className="shadow-lg"
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "8px",
                }}
              >
                Download Answers
              </Button>
            </>
          )}
        </Col>
      </Row>

      <Row className="my-4">
        {problems.length > 0 && (
          <>
            <Col md={6}>
              <ProblemsList
                startIndex={0}
                endIndex={Math.ceil(problems.length / 2)}
              />
            </Col>
            {problems.length > 1 && (
              <Col md={6}>
                <ProblemsList
                  startIndex={Math.ceil(problems.length / 2)}
                  endIndex={problems.length}
                />
              </Col>
            )}
          </>
        )}
      </Row>

      <div ref={printRef} style={{ display: "none" }}>
        <PrintComponent />
      </div>
    </Container>
  );
};

export default CombinedMathOperation;
