import classNames from "classnames/bind";
import { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "~/services/apiService";
import styles from "./CreateFeedbackView.module.scss";
import SendEvaluation from "./SendEvaluation";
import SendFeedback from "./SendFeedback";
const cx = classNames.bind(styles);
function CreateFeedbackView({ setShowFeedbackCreate, fetchFeedbacks }) {
  const [viewNav, setViewNav] = useState("Evaluation");
  const [feedbackData, setFeedbackData] = useState({
    accountToId: "",
    studyProfileId: "",
    narrativeFeedback: "",
    isEscalated: true,
    isSendToStaff: viewNav === "Evaluation" ? false : true,
    criteriaScores: [
      {
        criteriaId: "",
        score: 0,
      },
    ],
  });

  const [feedbackNormalData, setFeedbackNormalData] = useState({
    reason: "",
    narrativeFeedback: "",
    isSendToStaff: true,
  });

  const handleSendFeedback = async () => {
    if (viewNav === "Evaluation") {
      try {
        await apiClient.post(
          "/evaluate-feedback/create",
          feedbackData
        );
        fetchFeedbacks()
        setShowFeedbackCreate(false);
        toast.success("Send evaluate student successfully!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.error("Error while evaluating student:", error);
        toast.error("Error while evaluating student!", {
          autoClose: 1500,
        });
      }
    } else {
      try {
        await apiClient.post(
          "/evaluate-feedback/createFeedback",
          feedbackNormalData
        );
        fetchFeedbacks()
        setShowFeedbackCreate(false);
        toast.success("Send feedback to staff successfully!", {
          autoClose: 1500,
        });
      } catch (error) {
        console.error("Error while feedback to staff:", error);
        toast.error("Error while feedback to staff!", {
          autoClose: 1500,
        });
      }
    }
  };

  const isFeedbackValid =
    viewNav === "Evaluation"
      ? feedbackData.accountToId &&
      feedbackData.studyProfileId &&
      feedbackData.narrativeFeedback.trim() &&
      feedbackData.criteriaScores.every((score) => score.score > 0)
      : feedbackNormalData.reason.trim() && feedbackNormalData.narrativeFeedback.trim();

  return (
    <div className={cx("create-feedback-view-wrapper")}>
      <div className={cx("create-feedback-view-container")}>
        <div className={cx("create-feedback-nav")}>
          <div
            className={cx("nav-item", { active: viewNav === "Evaluation" })}
            onClick={() => setViewNav("Evaluation")}
          >
            Send Evaluation
          </div>
          <div
            className={cx("nav-item", { active: viewNav === "Feedback" })}
            onClick={() => setViewNav("Feedback")}
          >
            Send Feedback
          </div>
        </div>
        <div className={cx("create-feedback-content")}>
          {viewNav === "Evaluation" ? (
            <SendEvaluation setFeedbackData={setFeedbackData} />
          ) : (
            <SendFeedback setFeedbackNormalData={setFeedbackNormalData} />
          )}
        </div>
        <div className={cx("create-feedback-footer")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowFeedbackCreate(false)}
          >
            Cancel
          </button>
          <button
            className={cx("preview-btn", { disabled: !isFeedbackValid })}
            disabled={!isFeedbackValid}
            onClick={handleSendFeedback}
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFeedbackView;
