import { Grade } from "../models/Grade";
import "./SingleGrade.css";
import { ChangeEvent, useState } from "react";

export default function SingleGrade({
  grade,
  index,
  grades,
  setGrades,
}: { grade: Grade; index: number; grades: Grade[]; setGrades: (value: Grade[]) => void }) {
  const [newGrade, setNewGrade] = useState<Grade>(grade);

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
    const updatedGrade = { ...newGrade, Course: event.target.value }
    setNewGrade(updatedGrade);
    updateGradesWithNewGrade(updatedGrade);
  }

  function handlePointsChange(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value === '' ? '' : parseInt(event.target.value);
    if (!Number.isNaN(inputValue) || inputValue === '') {
      const updatedGrade: Grade = { ...newGrade, Points: inputValue }
      setNewGrade(updatedGrade)
      updateGradesWithNewGrade(updatedGrade);
    }
  }

  // TODO: add error message on all invalid on change
  function handleChangeGrades(event: ChangeEvent<HTMLInputElement>): void {
    const updatedGrade: Grade = { ...newGrade, Grade: event.target.value }
    setNewGrade(updatedGrade)
    updateGradesWithNewGrade(updatedGrade);
  }

  return (
    <div className="box">
      <form>
        <label>
          Emnenavn:
          <input
            type="text"
            value={newGrade.Course}
            onChange={handleCourseChange}
          />
        </label>
        <br />
        <br />
        <label>
          Studiepoeng:
          <input
            type="text"
            value={newGrade.Points}
            onChange={handlePointsChange}
          />
        </label>
        <br />
        <br />
        <label>
          Karakter:
          <input
            type="text"
            value={newGrade.Grade}
            onChange={handleChangeGrades}
          />
        </label>
      </form>
    </div>
  );
}
