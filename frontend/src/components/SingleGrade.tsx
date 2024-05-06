//TODO: Make single grade also have swap grade
import { Grade } from "../models/Grade";
import "./SingleGrade.css";
import { ChangeEvent } from "react";
import { useState } from "react";

// TODO: style
export default function SingleGrade({
  grade,
  index,
  grades,
  setGrades,
  swap,
}: { grade: Grade; index: number; grades: Grade[]; setGrades: (value: Grade[]) => void; swap: boolean }) {


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
    const updatedGrade: Grade = { ...grade, NewGradePoint: userInput }
    updateGradesWithNewGrade(updatedGrade);
  }

  function removeGrade(): void {
    // remove from list also removes from html
    setGrades(grades.filter(g => g.Id !== grade.Id));
  }

  function normalGrade(): JSX.Element {
    return (
      <label>
        <input
          type="text"
          placeholder="Karakter"
          value={grade.CurrentGradePoint}
          onChange={handleChangeGrades}
          className="grade-input"
        />
      </label>
    )
  }


  function swapGrade(): JSX.Element {
    return (
      <label>
        <input
          type="text"
          placeholder="Gammel karakter"
          value={grade.CurrentGradePoint}
          className="old-swap-grade-input"
        />
        <input
          type="text"
          placeholder="Ny karakter"
          value={grade.NewGradePoint}
          className="old-swap-grade-input"
        />
      </label>
    )
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
        {swap ? swapGrade() : normalGrade()}
      </form>
    </div>
  );
}
