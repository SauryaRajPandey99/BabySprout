import "./hero.css";
import arrowButton from "../../Assets/arrow_btn.png";
import playIcon from "../../Assets/play_icon.png";
import pauseIcon from "../../Assets/pause_icon.png";
import { Link, Navigate, NavLink } from "react-router-dom"; // Import Link
const Hero = ({
  heroData,
  setHeroCount,
  heroCount,
  setPlayStatus,
  playStatus,
}) => {
  // const navigate = Navigate();
  return (
    <div className="hero">
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="hero-explore">
        <Link to="/maths" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Explore the inner genius inside you</p>
        </Link>
        <Link to="/maths">
          <img src={arrowButton} alt="arrow" />
        </Link>
      </div>
      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li
            onClick={() => setHeroCount(0)}
            className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}
          ></li>
          <li
            onClick={() => setHeroCount(1)}
            className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}
          ></li>
          <li
            onClick={() => setHeroCount(2)}
            className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}
          ></li>
        </ul>
        <div className="hero-play">
          <img
            onClick={() => setPlayStatus(!playStatus)}
            src={playStatus ? pauseIcon : playIcon}
            alt=""
          />
          <p>See the video</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
