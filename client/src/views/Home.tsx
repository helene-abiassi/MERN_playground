import "../styles/Home.css";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { useEffect } from "react";

function Home() {
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
          <h2 className="subHeader">Sub Header</h2>
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
      <div className="top5Carousel">
        <Carousel />
      </div>
    </div>
  );
}

export default Home;
