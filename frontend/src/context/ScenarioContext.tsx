import { Scenario } from "../models/Scenario"
import { createContext, useContext, useReducer } from "react";
import type { Dispatch, FC, ReactNode, Reducer } from "react";

const initialScenarios: Scenario[] = [{
  Id: 1,
  Name: "hello",
  AvailableGradeId: 1,
  Grades: [
    {
      Id: 1,
      Course: "matte",
      Points: 5,
      CurrentGradePoint: 1,
      SwapGrade: false,
      NewGradePoint: 1
    }
  ]
}]

const ScenariosContext = createContext<Scenario[] | null>(null);
const ScenariosDispatchContext = createContext<Dispatch<ActionType> | null>(null);

type ActionType =
  | { type: "ADD_SCENARIO"; scenario: Scenario }
  | { type: "DELETE_SCENARIO"; id: number };

type Props = {
  children: ReactNode;
};

// export const tasksReducer: Reducer<TaskType[], ActionType> = (
const scenariosReducer: Reducer<Scenario[], ActionType> = (scenarios, action) => {
  switch (action.type) {
    case "ADD_SCENARIO": {
      return [
        ...scenarios,
        action.scenario
      ];
    }
    case "DELETE_SCENARIO": {
      return scenarios.filter((scenario) => scenario.Id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + (action as any).type);
    }
  }
};

export const ScenariosProvider: FC<Props> = ({ children }) => {
  const [scenarios, dispatch] = useReducer(scenariosReducer, initialScenarios);
  return (
    <ScenariosContext.Provider value={scenarios} >
      <ScenariosDispatchContext.Provider value={dispatch}>
        {children}
      </ScenariosDispatchContext.Provider>
    </ScenariosContext.Provider >
  );
};

export const useScenariosContext = () => {
  const scenarios = useContext(ScenariosContext);
  const dispatch = useContext(ScenariosDispatchContext);
  return { scenarios, dispatch };
};
