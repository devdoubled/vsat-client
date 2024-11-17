import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import PageLayout from "~/layouts/Staff/PageLayout";
import TrialExamItem from "~/components/Manager/ManagerExam/ExamItem";
import ExamViewDetail from "~/components/Manager/ManagerExam/ExamViewDetail";
import { Skeleton } from "@mui/material";
import LearningMaterialCreateFooter from "~/components/Staff/LearningMaterialCreate/LearningMaterialCreateFooter";
import NoQuestionData from "~/components/Staff/QuestionExamCreate/NoQuestionData";
import apiClient from "~/services/apiService";
import styles from "./Exam.module.scss";

const cx = classNames.bind(styles);

function Exam() {
  const [examList, setExamList] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isShowExamCensorView, setIsShowExamCensorView] = useState(false);
  const [examCensorData, setExamCensorData] = useState(null);

  const fetchExamList = useCallback(async () => {
    try {
      setIsWaiting(true);
      const response = await apiClient.get(`exams/getExamByCreateBy`);
      console.log(response);
      setExamList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch exam structure list:", error);
    } finally {
      setIsWaiting(false);
    }
  }, []);

  useEffect(() => {
    fetchExamList();
  }, [fetchExamList]);

  return (
    <>
      {isShowExamCensorView && (
        <ExamViewDetail
          examCensorData={examCensorData}
          fetchExamList={fetchExamList}
          setIsShowExamCensorView={setIsShowExamCensorView}
        />
      )}
      <PageLayout>
        <div className={cx("exam-wrapper")}>
          <div className={cx("exam-container")}>
            <div className={cx("exam-header")}>
              <div className={cx("exam-text")}>Exam Overview</div>
            </div>
            <div className={cx(isWaiting || examList.length > 0
                  ? "exam-content"
                  : "exam-no-content")}>
              {isWaiting ? (
                <>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height={260}
                    />
                  ))}
                </>
              ) : examList.length > 0 ? (
                examList.map((item, index) => (
                  <TrialExamItem
                    key={item.id}
                    exam={item}
                    index={index + 1}
                    setExamCensorData={setExamCensorData}
                    setIsShowExamCensorView={setIsShowExamCensorView}
                  />
                ))
              ) : (
                <NoQuestionData />
              )}
            </div>
          </div>
        </div>
        <LearningMaterialCreateFooter />
      </PageLayout>
    </>
  );
}

export default Exam;
