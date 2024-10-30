import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./QuizzItemPreview.module.scss"; 
const cx = classNames.bind(styles);

function QuizzItemPreview({
  questionPreviewData,
  setIsShowQuizzItemPreview,
}) {
  return (
    <div className={cx("quizz-create-preview-wrapper")}> 
      <div className={cx("quizz-create-preview-container")}> 
        <div className={cx("quizz-create-preview-header")}> 
          <div
            className={cx("preview-back")}
            onClick={() => setIsShowQuizzItemPreview(false)}
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
        <div className={cx("quizz-create-preview-content")}>
          <div className={cx("long-dashes")}></div>
          <div className={cx("preview-content-container")}>
            <div className={cx("preview-content-question")}>
              <div
                className={cx("quizz-rw-rerender-content")}
                dangerouslySetInnerHTML={{
                  __html: questionPreviewData?.content,
                }}
              ></div>
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
              <div className={cx("answer-list-container")}>
                {questionPreviewData?.answers.map((answer) => (
                  <div key={answer.id} className={cx("answer-item")}>
                    <span className={cx("answer-label")}>
                      {answer.label + ":"}
                    </span>
                    <span
                      className={cx("answer-rerender-content")}
                      dangerouslySetInnerHTML={{ __html: answer.text }}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={cx("long-dashes")}></div>
        </div>
      </div>
    </div>
  );
}

QuizzItemPreview.propTypes = {
  questionPreviewData: PropTypes.object,
  setIsShowQuizzItemPreview: PropTypes.func,
};

export default QuizzItemPreview;