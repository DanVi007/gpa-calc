import SingleGrade from "./SingleGrade";
import "./Grades.css";
import { useEffect, useState } from "react";
import { Grade } from "../models/Grade";

export default function Grades() {

  const [grades, setGrades] = useState<Grade[]>();
  // TODO: make functionality to set new scenario
  const [currentScenario, setCurrentScenario] = useState<string>("initial")
  const [gpa, setGpa] = useState<string>("")

  function addEmptyGrade() {
    const newId = grades?.length || 0
    const emptyGrade: Grade = {
      Id: String(newId),
      Course: "",
      Points: "",
      Grade: '',
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

  // HACK:  A bit hacky find a better way
  const validGrades: (number | string)[] = [0, 1, 2, 3, 4, 5, "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5"]
  // NOTE: can probably use charCodeAt, but this is more safe and less hacky.
  // this uses more memory though..
  const gradeLetterToNumberMap = new Map<string, number>([
    ["a", 5],
    ["b", 4],
    ["c", 3],
    ["d", 2],
    ["e", 1],
    ["f", 0],
    ["5", 5],
    ["4", 4],
    ["3", 3],
    ["2", 2],
    ["1", 1],
    ["0", 0],
  ]);
  function calculateGpa() {
    if (!grades) {
      setGpa("0")
      return
    }

    let gradePoints = 0
    let totalStudyPoints = 0

    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i]
      if (validGrades.includes(grade.Grade) && grade.Points !== '') {
        if (typeof grade.Grade === "string") {
          let gradeNumber = gradeLetterToNumberMap.get(grade.Grade.toLowerCase()) || 0
          gradePoints += gradeNumber * grade.Points
        } else {
          gradePoints += grade.Grade * grade.Points
        }
        totalStudyPoints += grade.Points
      } else {
        // TODO: give proper error message 
        console.error("Grade not valid, please set valid grade")
        return
      }
    }
    // TODO: FIX ROUNDING AND CHECK HOW UNIVERSITIES ROUND
    setGpa(String(gradePoints / totalStudyPoints))
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
      <button type="button" onClick={addEmptyGrade}>
        +
      </button>
      <button type="button" onClick={calculateGpa}>
        calculate gpa
      </button>
      <div>GPA: {gpa}</div>
      <div className="grades">{displayGrades()}</div>
    </div>
  );
}
