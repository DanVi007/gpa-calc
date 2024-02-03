import SingleGrade from "./SingleGrade";
import "./Grades.css";
import { useState } from "react";
import { Grade } from "../models/Grade";

export default function Grades() {
  const testGrade1: Grade = {
    Course: "Global",
    Points: 200,
    Grade: 3,
  };

  const [grades, setGrades] = useState<Grade[]>([testGrade1]);

  function displayGrades() {
    return grades.map((grade, index) => (
      <SingleGrade grade={grade} index={index} grades={grades} setGrades={setGrades} />
    ));
  }

  function addEmptyGrade() {
    const emptyGrade: Grade = {
      Course: "",
      Points: "",
      Grade: '',
    };
    setGrades([...grades, emptyGrade]);
  }

  return (
    <div>
      <button type="button" onClick={addEmptyGrade}>
        +
      </button>
      <div className="grades">{displayGrades()}</div>
    </div>
  );
}
