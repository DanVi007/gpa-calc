import styles from "./SingleGrade.module.css";
function SingleGrade() {
  return (
    <div className= {styles.box}>
      <form>
        <label> Emnenavn: <input type="text"/> </label>
        <br/><br/>
        <label> Studiepoeng: <input type="text"/> </label>
        <br/><br/>
        <label> Karakter: <input type="text"/> </label>
      </form> 
    </div>
  );
};

export default SingleGrade
