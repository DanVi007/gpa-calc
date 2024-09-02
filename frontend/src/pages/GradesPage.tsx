// TODO: Refactor scenario to its own page
// TODO: REMOVE ID FROM DISPLAYED SCENARIOS ONLY FOR EASY DEBUGGING
import "./GradesPage.css";
import { useEffect, useState } from "react";

import { getAvailableScenarioId, getScenariosIdNameMap, getScenarioWithId, removeScenarioFromStorage, setScenariosIdNameMapToStorage, setScenarioToStorage, updateAvailableScenarioId } from "../utils/Storage";
import { getEmptyGradeWithIdAndSwap, Grade } from "../models/Grade";
import { calculateGpa, RemoveGradeWithGradeId, Scenario, UpdateGrade } from "../models/Scenario";
import { INITIAL_SCENARIO, INITIAL_SCENARIO_NAMES_MAP } from "../utils/Constants";
import SingleGrade from "../components/SingleGrade";
import { useScenariosContext } from "../context/ScenarioContext";

export default function GradesPage() {
  const { scenarios, dispatch } = useScenariosContext()

  const [gpa, setGpa] = useState<string>("")
  // NOTE: initial scenario might be wasted if it is retrieved from the localStorage either way
  // TODO: RESOLVE THE NOTE ABOVE
  const [currentScenario, setCurrentScenario] = useState<Scenario>(INITIAL_SCENARIO)
  const [scenarioNamesMap, setScenarioNamesMap] = useState<Map<number, string>>(INITIAL_SCENARIO_NAMES_MAP)

  useEffect(() => {
    try {
      let scenarioNamesMapFound: Map<number, string> = getScenariosIdNameMap()
      if (scenarioNamesMapFound.size !== 0) {
        setScenarioNamesMap(scenarioNamesMapFound)
      }
    } catch (error) {
      console.error("could not set scenario names:" + error)
    }
  }, [])

  useEffect(() => {
    setScenarioToStorage(currentScenario)
  }, [currentScenario])

  useEffect(() => {
    if (scenarioNamesMap !== INITIAL_SCENARIO_NAMES_MAP) {
      setScenariosIdNameMapToStorage(scenarioNamesMap)
    }
  }, [scenarioNamesMap])

  function addEmptyGrade(swap: boolean) {
    let newId = currentScenario.AvailableGradeId

    const emptyGrade: Grade = getEmptyGradeWithIdAndSwap(swap, newId)

    setCurrentScenario({
      ...currentScenario,
      AvailableGradeId: newId + 1,
      Grades: [...currentScenario.Grades, emptyGrade]
    })

  }

  function getNextKeyInMap(key: any, map: Map<any, any>) {
    const entries = Array.from(map.keys());
    const index = entries.indexOf(key);
    if (index === entries.length - 1 && entries.length > 1) { // last entry 
      return entries[index - 1]
    } else if (index !== -1 && index < entries.length - 1) { // not last 
      return entries[index + 1]; // Return the next key
    }
    return null; // Return null if there is no next key
  }


  function removeScenarioWithId(scenarioId: number) {
    // if scenario to remove is the current scenario
    if (scenarioId === currentScenario.Id) {
      // get next scenario from scenarioId
      const replacementKey: number | null = getNextKeyInMap(scenarioId, scenarioNamesMap)
      if (replacementKey !== null) {
        setCurrentScenario(getScenarioWithId(replacementKey))
      } else {
        setCurrentScenario(INITIAL_SCENARIO)
      }
    }

    // remove from map
    const newMap: Map<number, string> = new Map<number, string>(scenarioNamesMap)
    newMap.delete(scenarioId)
    setScenarioNamesMap(newMap)

    // remove from storage
    removeScenarioFromStorage(scenarioId)
  }

  /**
   * Adds a new scenario to website and not local storage
   */
  function addNewScenario() {
    // Adding new scenario
    let id: number | null = getAvailableScenarioId();
    if (id === null) {
      id = 0
      updateAvailableScenarioId(id)
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
        Grades: currentScenario.Grades,
      };
    }

    setCurrentScenario(newScenario);

    if (scenarioNamesMap === undefined) {
      const keyValuePair: [number, string][] = [[newScenario.Id, newScenario.Name]]
      setScenarioNamesMap(new Map<number, string>(keyValuePair))
    } else {
      setScenarioNamesMap(prevMap => {
        const newMap = new Map(prevMap)
        newMap.set(newScenario.Id, newScenario.Name)
        return newMap
      })
    }
  }

  function onClickScenario(scenarioId: number) {
    try {
      setCurrentScenario(getScenarioWithId(scenarioId))
    } catch (error) {
      console.error("could not find scenario with id: " + scenarioId)
    }
  }

  function displayScenarios(): React.ReactElement[] {
    let scenarioButtons: React.ReactElement[] = []
    if (scenarioNamesMap) {
      scenarioNamesMap.forEach((scenarioName, scenarioId) => {
        let scenarioButton: React.ReactElement =
          <span>
            <button key={scenarioId} onClick={() => { onClickScenario(scenarioId) }}>
              {scenarioName}{scenarioId}
            </button>
            <button key={`remove${scenarioId}`} onClick={() => { removeScenarioWithId(scenarioId) }}>
              X
            </button>
          </span >

        scenarioButtons = [...scenarioButtons, scenarioButton]

      });
    }
    return scenarioButtons
  }

  function loadGradeToParent(grade: Grade) {
    setCurrentScenario(UpdateGrade(currentScenario, grade))
  }

  function removeGrade(grade: Grade) {
    setCurrentScenario(RemoveGradeWithGradeId(currentScenario, grade.Id))
  }

  function displayGrades(): React.ReactElement[] {
    let grades: React.ReactElement[] = [];
    if (currentScenario) {
      grades = currentScenario.Grades.map((grade, index) => (
        <SingleGrade key={grade.Id} grade={grade} removeGrade={removeGrade} loadGradeToParent={loadGradeToParent} />
      ));
    }
    return grades;
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
        <span> Current scenario: {currentScenario.Name}{currentScenario.Id}</span>
        <button type="button" id="add-scenario-btn" className="button-bar-btn" onClick={addNewScenario}>+</button>
      </div>
      <div>
        {displayScenarios()}
      </div>
      <div className="gradesPage">{displayGrades()}</div>
    </div >
  );
}
