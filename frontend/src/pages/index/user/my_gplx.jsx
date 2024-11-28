import React, { useEffect, useState } from "react";
import { getDriverLicense } from "../../../lib/Axiosintance";
import { API_URL_IMG_LICENSE_DRIVER } from "../../../lib/Axiosintance";
function My_gplx() {
  const [gplx, setgplx] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDriverLicense();
        setgplx(response.driver_licenses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <div className="content-item driver-license">
        <div className="title">
          <div className="title-item">
            <h6>Giấy phép lái xe của tôi</h6>
          </div>
        </div>
        <div className="content-gplx">
          <table
            border="1"
            style={{
              width: "100%",
              textAlign: "left",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên người sở hữu</th>
                <th>Trạng thái</th>
                <th>Số giấy phép lái xe</th>
                <th>Ngày cấp</th>
                <th>Hạng</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(gplx) &&
                gplx.slice(0, 3).map((license) => (
                  <tr key={license.driver_license_id}>
                    <td>
                      <img
                        src={`${API_URL_IMG_LICENSE_DRIVER}${license.license_image}`}
                        alt={license.license_holder || "License"}
                        style={{
                          width: "100px",
                          height: "auto",
                          padding: "5px",
                        }}
                      />
                    </td>
                    <td>{license.license_holder || "N/A"}</td>
                    <td>
                      {license.license_status === "inactive" ? (
                        <div className="title-item__info error">
                          <div className="wrap-svg">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.21001 6.695C7.36001 6.845 7.35501 7.08 7.21001 7.225C7.13501 7.295 7.04001 7.335 6.94501 7.335C6.85001 7.335 6.74999 7.295 6.67999 7.22L6 6.535L5.325 7.22C5.25 7.295 5.15499 7.335 5.05499 7.335C4.95999 7.335 4.865 7.295 4.795 7.225C4.645 7.08 4.64499 6.845 4.78999 6.695L5.47501 6L4.78999 5.305C4.64499 5.155 4.645 4.92 4.795 4.775C4.94 4.63 5.18 4.63 5.325 4.78L6 5.465L6.67999 4.78C6.82499 4.63 7.06001 4.63 7.21001 4.775C7.35501 4.92 7.36001 5.155 7.21001 5.305L6.52499 6L7.21001 6.695Z"
                                fill="#F04438"
                              ></path>
                            </svg>
                          </div>
                          Chưa xác thực
                        </div>
                      ) : (
                        <div div className="title-item__info success">
                          <div className="wrap-svg">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 1C3.245 1 1 3.245 1 6C1 8.755 3.245 11 6 11C8.755 11 11 8.755 11 6C11 3.245 8.755 1 6 1ZM7.795 5.295L6.035 7.055C5.96 7.13 5.865 7.165 5.77 7.165C5.675 7.165 5.575 7.13 5.505 7.055L4.625 6.175C4.475 6.03 4.475 5.79 4.625 5.645C4.77 5.5 5.01 5.5 5.155 5.645L5.77 6.26L7.265 4.765C7.41 4.62 7.645 4.62 7.795 4.765C7.94 4.91 7.94 5.15 7.795 5.295Z"
                                fill="#12B76A"
                              ></path>
                            </svg>
                          </div>
                          Đã xác thực
                        </div>
                      )}
                    </td>
                    <td>{license.license_number || "N/A"}</td>
                    <td>{license.issueDate || "N/A"}</td>
                    <td>{license.category || "N/A"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default My_gplx;
