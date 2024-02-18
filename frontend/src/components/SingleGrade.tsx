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

  // TODO: add error message on all invalid on change
  function handleChangeGrades(event: ChangeEvent<HTMLInputElement>): void {
    const gradeWithoutEmptySpaces = event.target.value.replace(/\s+/g, '')
    const updatedGrade: Grade = { ...grade, GradePoint: gradeWithoutEmptySpaces }
    updateGradesWithNewGrade(updatedGrade);
  }

  function removeGrade(): void {
    // remove from list also removes from html
    setGrades(grades.filter(g => g.Id !== grade.Id));
  }

  return (
    <div className="grade">
      <button type="button" onClick={removeGrade}>Remove</button>
      <form>
        <label>
          Emnenavn:
          <input
            type="text"
            value={grade.Course}
            onChange={handleCourseChange}
          />
        </label>
        <br />
        <br />
        <label>
          Studiepoeng:
          <input
            type="text"
            value={grade.Points}
            onChange={handlePointsChange}
          />
        </label>
        <br />
        <br />
        <label>
          Karakter:
          <input
            type="text"
            value={grade.GradePoint}
            onChange={handleChangeGrades}
          />
        </label>
      </form>
    </div>
  );
}
