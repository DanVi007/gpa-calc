import SingleGrade from "./SingleGrade";
import "./Grades.css";

export default function Grades() {
  function displayGrades() {
    return <SingleGrade />;
  }

  return (
    <div>
      <div className="grades">{displayGrades()}</div>
      <button type="button">+</button>
    </div>
  );
}
