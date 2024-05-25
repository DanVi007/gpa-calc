import { Grade, parseGradePointToNumber } from "./Grade"

export interface Scenario {
  Id: number
  Name: string
  AvailableGradeId: number
  Grades: Grade[]
}

export function RemoveGradeWithGradeId(scenario: Scenario, id: number): Scenario {
  let newGrades: Grade[] = scenario.Grades.filter((grade) => grade.Id !== id)
  let newScenario: Scenario = {
    ...scenario,
    Grades: newGrades
  }
  return newScenario
}

export function UpdateGrade(scenario: Scenario, grade: Grade): Scenario {
  let newGrades: Grade[] = scenario.Grades.map((g) => {
    if (g.Id === grade.Id) {
      return grade
    }
    return g
  })

  let newScenario: Scenario = {
    ...scenario,
    Grades: newGrades
  }

  return newScenario
}

// TODO: add message on invalid grade
export function calculateGpa(scenario: Scenario): string {

  let gradePoints = 0
  let totalStudyPoints = 0
  let valid = true
  let grades = scenario.Grades

  for (let i = 0; i < grades.length && valid; i++) {
    const grade = grades[i]
    if (grade.Points === '') {
      console.error("Study points is not set")
      valid = false
      break
    }

    try {
      gradePoints += parseGradePointToNumber(grade.CurrentGradePoint) * grade.Points;
      totalStudyPoints += grade.Points;
    } catch (error) {
      console.error(error)
      valid = false
    }
  }
  // TODO: CHECK HOW OTHER UNIVERSITIES ROUND
  if (valid) {
    return String((gradePoints / totalStudyPoints).toFixed(2))
  } else {
    console.error("There are some invalid fields")
    return ''
  }
}
