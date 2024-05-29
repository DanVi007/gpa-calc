import { ChangeEvent, useState } from "react";
import { Grade, setCourse, setCurrentGradePoint, setNewGradePoint, setPoints } from "../models/Grade";
export default function SingleGrade(
  {
    grade,
    removeGrade,
    loadGradeToParent,
  }:
    {
      grade: Grade,
      removeGrade: (grade: Grade) => void,
      loadGradeToParent: (grade: Grade) => void
    }
) {

  const [course, setLocalCourse] = useState<string>(grade.Course)
  const [points, setLocalPoints] = useState<string>(String(grade.Points))
  const [CurrentGradePoint, setLocalCurrentGradePoint] = useState<string>(String(grade.CurrentGradePoint))
  const [newGradePoint, setLocalNewGradePoint] = useState<string>(String(grade.NewGradePoint))

  const [correctGrade, setCorrectGrade] = useState<Grade>(grade)

  const [valid, setValid] = useState<boolean>(true)


  function handleBlurInputs() {
    if (valid) {
      loadGradeToParent(correctGrade)
    }
  }

  function handleChangeCourse(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value
    setLocalCourse(userInput)

    try {
      setCorrectGrade(setCourse(correctGrade, userInput))
    } catch (error) {
      setValid(false)
      console.log("user input error in setting course: " + error)
    }
  }

  function handleChangePoints(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value
    setLocalPoints(userInput)

    try {
      setCorrectGrade(setPoints(correctGrade, userInput))
    } catch (error) {
      setValid(false)
      console.log("user input error in setting points: " + error)
    }
  }

  function handleChangeCurrentGradePoint(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value
    setLocalCurrentGradePoint(userInput)

    try {
      setCorrectGrade(setCurrentGradePoint(correctGrade, userInput))
    } catch (error) {
      setValid(false)
      console.log("user input error in setting current grade: " + error)
    }
  }

  function handleChangeNewGradePoint(event: ChangeEvent<HTMLInputElement>) {
    const userInput = event.target.value
    setLocalNewGradePoint(userInput)

    try {
      setCorrectGrade(setNewGradePoint(correctGrade, userInput))
    } catch (error) {
      setValid(false)
      console.log("user input error in setting new grade: " + error)
    }
  }

  function normalGrade(): JSX.Element {
    return (
      <label>
        <input
          type="text"
          placeholder="Karakter"
          value={CurrentGradePoint}
          onChange={handleChangeCurrentGradePoint}
          onBlur={handleBlurInputs}
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
          onChange={handleChangeCurrentGradePoint}
          onBlur={handleBlurInputs}
        />
        <input
          type="text"
          placeholder="Ny karakter"
          value={newGradePoint}
          className="old-swap-grade-input"
          onChange={handleChangeNewGradePoint}
          onBlur={handleBlurInputs}
        />
      </label>
    )
  }

  function displayGrade(): React.ReactElement {

    return (
      <div className="grade" id={"grade" + String(grade.Id)}>
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
              value={course}
              onChange={handleChangeCourse}
              onBlur={handleBlurInputs}
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
              onChange={handleChangePoints}
              onBlur={handleBlurInputs}
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
