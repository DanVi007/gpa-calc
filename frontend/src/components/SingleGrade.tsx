import { Grade } from "../models/Grade";
import "./SingleGrade.css";
import { ChangeEvent, useState } from "react";

export default function SingleGrade({
  grade,
  index,
  setGrades,
}: { grade: Grade; index: number; setGrades: (value: Grade[]) => void }) {
  const [newGrade, setNewGrade] = useState<Grade>(grade);

  function handleCourseChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewGrade({ ...newGrade, Course: event.target.value });
  }

  function handlePointsChange(event: ChangeEvent<HTMLInputElement>): void {
    const inputValue = event.target.value === '' ? '' : parseInt(event.target.value);
    if (!Number.isNaN(inputValue)) {
      setNewGrade({ ...newGrade, Points: inputValue });
    }
  }

  function handleChangeGrades(event: ChangeEvent<HTMLInputElement>): void {
    setNewGrade({ ...newGrade, Grade: event.target.value })
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
