import { Scenario } from "../models/Scenario"

export const AVAILABLE_SCENARIO_ID_KEY: string = "AVAILABLE_SCENARIO_ID"
export const SCENARIOS_NAMES_KEY: string = "SCENARIO_NAMES"

export const INITIAL_SCENARIO: Scenario = {
  Id: -1,
  Name: "Initial",
  AvailableGradeId: 0,
  Grades: [],
}

const initialScenarioNameMap: [number, string][] = [[INITIAL_SCENARIO.Id, INITIAL_SCENARIO.Name]]
export const INITIAL_SCENARIO_NAMES_MAP: Map<number, string> = new Map<number, string>(initialScenarioNameMap);

// check if it is a letter and returns if valid
// NOTE: can probably use charCodeAt, but this is more safe and less hacky.
// this uses more memory though..
export const GRADE_LETTER_TO_NUMBER_MAP = new Map<string, number>([
  ["a", 5],
  ["b", 4],
  ["c", 3],
  ["d", 2],
  ["e", 1],
  ["f", 0],
]);
