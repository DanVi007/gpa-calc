import { useState } from "react";
import { Grade } from "../models/Grade";
export default function SingleGrade(
  { key, grade, removeGrade }: { key: number, grade: Grade, removeGrade: (grade: Grade) => void }
) {

  const [course, setCourse] = useState<string>(grade.Course)
  const [points, setPoints] = useState<string>(String(grade.Points))
  const [CurrentGradePoint, setCurrentGradePoint] = useState<string>(String(grade.CurrentGradePoint))
  const [newGradePoint, setNewGradePoint] = useState<string>(String(grade.NewGradePoint))

  function normalGrade(): JSX.Element {
    return (
      <label>
        <input
          type="text"
          placeholder="Karakter"
          value={CurrentGradePoint}
          onChange={(event) => {
            setCurrentGradePoint(event.target.value)
          }}
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
          value={CurrentGradePoint}
          className="old-swap-grade-input"
          onChange={(event) => {
            setCurrentGradePoint(event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Ny karakter"
          value={newGradePoint}
          className="old-swap-grade-input"
          onChange={(event) => {
            setNewGradePoint(event.target.value)
          }}
        />
      </label>
    )
  }

  function displayGrade(): React.ReactElement {

    return (
      <div className="grade">
        <button type="button" className="close-btn" onClick={() => {
          removeGrade(grade)
        }}>
          ✕
        </button>
        <form>
          <label>
            <input
              placeholder="Emnenavn"
              type="text"
              // value={GetGradeWithId(currentScenario, gradeId)?.Course}
              value={course}
              onChange={(event) => {
                setCourse(event.target.value)
              }}
              className="grade-input"
            />
          </label>
          <br />
          <br />
          <label>
            <input
              placeholder="Studiepoeng"
              type="text"
              value={points}
              onChange={(event) => {
                setPoints(event.target.value)
              }}
              className="grade-input"
            />
          </label>
          <br />
          <br />
          {grade.SwapGrade ? swapGrade() : normalGrade()}
        </form>
      </div>
    )
  }

  return (
    <>
      {displayGrade()}
    </>
  )
}
