import { Grade } from "../models/Grade";
import "./SingleGrade.css";
import { ChangeEvent } from "react";

// TODO: style
export default function SingleGrade({
  grade,
  index,
  grades,
  setGrades,
}: { grade: Grade; index: number; grades: Grade[]; setGrades: (value: Grade[]) => void }) {

  function updateGradesWithNewGrade(updatedGrade: Grade) {
    const updatedGrades = grades.map((oldGrade, i) => {
      if (i === index) {
        return updatedGrade
      } else {
        return oldGrade;
      }
    })
    setGrades(updatedGrades);
  }

  function handleCourseChange(event: ChangeEvent<HTMLInputElement>): void {
    const updatedGrade = { ...grade, Course: event.target.value }
    updateGradesWithNewGrade(updatedGrade);
  }

  function handlePointsChange(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value === '' ? '' : parseInt(event.target.value);
    if (!Number.isNaN(inputValue) || inputValue === '') {
      const updatedGrade: Grade = { ...grade, Points: inputValue }
      updateGradesWithNewGrade(updatedGrade);
    }
  }

  function handleChangeGrades(event: ChangeEvent<HTMLInputElement>): void {
    let userInput = event.target.value
    const updatedGrade: Grade = { ...grade, GradePoint: userInput }
    updateGradesWithNewGrade(updatedGrade);

    // let valid = false

    // check if it is valid number
    // let gradePointNum = Number(userInput);
    // if (!isNaN(gradePointNum) && gradePointNum >= 0 && gradePointNum <= 5) {
    //   valid = true
    //   userInput = String(gradePointNum)
    // }


    // if (!valid) {
    //   // check if it is a valid character
    //   const validGradeCharRegex = /^[a-fA-F]?/g;
    //   const validGrade = userInput.match(validGradeCharRegex)
    //   console.log(validGrade)
    //   if (validGrade !== null && validGrade[0] !== "") {
    //     userInput = validGrade[0]
    //     valid = true
    //   }
    // }

    // if (valid || userInput === '') {
    //   const updatedGrade: Grade = { ...grade, GradePoint: userInput }
    //   updateGradesWithNewGrade(updatedGrade);
    // }

    // const gradeWithoutEmptySpaces = userInput.replace(/\s+/g, '')
  }

  function removeGrade(): void {
    // remove from list also removes from html
    setGrades(grades.filter(g => g.Id !== grade.Id));
  }

  return (
    <div className="grade">
      <button type="button" className="close-btn" onClick={removeGrade}>
        ✕
      </button>
      <form>
        <label>
          <input
            placeholder="Emnenavn"
            type="text"
            value={grade.Course}
            onChange={handleCourseChange}
            className="grade-input"
          />
        </label>
        <br />
        <br />
        <label>
          <input
            placeholder="Studiepoeng"
            type="text"
            value={grade.Points}
            onChange={handlePointsChange}
            className="grade-input"
          />
        </label>
        <br />
        <br />
        <label>
          <input
            type="text"
            placeholder="Karakter"
            value={grade.GradePoint}
            onChange={handleChangeGrades}
            className="grade-input"
          />
        </label>
      </form>
    </div>
  );
}
