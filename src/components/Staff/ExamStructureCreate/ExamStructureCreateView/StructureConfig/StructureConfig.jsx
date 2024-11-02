import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import styles from "./StructureConfig.module.scss";
import ViewTableDistribution from "./ViewTableDistribution";
import ViewTableScore from "./ViewTableScore";
const cx = classNames.bind(styles);

function StructureConfig({
  examStructureData,
  setExamStructureData,
  setDomainDistributionConfigs,
  setTotalRWQuestion,
  setTotalMathQuestion,
}) {
  const [examStructureType, setExamStructureType] = useState([]);
  const [examScores, setExamScores] = useState([]);
  const [examScoreDetailData, setExamScoreDetailData] = useState({});
  const [isShowScoreDetail, setIsShowScoreDetail] = useState(false);
  const [questionDistributions, setQuestionDistributions] = useState([]);
  const [isShowDistributionDetail, setIsShowDistributionDetail] =
    useState(false);
  const [distributionDetailData, setDistributionDetailData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examTypeResponse, questionDistributionResponse] =
          await Promise.all([
            apiClient.get("/exam-structure-types"),
            apiClient.get("/exam-semester/details"),
          ]);
        setExamStructureType(examTypeResponse.data.data);
        setQuestionDistributions(questionDistributionResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleChangeStructureName = (e) => {
    setExamStructureData((prev) => ({
      ...prev,
      structurename: e.target.value,
    }));
  };

  const handleChangeStructureDesc = (e) => {
    setExamStructureData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const handleChangeStructureType = async (e) => {
    setExamScoreDetailData({});
    const selectedType = e.target.value;
    const selectedTypeData = examStructureType.find(
      (type) => type.name === selectedType
    );
    setTotalRWQuestion(selectedTypeData.numberOfReadWrite);
    setTotalMathQuestion(selectedTypeData.numberOfMath);
    setExamStructureData((prev) => ({
      ...prev,
      examStructureType: selectedType,
    }));

    try {
      const response = await apiClient.post(
        "/exam-scores/exam-structure-type",
        {
          name: selectedType,
        }
      );
      setExamScores(response.data.data);
    } catch (error) {
      console.error("Failed to send structure type to the API", error);
    }
  };

  const handleChangeStructureScore = (e) => {
    const selectedScoreId = e.target.value;
    const selectedScore = examScores.find(
      (score) => score.id === selectedScoreId
    );
    setExamScoreDetailData(selectedScore);
    setExamStructureData((prev) => ({
      ...prev,
      examScoreId: e.target.value,
    }));
  };

  const handleChangeNumberRW = (e) => {
    setExamStructureData((prev) => ({
      ...prev,
      requiredCorrectInModule1RW: e.target.value,
    }));
  };

  const handleChangeNumberMath = (e) => {
    setExamStructureData((prev) => ({
      ...prev,
      requiredCorrectInModule1Math: e.target.value,
    }));
  };

  const handleChangeQuestionDistribution = (e) => {
    const distributionId = e.target.value;
    const selectedDistribution = questionDistributions.find(
      (distribution) => distribution.id === distributionId
    );
    setDistributionDetailData(selectedDistribution);
    setDomainDistributionConfigs(selectedDistribution.domainDistributionConfig);
  };
  return (
    <>
      {isShowScoreDetail && (
        <ViewTableScore
          viewScoreDetailData={examScoreDetailData}
          setIsShowScoreDetail={setIsShowScoreDetail}
        />
      )}

      {isShowDistributionDetail && (
        <ViewTableDistribution
          distributionDetailData={distributionDetailData}
          setIsShowDistributionDetail={setIsShowDistributionDetail}
        />
      )}
      <div className={cx("structure-config-wrapper")}>
        <div className={cx("structure-config-container")}>
          <div className={cx("structure-config-header")}>
            <div className={cx("config-text")}>Structure Config</div>
          </div>
          <div className={cx("structure-config-content")}>
            <div className={cx("config-information")}>
              <div className={cx("config-infor-item")}>
                <div className={cx("config-title")}>
                  Exam Structure Name{" "}
                  <span className={cx("required")}>(Required)</span>
                </div>
                <div className={cx("config-input")}>
                  <input
                    type="text"
                    className={cx("title-input")}
                    placeholder="Name..."
                    autoFocus={true}
                    onChange={handleChangeStructureName}
                  />
                </div>
              </div>
              <div className={cx("config-infor-item")}>
                <div className={cx("config-title")}>
                  Exam Structure Description{" "}
                  <span className={cx("required")}>(Required)</span>
                </div>
                <div className={cx("config-input")}>
                  <input
                    type="text"
                    className={cx("title-input")}
                    placeholder="Description..."
                    onChange={handleChangeStructureDesc}
                  />
                </div>
              </div>
            </div>
            <div className={cx("config-mechanism")}>
              <div className={cx("config-type")}>
                <div className={cx("type-section")}>
                  Exam Structure Type
                  <span className={cx("required")}>(Required)</span>
                </div>
                <select
                  id="type-section"
                  className={cx("section-select")}
                  onChange={handleChangeStructureType}
                >
                  <option value="">Structure Type</option>
                  {examStructureType?.map((type) => (
                    <option value={type.name} key={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={cx("config-score")}>
                <div className={cx("score-selection")}>
                  <div className={cx("type-section")}>
                    Exam Structure Score
                    <span className={cx("required")}>(Required)</span>
                  </div>
                  <select
                    id="type-section"
                    className={cx("section-select")}
                    disabled={examScores.length === 0}
                    onChange={handleChangeStructureScore}
                  >
                    <option value="">Structure Score</option>
                    {examScores?.length > 0 &&
                      examScores.map((score) => (
                        <option value={score.id} key={score.id}>
                          {score.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={cx("view-score-action")}>
                  <button
                    className={cx("view-score-btn", {
                      "disabled-view-score-btn":
                        Object.keys(examScoreDetailData).length === 0,
                    })}
                    disabled={Object.keys(examScoreDetailData).length === 0}
                    onClick={() => setIsShowScoreDetail(true)}
                  >
                    <i
                      className={cx("fa-regular fa-arrow-up-right-from-square")}
                    ></i>
                  </button>
                </div>
              </div>
              <div className={cx("config-score")}>
                <div className={cx("score-selection")}>
                  <div className={cx("type-section")}>
                    Exam Question Distribution
                    <span className={cx("required")}>(Required)</span>
                  </div>
                  <select
                    id="type-section"
                    className={cx("section-select")}
                    onChange={handleChangeQuestionDistribution}
                  >
                    <option value="">Question Distribution</option>
                    {questionDistributions?.length > 0 &&
                      questionDistributions.map((distribution) => (
                        <option value={distribution.id} key={distribution.id}>
                          {distribution.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={cx("view-score-action")}>
                  <button
                    className={cx("view-score-btn")}
                    onClick={() => setIsShowDistributionDetail(true)}
                  >
                    <i
                      className={cx("fa-regular fa-arrow-up-right-from-square")}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            {examStructureData?.examStructureType === "Adaptive" && (
              <div className={cx("config-with-mechanism")}>
                <div className={cx("mechanism-item")}>
                  <div className={cx("mechanism-title")}>
                    Required correct question in Module 1{" "}
                    <span className={cx("required")}>(Reading & Writing)</span>
                  </div>
                  <div className={cx("mechanism-input")}>
                    <input
                      type="number"
                      className={cx("title-input")}
                      placeholder="Number..."
                      onChange={handleChangeNumberRW}
                    />
                  </div>
                </div>
                <div className={cx("mechanism-item")}>
                  <div className={cx("mechanism-title")}>
                    Required correct question in Module 1{" "}
                    <span className={cx("required")}>(Math)</span>
                  </div>
                  <div className={cx("mechanism-input")}>
                    <input
                      type="number"
                      className={cx("title-input")}
                      placeholder="Number..."
                      onChange={handleChangeNumberMath}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StructureConfig;