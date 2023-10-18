import { useParams } from "react-router-dom";
import ExpCards from "../components/ExpCard";

function ExperienceDetails() {
  const { experienceTitle } = useParams();

  return (
    <div>
      <p>{experienceTitle}</p>
      <ExpCards />
    </div>
  );
}

export default ExperienceDetails;
