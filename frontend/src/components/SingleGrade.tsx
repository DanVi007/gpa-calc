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

  // TODO: add error message 
  function updateGradesWithNewGrade() {
    // Validate newGrade
    if (Number.isNaN(newGrade.Points) || newGrade.Points === '') {
      return
    }

    // valid newGrade can be set to storage
    const updatedGrades = grades.map((oldGrade, i) => {
      if (i === index) {
        return newGrade;
      } else {
        return oldGrade;
      }
    })
    setGrades(updatedGrades);
  }


  // TODO: add error message on all invalid on change
  function handleCourseChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewGrade({ ...newGrade, Course: event.target.value });
    updateGradesWithNewGrade();
  }

  function handlePointsChange(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value === '' ? '' : parseInt(event.target.value);
    if (!Number.isNaN(inputValue)) {
      setNewGrade({ ...newGrade, Points: inputValue });
    }
    updateGradesWithNewGrade();
  }

  function handleChangeGrades(event: ChangeEvent<HTMLInputElement>): void {
    setNewGrade({ ...newGrade, Grade: event.target.value })
    updateGradesWithNewGrade();
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
