import "./GradesPage.css";
import { useEffect, useState } from "react";

import { getAvailableScenarioId, getScenarioWithId, setScenarioToStorage } from "../utils/Storage";
import { Grade, setCourse, setCurrentGradePoint, setNewGradePoint, setPoints } from "../models/Grade";
import { calculateGpa, RemoveGradeWithGradeId, Scenario, UpdateGrade } from "../models/Scenario";
import { INITIAL_SCENARIO, INITIAL_SCENARIO_NAMES_MAP } from "../utils/Constants";
import SingleGrade from "../components/SingleGrade";

export default function GradesPage() {

  const [gpa, setGpa] = useState<string>("")
  // NOTE: initial scenario might be wasted if it is retrieved from the localStorage either way
  const [currentScenario, setCurrentScenario] = useState<Scenario>(INITIAL_SCENARIO)
  const [scenarioNamesMap, setScenarioNamesMap] = useState<Map<number, string>>(INITIAL_SCENARIO_NAMES_MAP)

  useEffect(() => {
    setScenarioToStorage(currentScenario)
  }, [currentScenario])

  function addEmptyGrade(swap: boolean) {
    let newId = currentScenario.AvailableGradeId

    const emptyGrade: Grade = {
      Id: newId,
      Course: "",
      Points: "",
      CurrentGradePoint: '',
      SwapGrade: swap,
      NewGradePoint: "",
    };

    setCurrentScenario({
      ...currentScenario,
      AvailableGradeId: newId + 1,
      Grades: [...currentScenario.Grades, emptyGrade]
    })

  }

  /**
   * Adds a new scenario to website and not local storage
   */
  function addNewScenario() {
    // Adding new scenario
    let id: number | null = getAvailableScenarioId();
    if (id === null) {
      id = 0
    }

    let newScenario: Scenario = {
      Id: id,
      Name: "new scenario",
      AvailableGradeId: 0,
      Grades: []
    };

    // reuse current scenario if exists
    if (currentScenario !== undefined) {
      newScenario = {
        ...newScenario,
        AvailableGradeId: currentScenario.AvailableGradeId,
        Grades: currentScenario.Grades
      };
    }

    setCurrentScenario(newScenario);

    if (scenarioNamesMap === undefined) {
      const keyValuePair: [number, string][] = [[newScenario.Id, newScenario.Name]]
      setScenarioNamesMap(new Map<number, string>(keyValuePair))
    } else {
      setScenarioNamesMap(scenarioNamesMap.set(newScenario.Id, newScenario.Name))
    }
  }


  function displayScenarios(): React.ReactElement[] {
    let scenarioButtons: React.ReactElement[] = []
    if (scenarioNamesMap) {
      scenarioNamesMap.forEach((scenarioName, scenarioId) => {
        try {
          const scenario: Scenario = getScenarioWithId(scenarioId)
          let scenarioButton: React.ReactElement =
            <button onClick={() => { setCurrentScenario(scenario) }}>
              {scenarioName}
            </button>

          scenarioButtons = [...scenarioButtons, scenarioButton]

        } catch (error) {
          console.error(error)
        }
      });
    }
    return scenarioButtons
  }


  function removeGrade(grade: Grade) {
    setCurrentScenario(RemoveGradeWithGradeId(currentScenario, grade.Id))
  }


  function displayGrades(): React.ReactElement[] {
    let grades: React.ReactElement[] = []
    if (currentScenario) {
      currentScenario.Grades.map((grade) => {
        // grades = [...grades, displayGrade(grade)]
        grades = [...grades, <SingleGrade key={grade.Id} grade={grade} removeGrade={removeGrade} />]
      })
    }
    return grades
  }




  return (
    <div>
      <div className="button-bar">
        <button id="calculate-grade-btn" className="button-bar-btn"
          type="button"
          onClick={() => {
            if (currentScenario) {
              setGpa(calculateGpa(currentScenario))
            } else {
              setGpa("")
            }
          }}>
          Beregn karakter
        </button>
        <span>GPA: {gpa}</span>
        <button type="button" id="add-swap-grade-btn" className="button-bar-btn" onClick={() => addEmptyGrade(true)}>
          &lt;&gt;
        </button>
        <button type="button" id="add-grade-btn" className="button-bar-btn" onClick={() => addEmptyGrade(false)}>
          +
        </button>
        <span> Current scenario: {currentScenario.Name}</span>
        <button type="button" id="add-scenario-btn" className="button-bar-btn" onClick={addNewScenario}>+</button>
      </div>
      <div>
        {displayScenarios()}
      </div>
      <div className="gradesPage">{displayGrades()}</div>
    </div >
  );
}
