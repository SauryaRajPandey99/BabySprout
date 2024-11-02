import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Background } from "./Components/Background/Background";
import Hero from "./Components/Hero/Hero";
import Maths from "./Components/Maths/Maths";
import Navbared from "./Components/Navbar/Navbar";
import Addition from "./Components/Maths/Problems/Addition";
import Substraction from "./Components/Maths/Problems/Substraction";
import Multiplication from "./Components/Maths/Problems/Multiplication";

const App = () => {
  let heroData = [
    {
      text1: "Dive in deep  ",
      text2: "Knowledge to keep",
    },
    {
      text1: "Curious mind,",
      text2: "Fun you will find",
    },
    {
      text1: "Hassle Free,",
      text2: "Question Tree",
    },
  ];

  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setHeroCount((count) => {
        return count === 2 ? 0 : count + 1;
      });
    }, 5000);
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Background playStatus={playStatus} heroCount={heroCount} />
        <Navbared />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Hero
              setPlayStatus={setPlayStatus}
              heroData={heroData[heroCount]}
              heroCount={heroCount}
              setHeroCount={setHeroCount}
              playStatus={playStatus}
            />
          }
        />
        <Route path="/maths" element={<Maths />} />
        <Route path="/addition" element={<Addition />} />
        <Route path="/substraction" element={<Substraction />} />
        <Route path="/multiplication" element={<Multiplication />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
