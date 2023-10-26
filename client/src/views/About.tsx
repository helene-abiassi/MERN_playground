import { useEffect } from "react";
import { Link } from "react-router-dom";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <h1>about</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="beigeBox">
          <p>
            Lorem ipsibunventore, amet natus reiciendis ipsam quasi fugiat at ut
            soluta consequatur et magnam illum corporis. Quaerat blanditiis
            voluptatem, adipisci numquam autem at, repellat praesentium earum
            consequatur asperiores perspiciatis animi rerum? A suscipit esse
            beatae. Nisi quod numquam accusantium omnis veniam dicta velit,
            labore cum excepturi animi, possimus quis doloremque, porro.
          </p>
          <br />
          <Link className="nakdButton" to={"/experiences"}>
            join our community
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
