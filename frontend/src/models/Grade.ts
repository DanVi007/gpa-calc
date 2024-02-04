// TODO: REFACTOR SO GRADE POINTS AND GRADE IS STRICTER, CHECK BEFORE ADDING 
// TO GRADES INSTEAD
export interface Grade {
  Id: string
  Course: string;
  Points: number | '';
  Grade: number | string;
}
