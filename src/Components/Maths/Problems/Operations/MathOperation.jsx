import React, { useState, useRef } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";

const MathOperation = ({ operationType }) => {
  const [numCharacters, setNumCharacters] = useState("");
  const [numProblems, setNumProblems] = useState("");
  const [problems, setProblems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [multiplierRange, setMultiplierRange] = useState({ min: 1, max: 10 });
  const [multiplicantRange, setMultiplicantRange] = useState({
    min: 1,
    max: 10,
  });

  const printRef = useRef();

  const operationConfig = {
    addition: {
      title: "Addition Problems",
      symbol: "+",
    },
    multiplication: {
      title: "Multiplication Problems",
      symbol: "x",
    },
    subtraction: {
      title: "Subtraction Problems",
      symbol: "-",
    },
  };

  const { title, symbol } = operationConfig[operationType];

  // Previous functions remain the same...
  const generateProblems = () => {
    const characterCount = parseInt(numCharacters) || 0;
    const problemCount = parseInt(numProblems) || 0;

    if (characterCount <= 0 || problemCount <= 0) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false);
    const maxNumber = Math.pow(10, characterCount) - 1;
    const generatedProblems = [];
    for (let i = 0; i < problemCount; i++) {
      let num1 = Math.floor(Math.random() * maxNumber) + 1;
      let num2 = Math.floor(Math.random() * maxNumber) + 1;

      if (operationType === "subtraction" && num1 < num2) {
        [num1, num2] = [num2, num1];
      }

      generatedProblems.push({ num1, num2 });
    }

    //multiplicaiton addded
    // for (let i = 0; i < problemCount; i++) {
    //   let num1 = Math.floor(Math.random() * maxNumber) + 1;
    //   let num2 = Math.floor(Math.random() * maxNumber) + 1;

    //   if (operationType === "multiplication") {
    //     num1 = Math.floor(
    //       Math.random() * (multiplierRange.max - multiplierRange.min + 1) +
    //         multiplierRange.min
    //     );
    //     num2 = Math.floor(
    //       Math.random() * (multiplicantRange.max - multiplicantRange.min + 1) +
    //         multiplicantRange.min
    //     );
    //   } else if (operationType === "subtraction" && num1 < num2) {
    //     [num1, num2] = [num2, num1];
    //   }

    //   generatedProblems.push({ num1, num2 });
    // }
    setProblems(generatedProblems);
  };

  const formatNumber = (num, width) => {
    return String(num).padStart(width, "0");
  };

  const formatProblem = (index, num1, num2, width) => {
    if (!width || width <= 0) {
      return null;
    }

    const paddedNum1 = formatNumber(num1, width);
    const paddedNum2 = formatNumber(num2, width);
    const indexStr = `${index + 1}.`.padEnd(4);
    const dashes = "-".repeat(width);

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
        {`    ${dashes}`}
      </pre>
    );
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
          parseInt(numCharacters) || 0
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
            parseInt(numCharacters) || 0
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
          <img
            src="/src/Assets/BabySprout.png"
            alt="Company Logo"
            className="print-logo"
            width={"200px"}
          />
          <div className="text-center">
            <h2 className="print-title">{title}</h2>
            <div className="print-date">Date: {currentDate}</div>
          </div>
          <div style={{ width: "200px" }}>Marks Secured :</div>{" "}
          {/* Spacer for alignment */}
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
      {/* <Row className="my-4">
        <Col>
          <h1>{title}</h1>
        </Col>
      </Row> */}
      <Row className="my-4 justify-content-center">
        <Col md="auto">
          <h1
            className="display-4 text-dark text-center"
            style={{ fontWeight: "bold", textShadow: "2px 2px 4px #FFFFFF" }}
          >
            {title}
          </h1>
        </Col>
      </Row>

      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Please enter values greater than 0 for both number of characters and
          problems.
        </Alert>
      )}

      {/* <Row className="my-4">
        <Col>
          <Form.Group controlId="numCharacters">
            <Form.Label>Number of Characters</Form.Label>
            <Form.Control
              type="number"
              value={numCharacters}
              onChange={(e) => {
                setNumCharacters(e.target.value);
                setProblems([]);
              }}
              min="1"
              max="10"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="numProblems">
            <Form.Label>Number of Problems</Form.Label>
            <Form.Control
              type="number"
              value={numProblems}
              onChange={(e) => {
                setNumProblems(e.target.value);
                setProblems([]);
              }}
              min="1"
              max="20"
            />
          </Form.Group>
        </Col>
      </Row> */}
      <Row className="my-4 justify-content-center">
        <Col md={6}>
          <Form.Group
            controlId="numCharacters"
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
              Number of Characters
            </Form.Label>
            <Form.Control
              type="number"
              value={numCharacters}
              onChange={(e) => {
                setNumCharacters(e.target.value);
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
        <Col md={6}>
          <Form.Group
            controlId="numProblems"
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
              Number of Problems
            </Form.Label>
            <Form.Control
              type="number"
              value={numProblems}
              onChange={(e) => {
                setNumProblems(e.target.value);
                setProblems([]);
              }}
              min="1"
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
      {/* {operationType === "multiplication" && (
        <Row className="my-4">
          <Col md={6}>
            <Form.Group controlId="multiplierRange">
              <Form.Label>Multiplier Range</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={multiplierRange.min}
                    onChange={(e) =>
                      setMultiplierRange({
                        ...multiplierRange,
                        min: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={multiplierRange.max}
                    onChange={(e) =>
                      setMultiplierRange({
                        ...multiplierRange,
                        max: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="multiplicantRange">
              <Form.Label>Multiplicant Range</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={multiplicantRange.min}
                    onChange={(e) =>
                      setMultiplicantRange({
                        ...multiplicantRange,
                        min: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={multiplicantRange.max}
                    onChange={(e) =>
                      setMultiplicantRange({
                        ...multiplicantRange,
                        max: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>
      )} */}
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
            className="shadow-lg"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Print Problems
          </Button>
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

export default MathOperation;
