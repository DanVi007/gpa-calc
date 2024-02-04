import SingleGrade from "./SingleGrade";
import "./Grades.css";
import { useEffect, useState } from "react";
import { Grade } from "../models/Grade";
import { resolveTypeReferenceDirective } from "typescript";

export default function Grades() {

  const [grades, setGrades] = useState<Grade[]>();
  const [currentScenario, setCurrentScenario] = useState<string>("initial")

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
      <div className="grades">{displayGrades()}</div>
    </div>
  );
}
