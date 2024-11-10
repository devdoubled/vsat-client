import classNames from "classnames/bind";
import styles from "./ModuleQuestionView.module.scss";
const cx = classNames.bind(styles);

function ModuleQuestionView({
  examQuestion,
  setIsShowDomainQuestionView,
  setDomainData
}) {
  const handleClickViewDomainQuestion = (domainData) => {
    setIsShowDomainQuestionView(true);
    setDomainData(domainData)
  };
  return (
    <div className={cx("module-question-container")}>
      <div className={cx("module-question-header")}>
        <div className={cx("module-question-title")}>
          <div className={cx("module-icon")}>
            <i className="fa-light fa-file-pen"></i>
          </div>
          <div className={cx("module-title")}>
            {examQuestion?.name}{" "}
            {examQuestion?.level ? `(${examQuestion?.level})` : ""}
          </div>
        </div>
        <div className={cx("module-section")}>{examQuestion?.section}</div>
      </div>
      <div className={cx("module-question-content")}>
        {examQuestion?.domains.map((domain, index) => (
          <div className={cx("domain-question-container")} key={index}>
            <div className={cx("domain-icon")}>
              <i className={cx("fa-regular fa-pen-to-square")}></i>
            </div>
            <div className={cx("domain-infor")}>
              <div className={cx("domain-title")}>{domain?.domain}</div>
              <div className={cx("domain-action")}>
                {/* <div className={cx("count-noq")}>0/8</div> */}
                <div className={cx("create-action")}>
                  <button
                    className={cx("create-btn")}
                    onClick={() =>
                      handleClickViewDomainQuestion(domain)
                    }
                  >
                    <i
                      className={cx(
                        "fa-regular fa-arrow-up-right-from-square",
                        "create-icon"
                      )}
                    ></i>
                    <span className={cx("create-text")}>View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModuleQuestionView;
