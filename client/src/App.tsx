import "../src/styles/main.css";
import Footer from "./compoents/Footer";
import NavBar from "./compoents/NavBar";

function App() {
  return (
    <>
      <div className="mainBody">
        <NavBar />
        <h1>Voyage</h1>
        <Footer />
      </div>
    </>
  );
}

export default App;
