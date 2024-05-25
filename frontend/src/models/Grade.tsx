import { GRADE_LETTER_TO_NUMBER_MAP } from "../utils/Constants"


export interface Grade {
  Id: number
  Course: string;
  Points: number | '';
  CurrentGradePoint: number | string;
  SwapGrade: boolean;
  NewGradePoint: number | string;
}

export function setCourse(grade: Grade, newCourse: string): Grade {
  return { ...grade, Course: newCourse }
}

export function setPoints(grade: Grade, newPoints: number): Grade {
  return { ...grade, Points: newPoints }
}

export function parseGradePointToNumber(gradePoint: number | string): number {
  // returns if valid number
  let gradePointNum = Number(gradePoint);
  if (!isNaN(gradePointNum) && gradePointNum >= 0 && gradePointNum <= 5) {
    return gradePointNum;
  }

  if (typeof gradePoint === "string") {
    let gradeNumber: number | undefined = GRADE_LETTER_TO_NUMBER_MAP.get(gradePoint.toLowerCase())
    if (typeof gradeNumber === "number") {
      return gradeNumber
    }
  }
  throw new Error("GradePoint is not valid")
}

export function setCurrentGradePoint(grade: Grade, newCurrentGradePoint: number | string): Grade {
  return { ...grade, CurrentGradePoint: parseGradePointToNumber(newCurrentGradePoint) }
}

// NOTE: a bit weird name newnew...
export function setNewGradePoint(grade: Grade, newNewGradePoint: number | string): Grade {
  return { ...grade, NewGradePoint: parseGradePointToNumber(newNewGradePoint) }
}

