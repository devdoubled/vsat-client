import classNames from "classnames/bind";
import PropTypes from "prop-types";
import exampleImg from "~/assets/images/content/example.png";
import { renderMathAndText } from "~/utils/renderMathAndText";
import styles from "./QuestionItemPreview.module.scss";
const cx = classNames.bind(styles);
const example = `<p>Student-produced response directions</p>
<ul>
  <li>Enter only one <strong>correct answer</strong>, even if there are multiple correct answers.</li>
  <li>You can enter up to 5 characters for a positive answer and up to 6 characters for a negative answer (including the negative sign).</li>
  <li>If your answer is a fraction but it doesn't fit in the provided space, enter the decimal equivalent instead.</li>
  <li>If your answer is a decimal but it doesn't fit in the provided space, round it to \\[4\\] digits.</li>
  <li>If your answer is a mixed number (such as \\[5\\frac{1}{2}\\]), enter it as an improper fraction (\\[\\frac{11}{2}\\]) or decimal (\\[5.5\\]).</li>
  <li>Don't enter symbols such as percent sign, comma, or dollar sign.</li>
</ul>`;
function QuestionItemPreview({
  questionPreviewData,
  setIsShowQuestionItemPreview,
}) {
  return (
    <div className={cx("question-create-preview-wrapper")}>
      <div className={cx("question-create-preview-container")}>
        <div className={cx("question-create-preview-header")}>
          <div
            className={cx("preview-back")}
            onClick={() => setIsShowQuestionItemPreview(false)}
          >
            <i className={cx("fa-regular fa-arrow-left")}></i>
          </div>
          <div className={cx("preview-section")}>
            {questionPreviewData?.section.name}
          </div>
          <div className={cx("preview-level")}>
            {questionPreviewData?.level.name}
          </div>
        </div>
        <div className={cx("question-create-preview-content")}>
          <div className={cx("long-dashes")}></div>
          <div className={cx("preview-content-container")}>
            <div className={cx("preview-content-question")}>
              {questionPreviewData?.isSingleChoiceQuestion === true ? (
                <div
                  className={cx("question-rerender-content")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(questionPreviewData?.content),
                  }}
                />
              ) : (
                <div className={cx("preview-answer-example")}>
                  <div
                    className={cx("answer-example")}
                    dangerouslySetInnerHTML={{
                      __html: renderMathAndText(example),
                    }}
                  ></div>
                  <div className={cx("example-text")}>Example</div>
                  <div className={cx("example-image")}>
                    <img
                      src={exampleImg}
                      className={cx("ex-img")}
                      alt="example"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={cx("preview-content-answer")}>
              <div className={cx("mark-answer-container")}>
                <div className={cx("mark-answer")}>
                  <i
                    className={cx(
                      "fa-sharp fa-regular fa-bookmark",
                      "icon-mark"
                    )}
                  ></i>
                  <span className={cx("mark-text")}>Mark for Review</span>
                </div>
              </div>
              <div className={cx("long-dashes")}></div>
              {questionPreviewData?.isSingleChoiceQuestion === true ? (
                <div className={cx("answer-list-container")}>
                  {questionPreviewData?.answers.map((answer, index) => (
                    <div key={answer.id} className={cx("answer-item")}>
                      <span className={cx("answer-label")}>
                        {String.fromCharCode(65 + index) + ":"}
                      </span>
                      <span
                        className={cx("answer-rerender-content")}
                        dangerouslySetInnerHTML={{
                          __html: renderMathAndText(answer.text),
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cx("answer-text-input-container")}>
                  <div
                    className={cx("text-input-rerender-content")}
                    dangerouslySetInnerHTML={{
                      __html: renderMathAndText(questionPreviewData?.content),
                    }}
                  ></div>
                  <div className={cx("text-input-content")}>
                    <input
                      type="text"
                      autoFocus={true}
                      className={cx("input-text")}
                      placeholder="Your answer"
                    />
                  </div>
                </div>
              )}
              <div className={cx("explain-answer-container")}>
                <div className={cx("explain-text")}>Explaination: </div>
                <div
                  className={cx("explain-rerender-content")}
                  dangerouslySetInnerHTML={{
                    __html: renderMathAndText(questionPreviewData?.explain),
                  }}
                />
              </div>
            </div>
          </div>
          <div className={cx("long-dashes")}></div>
        </div>
      </div>
    </div>
  );
}

QuestionItemPreview.propTypes = {
  questionPreviewData: PropTypes.object,
  setIsShowQuestionItemPreview: PropTypes.func,
};

export default QuestionItemPreview;
