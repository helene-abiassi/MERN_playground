import "../styles/Home.css";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useContext, useEffect } from "react";
import { ExperiencesContext } from "../context/ExperiencesContext";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { experiences } = useContext(ExperiencesContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>explore. discover. share.</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="beigeBox">
          <h2>Welcome {user?.username}!</h2>
          <h3 className="subHeader">
            {experiences.length} experiences for you to discover
          </h3>
          <p>
            Lorem ipsibunventore, amet natus reiciendis ipsam quasi fugiat at ut
            soluta consequatur et magnam illum corporis. Quaerat blanditiis
            voluptatem, adipisci numquam autem at.
          </p>
          <br />
          <Link className="nakdButton" to={"/experiences"}>
            start exploring
          </Link>
        </div>
      </div>

      <br />
      <div className="top5Carousel">{/* <Carousel /> */}</div>
    </div>
  );
}

export default Home;
