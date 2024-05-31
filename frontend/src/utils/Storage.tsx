import { AVAILABLE_SCENARIO_ID_KEY, SCENARIOS_NAMES_KEY } from './Constants'
import { Scenario } from '../models/Scenario'

export function updateAvailableScenarioId(newAvailableScenarioId: number) {
  localStorage.setItem(AVAILABLE_SCENARIO_ID_KEY, newAvailableScenarioId.toString())
}

/**
 * Gets an unused scenario id from Storage. 
 * Updates the scenario id after each get
 * 
 * @returns null 
 * @returns number 
 */
export function getAvailableScenarioId(): number | null {
  const availableScenarioIdJSON: string | null = localStorage.getItem(AVAILABLE_SCENARIO_ID_KEY)

  if (availableScenarioIdJSON === null) {
    return null
  }

  const availableScenarioId: number | undefined = parseInt(availableScenarioIdJSON, 10)

  if (availableScenarioId === undefined) {
    console.error("the availableScenarioId in local storage is NaN")
    return null
  }

  // update id
  try {
    updateAvailableScenarioId(availableScenarioId + 1)
  } catch (error) {
    console.error("could not update scenario id: " + error)
    return null
  }

  return availableScenarioId
}

export function getScenariosIdNameMap(): Map<number, string> {
  const scenariosJSON: string | null = localStorage.getItem(SCENARIOS_NAMES_KEY)
  if (scenariosJSON === null) {
    console.log("no map found in local storage")
    return new Map<number, string>()
  }

  const scenarios: Map<number, string> = new Map<number, string>(JSON.parse(scenariosJSON))
  if (!(scenarios instanceof Map<number, string>)) {
    console.log("failed to parse scenarios map from localStorage")
    return new Map<number, string>()
  }

  return scenarios
}

/** 
  * returns scenario with id
  *
  * @throws error when failed 
  */
export function getScenarioWithId(id: number): Scenario {
  const scenarioJSON: string | null = localStorage.getItem(id.toString())

  if (scenarioJSON === null) {
    // NOTE: DOUBLE CHECK 
    throw new Error("no scenario with id: " + id)
  }

  const scenario: Scenario | undefined = JSON.parse(scenarioJSON)
  if (scenario === undefined) {
    throw new Error("unable to parse scenario")
  }

  return scenario
}

export function setScenarioToStorage(scenario: Scenario) {
  localStorage.setItem(String(scenario.Id), JSON.stringify(scenario))
}

export function setScenariosIdNameMapToStorage(scenariosNamesMap: Map<number, string>) {
  localStorage.setItem(SCENARIOS_NAMES_KEY, JSON.stringify(Array.from(scenariosNamesMap)))
}

export function removeScenarioFromStorage(scenarioId: number) {
  localStorage.removeItem(String(scenarioId))
}
