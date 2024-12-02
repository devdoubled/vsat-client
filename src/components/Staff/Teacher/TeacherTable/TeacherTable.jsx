import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import apiClient from "~/services/apiService";
import styles from "./TeacherTable.module.scss";

const cx = classNames.bind(styles);

function TeacherTable({ setSelectedTeacher, setShowPopup }) {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(7);
  const [searchName, setSearchName] = useState("");

  const fetchTeachers = (page, pageSize) => {
    apiClient
      .get("/account/getTeacher", {
        params: {
          page,
          pageSize,
        },
      })
      .then((response) => {
        const { data } = response.data;
        const { data: teacherList, totalPages } = data;
        setTeachers(teacherList || []);
        setTotalPages(Math.ceil(totalPages || 1));
        setCurrentPage(page);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
        setTeachers([]);
      });
  };

  const handleSearch = () => {
    fetchTeachers(1, pageSize);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchTeachers(newPage, pageSize);
    }
  };

  const handleRowClick = (teacher) => {
    setSelectedTeacher(teacher);
    setShowPopup(true)
  };

  useEffect(() => {
    fetchTeachers(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className={cx("table-wrapper")}>
      <div className={cx("table-container")}>
        <div className={cx("header-container")}>
          <div className={cx("header-actions")}>
            <div className={cx("header-actions-search")}>
              <input
                className={cx("search-input")}
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <button className={cx("filter-btn")} onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className={cx("user-table-container")}>
          <table className={cx("user-table")}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <tr key={teacher.id} onClick={() => handleRowClick(teacher)}>
                    <td>{teacher.firstname}</td>
                    <td>{teacher.lastname}</td>
                    <td>{teacher.username}</td>
                    <td>{teacher.phonenumber || "N/A"}</td>
                    <td>{teacher.gender ? "Male" : "Female"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={cx("no-data")}>
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={cx("paging-container")}>
          <div className={cx("pagination")}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? cx("active") : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherTable;
