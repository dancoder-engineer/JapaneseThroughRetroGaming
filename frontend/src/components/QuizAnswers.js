
import { useHistory } from "react-router-dom"

function QuizAnswers({answers, mcAnswers, quizData, allQuestions, useKanji}) {

    let history = useHistory()

    let kanji
    if (useKanji) {kanji = 0}
    if (!useKanji) {kanji = 1}

    //console.log(answers)

    let multiplechoiceAnswers = quizData.multipleChoiceQuestions.map((i, place) => {
        let rightAnswer
        let yourAnswer
        if (i.correctChoice === "A") { rightAnswer = i.choices[0][kanji] }
        if (i.correctChoice === "B") { rightAnswer = i.choices[1][kanji] }
        if (i.correctChoice === "C") { rightAnswer = i.choices[2][kanji] }
        if (i.correctChoice === "D") { rightAnswer = i.choices[3][kanji] }

        if (answers[place] === "A") { yourAnswer = i.choices[0][kanji] }
        if (answers[place] === "B") { yourAnswer = i.choices[1][kanji] }
        if (answers[place] === "C") { yourAnswer = i.choices[2][kanji] }
        if (answers[place] === "D") { yourAnswer = i.choices[3][kanji] }
        if (answers[place] === null) { yourAnswer = "Not Attempted" }

        let rightSpiel
        if (rightAnswer === yourAnswer) { rightSpiel = "Correct! Excellent job!"}
        else if (yourAnswer === "Not Attempted") { rightSpiel = "" }
        else { rightSpiel = "Sorry, that's not right. Look at the right answer and see if you can see why it's right."}

        return(
        <div key={place}>
            <p id={place+1}>Question {place + 1}: {i.Question}<br />
            Correct Answer: {rightAnswer}<br />
            Your Answer: {yourAnswer}<br />
            {rightSpiel}
            </p>
        </div>
    )})



    function toMenu() {
        history.push("../../")
    }

    return(
        <div>
            <button onClick={toMenu}>Return to Main Menu</button>
            <br />
            <br />
            {multiplechoiceAnswers}
             
        </div>
    )
}


export default QuizAnswers