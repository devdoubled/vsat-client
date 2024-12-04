import { Radio } from "antd";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import styles from "./EditLessonContentQuestion.module.scss";
const cx = classNames.bind(styles);
function EditLessonContentQuestion({ questionData, updateQuestionData }) {
  const [question, setQuestion] = useState();
  const [explanation, setExplanation] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);

  useEffect(() => {
    if (questionData) {
      setQuestion(questionData.prompt || "");
      setExplanation(questionData.explanation || "");
      setAnswers(
        questionData.answers?.length > 0
          ? questionData.answers
          : [
            { answerId: uuidv4(), text: "", label: "A" },
            { answerId: uuidv4(), text: "", label: "B" },
            { answerId: uuidv4(), text: "", label: "C" },
            { answerId: uuidv4(), text: "", label: "D" },
          ]
      );
      setCorrectAnswerId(
        questionData.answers.find(
          (answer) => answer.label === questionData.correctAnswer
        )?.answerId || null
      );
    }
  }, [questionData]);

  const handleAddAnswer = () => {
    if (answers.length < 4) {
      const nextLabel = String.fromCharCode(65 + answers.length);
      setAnswers([
        ...answers,
        { answerId: uuidv4(), text: "", label: nextLabel },
      ]);
    }
  };

  const handleAnswerChange = (answerId, value) => {
    setAnswers(
      answers.map((answer) =>
        answer.answerId === answerId ? { ...answer, text: value } : answer
      )
    );
  };

  const handleRemoveAnswer = (answerId) => {
    if (answers.length > 1) {
      const filteredAnswers = answers.filter(
        (answer) => answer.answerId !== answerId
      );
      setAnswers(filteredAnswers);

      if (correctAnswerId === answerId) {
        setCorrectAnswerId(null);
      }
    }
  };

  const handleCorrectAnswerSelect = (answerData) => {
    setCorrectAnswerId(answerData.answerId);
  };

  const handleUpdateQuestion = () => {
    const updatedQuestion = {
      ...questionData,
      prompt: question,
      explanation: explanation,
      correctAnswer: answers.find((answer) => answer.answerId === correctAnswerId)?.label,
      answers: answers,
    };

    if (updateQuestionData) {
      updateQuestionData(updatedQuestion);
    }
  };

  return (
    <div className={cx("create-question-editor")}>
      <div className={cx("create-question-main")}>
        <div className={cx("question-main-top")}>
          <div className={cx("question-title")}>Question</div>
          <div className={cx("question-main-action")}>
            <button
              className={cx("done-btn")}
              onClick={handleUpdateQuestion}
            >
              Done
            </button>
            <button className={cx("delete-btn")}>
              <i className={cx("fa-regular fa-trash", "trash-icon")}></i>
            </button>
          </div>
        </div>
        <div className={cx("question-main-input")}>
          <ReactQuill
            className={cx("question-input")}
            theme="snow"
            value={question}
            onChange={(value) => setQuestion(value)}
            placeholder={"Write your question here..."}
          />
        </div>
      </div>
      <div className={cx("create-question-answer")}>
        <div className={cx("question-answer-title")}>
          Answer: Choose a single correct answer
        </div>
        <div className={cx("question-answer-list")}>
          {answers.map((answer, index) => (
            <div className={cx("question-answer-item")} key={answer.answerId}>
              <div className={cx("question-answer-input")}>
                <ReactQuill
                  className={cx("answer-input")}
                  theme="snow"
                  value={answer.text}
                  onChange={(value) =>
                    handleAnswerChange(answer.answerId, value)
                  }
                  placeholder={`Answer ${index + 1}...`}
                />
              </div>
              <Radio
                className={cx("answer-input-radio")}
                checked={correctAnswerId === answer.answerId}
                onChange={() => handleCorrectAnswerSelect(answer)}
              />
              <button
                className={cx("delete-btn", { disabled: answers.length === 1 })}
                onClick={() => handleRemoveAnswer(answer.answerId)}
                disabled={answers.length === 1}
              >
                <i className={cx("fa-regular fa-trash", "trash-icon")}></i>
              </button>
            </div>
          ))}
          {answers.length < 4 && (
            <div
              className={cx("create-answer-action")}
              onClick={handleAddAnswer}
            >
              <div className={cx("create-icon")}>
                <i className={cx("fa-regular fa-circle-plus", "icon")}></i>
              </div>
              <div className={cx("create-text")}>Add answer</div>
            </div>
          )}
        </div>
      </div>
      {correctAnswerId !== null && (
        <div className={cx("create-explanation-answer")}>
          <div className={cx("question-explanation-title")}>
            Explanation: Write explain about correct answer
          </div>
          <ReactQuill
            className={cx("explanation-input")}
            theme="snow"
            value={explanation}
            onChange={(value) => setExplanation(value)}
            placeholder={"Explanation here..."}
          />
        </div>
      )}
    </div>
  );
}

EditLessonContentQuestion.propTypes = {
  setIsShowCreateQuestion: PropTypes.func,
  setQuestionContent: PropTypes.func,
};

export default EditLessonContentQuestion;
