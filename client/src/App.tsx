import "../src/styles/main.css";
import Footer from "./compoents/Footer";
import NavBar from "./compoents/NavBar";
import SignUp from "./compoents/SignUp";

function App() {
  return (
    <>
      <div className="mainBody">
        <NavBar />
        <h1>explore. discover. share.</h1>
        <SignUp />
        <Footer />
      </div>
    </>
  );
}

export default App;
