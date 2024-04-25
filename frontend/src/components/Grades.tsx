import SingleGrade from "./SingleGrade";
import "./Grades.css";
import { useEffect, useState } from "react";
import { Grade } from "../models/Grade";

export default function Grades() {

  const [availableGradeId, setAvailableGradeId] = useState<number>(0);
  const [grades, setGrades] = useState<Grade[]>();
  // TODO: make functionality to set new scenario
  const [currentScenario, setCurrentScenario] = useState<string>("initial")
  const [gpa, setGpa] = useState<string>("")

  function addEmptyGrade() {

    const newId = availableGradeId
    setAvailableGradeId(availableGradeId + 1)
    const emptyGrade: Grade = {
      Id: String(newId),
      Course: "",
      Points: "",
      GradePoint: '',
    };
    if (grades) {
      setGrades([...grades, emptyGrade]);
    } else {
      setGrades([emptyGrade])
    }

  }

  // NOTE: Should this be updated on useeffect or does react do it automatically,
  // it currently seems like they do. Google it.
  function displayGrades() {
    if (grades) {
      return grades.map((grade, index) => (
        <SingleGrade grade={grade} index={index} grades={grades} setGrades={setGrades} key={grade.Id} />
      ));
    }
  }



  /**
    * Validates gradePoint, throws Error if grade is not valid
    * @throws {Error}
    */
  function validateGradePoints(gradePoint: number | string): number {
    // returns if valid number
    let gradePointNum = Number(gradePoint);
    if (!isNaN(gradePointNum) && gradePointNum >= 0 && gradePointNum <= 5) {
      return gradePointNum;
    }

    // check if it is a letter and returns if valid
    // NOTE: can probably use charCodeAt, but this is more safe and less hacky.
    // this uses more memory though..
    const gradeLetterToNumberMap = new Map<string, number>([
      ["a", 5],
      ["b", 4],
      ["c", 3],
      ["d", 2],
      ["e", 1],
      ["f", 0],
    ]);

    if (typeof gradePoint === "string") {
      let gradeNumber: number | undefined = gradeLetterToNumberMap.get(gradePoint.toLowerCase())
      if (typeof gradeNumber === "number") {
        return gradeNumber
      }
    }

    throw new Error("GradePoint is not valid")
  }


  // TODO: add message on invalid grade
  function calculateGpa() {
    if (!grades) {
      setGpa("0")
      return
    }

    let gradePoints = 0
    let totalStudyPoints = 0
    let valid = true

    for (let i = 0; i < grades.length && valid; i++) {
      const grade = grades[i]
      if (grade.Points === '') {
        console.error("Study points is not set")
        valid = false
        break
      }

      try {
        gradePoints += validateGradePoints(grade.GradePoint) * grade.Points;
        totalStudyPoints += grade.Points;
      } catch (error) {
        console.error(error)
        valid = false
      }
    }
    // TODO: ROUND AND CHECK HOW UNIVERSITIES ROUND
    if (valid) {
      setGpa(String(gradePoints / totalStudyPoints))
    } else {
      console.error("There are some invalid fields")
      setGpa('')
    }
  }

  useEffect(
    function saveGrades() {
      if (grades) {
        localStorage.setItem(currentScenario, JSON.stringify(grades))
      }
    }, [grades, currentScenario]
  )

  useEffect(
    function getGrades() {
      const retrievedStorage: string | null = localStorage.getItem(currentScenario)
      if (retrievedStorage) {
        // TODO: check JSON parse is correct object
        // WARNING: Source map error: Error: JSON.parse: unexpected character at line 1 column 1 of the JSON data
        // Resource URL: 
        // Source Map URL: react_devtools_backend_compact.js.map
        try {
          const retrievedGrades: Grade[] = JSON.parse(retrievedStorage);
          setGrades(retrievedGrades)
        } catch (error) {
          console.error(error);
        }
      }
    }, [currentScenario]
  )

  return (
    <div>
      <div className="button-bar">
        <button id="calculate-grade-btn" className="button-bar-btn" type="button" onClick={calculateGpa}>
          Beregn karakter
        </button>
        <span>{grades?.length}</span>
        <span>GPA: {gpa}</span>
        <button type="button" id="add-grade-btn" className="button-bar-btn" onClick={addEmptyGrade}>
          +
        </button>
      </div>
      <div className="grades">{displayGrades()}</div>
    </div>
  );
}
