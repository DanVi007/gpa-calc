import SingleGrade from "../components/SingleGrade.jsx";
import styles from "./MainPage.module.css";

function displayGrades() {
	return <SingleGrade />;
}

function MainPage() {
	return (
		<div>
			<div className={styles.grades}>{displayGrades()}</div>
			<button type="button">+</button>
		</div>
	);
}
export default MainPage;
