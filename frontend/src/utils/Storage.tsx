import { AVAILABLE_SCENARIO_ID_KEY, SCENARIOS_KEY } from './Constants'
import { Scenario } from '../models/Scenario'

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
  localStorage.setItem(AVAILABLE_SCENARIO_ID_KEY, (availableScenarioId + 1).toString())

  return availableScenarioId
}


/**
 * Get all the scenario names in storage
 *
 * @returns string[]
 */
export function getScenariosIdNameMap(): Map<number, string> {
  const scenariosJSON: string | null = localStorage.getItem(SCENARIOS_KEY)
  if (scenariosJSON === null) {
    console.log("no map found in local storage")
    return new Map<number, string>()
  }

  const scenarios: Map<number, string> | undefined = JSON.parse(scenariosJSON)
  if (scenarios === undefined) {
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

