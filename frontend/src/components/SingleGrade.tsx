import "./SingleGrade.css";

export default function SingleGrade() {
  return (
    <div className="box">
      <form>
        <label>
          Emnenavn: <input type="text" />
        </label>
        <br />
        <br />
        <label>
          Studiepoeng: <input type="text" />
        </label>
        <br />
        <br />
        <label>
          Karakter: <input type="text" />
        </label>
      </form>
    </div>
  );
}
