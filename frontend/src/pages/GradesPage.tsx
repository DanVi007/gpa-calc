import "./GradesPage.css";
import { useEffect, useState } from "react";

import { getAvailableScenarioId, getScenarioWithId, setScenarioToStorage } from "../utils/Storage";
import { Grade, setCourse, setCurrentGradePoint, setNewGradePoint, setPoints } from "../models/Grade";
import { calculateGpa, RemoveGradeWithGradeId, Scenario, UpdateGrade } from "../models/Scenario";
import { INITIAL_SCENARIO, INITIAL_SCENARIO_NAMES_MAP } from "../utils/Constants";

export default function GradesPage() {

  const [gpa, setGpa] = useState<string>("")
  // NOTE: initial scenario might be wasted if it is retrieved from the localStorage either way
  const [currentScenario, setCurrentScenario] = useState<Scenario>(INITIAL_SCENARIO)
  const [scenarioNamesMap, setScenarioNamesMap] = useState<Map<number, string>>(INITIAL_SCENARIO_NAMES_MAP)

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

  function normalGrade(grade: Grade): JSX.Element {
    return (
      <label>
        <input
          type="text"
          placeholder="Karakter"
          value={grade.CurrentGradePoint}
          onChange={(event) => {
            setCurrentGradePoint(grade, event.target.value)
          }}
          className="grade-input"
        />
      </label>
    )
  }


  function swapGrade(grade: Grade): JSX.Element {
    return (
      <label>
        <input
          type="text"
          placeholder="Gammel karakter"
          value={grade.CurrentGradePoint}
          className="old-swap-grade-input"
          onChange={(event) => {
            setCurrentGradePoint(grade, event.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Ny karakter"
          value={grade.NewGradePoint}
          className="old-swap-grade-input"
          onChange={(event) => {
            setNewGradePoint(grade, event.target.value)
          }}
        />
      </label>
    )
  }

  function displayGrade(grade: Grade): React.ReactElement {

    return (
      <div className="grade">
        <button type="button" className="close-btn" onClick={() => {
          setCurrentScenario(RemoveGradeWithGradeId(currentScenario, grade.Id))
        }}>
          ✕
        </button>
        <form>
          <label>
            <input
              placeholder="Emnenavn"
              type="text"
              // value={GetGradeWithId(currentScenario, gradeId)?.Course}
              value={grade.Course}
              onChange={(event) => {
                setCurrentScenario(UpdateGrade(currentScenario, setCourse(grade, event.target.value)))
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
              value={grade.Points}
              onChange={(event) => {
                setCurrentScenario(UpdateGrade(currentScenario, setPoints(grade, event.target.value)))
              }}
              className="grade-input"
            />
          </label>
          <br />
          <br />
          {grade.SwapGrade ? swapGrade(grade) : normalGrade(grade)}
        </form>
      </div>
    )
  }


  function displayGrades(): React.ReactElement[] {
    let grades: React.ReactElement[] = []
    if (currentScenario) {
      currentScenario.Grades.map((grade) => {
        grades = [...grades, displayGrade(grade)]
      })
    }
    return grades
  }

  useEffect(() => {
    setScenarioToStorage(currentScenario)
  }, [currentScenario])



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
  //   useEffect(
  //     function saveGrades() {
  //       if (grades) {
  //         localStorage.setItem(currentScenario, JSON.stringify(grades))
  //       }
  //     }, [grades, currentScenario]
  //   )
  //
  //   useEffect(
  //     function setScenarios() {
  //       if (scenarios) {
  //         localStorage.setItem(SCENARIOS_KEY, JSON.stringify(scenarios))
  //       }
  //     }, [scenarios]
  //   )
  //
  //   useEffect(
  //     function getGrades() {
  //       const retrievedStorage: string | null = localStorage.getItem(currentScenario)
  //       if (retrievedStorage) {
  //         // TODO: check JSON parse is correct object
  //         // WARNING: Source map error: Error: JSON.parse: unexpected character at line 1 column 1 of the JSON data
  //         // Resource URL:
  //         // Source Map URL: react_devtools_backend_compact.js.map
  //         try {
  //           const retrievedGrades: Grade[] = JSON.parse(retrievedStorage);
  //           setGrades(retrievedGrades)
  //           console.log(grades)
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     }, [currentScenario]
  //   )
  //
  //   useEffect(
  //     function getScenarios() {
  //       const retrievedStorage: string | null = localStorage.getItem(SCENARIOS_KEY)
  //       if (retrievedStorage) {
  //         // TODO: check JSON parse is correct object
  //         // WARNING: Source map error: Error: JSON.parse: unexpected character at line 1 column 1 of the JSON data
  //         // Resource URL:
  //         // Source Map URL: react_devtools_backend_compact.js.map
  //         try {
  //           const retrievedScenarios: string[] = JSON.parse(retrievedStorage);
  //           setScenarios(retrievedScenarios)
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     }, []
  //   )
  //
  //   function displayScenarios() {
  //     if (scenarios) {
  //       return scenarios.map((scenario) => (
  //         <button onClick={() => { setCurrentScenario(scenario) }}>{scenario} </button>
  //       ));
  //     }
  //   }
  //
  //   return (
  //     <div>
  //       <div className="button-bar">
  //         <button id="calculate-grade-btn" className="button-bar-btn" type="button" onClick={calculateGpa}>
  //           Beregn karakter
  //         </button>
  //         <span>GPA: {gpa}</span>
  //         <button type="button" id="add-swap-grade-btn" className="button-bar-btn" onClick={() => addEmptyGrade(true)}>
  //           &lt;&gt;
  //         </button>
  //         <button type="button" id="add-grade-btn" className="button-bar-btn" onClick={() => addEmptyGrade(false)}>
  //           +
  //         </button>
  //         <span> Current scenario: {currentScenario}</span>
  //         <button type="button" id="add-scenario-btn" className="button-bar-btn" onClick={() => { setScenarios([...scenarios, "new scenario"]) }}>+</button>
  //       </div>
  //       <div>
  //         {displayScenarios()}
  //       </div>
  //       <div className="gradesPage">{displayGrades()}</div>
  //     </div >
  //   );
//
  //   // NOTE: Should this be updated on useeffect or does react do it automatically,
  //   // it currently seems like they do. Google it.
  //   function displayGrades() {
  //     if (grades) {
  //       return grades.map((grade, index) => (
  //         <SingleGrade grade={grade} index={index} grades={grades} setGrades={setGrades} key={grade.Id} swap={grade.SwapGrade} />
  //       ));
  //     }
  //   }
