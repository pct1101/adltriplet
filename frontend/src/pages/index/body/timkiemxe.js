import React, { useEffect, useState } from "react";

function Timkiemxe() {
  const [isSelfDriving, setIsSelfDriving] = useState(true);
  const [location, setLocation] = useState("TP Hồ Chí Minh");
  const [datetime, setDatetime] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [airport, setAirport] = useState("");

  const handleAirportSelection = (selectedAirport) => {
    setAirport(selectedAirport);
    setLocation(selectedAirport); // Cập nhật địa điểm khi chọn sân bay
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">Tìm Kiếm Xe Thuê</h1>
      <div className="card mt-4">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-12 text-center mb-3">
              <button className={`btn ${isSelfDriving ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setIsSelfDriving(true)}>
                Thuê Xe Tự Lái
              </button>
              <button className={`btn ${!isSelfDriving ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setIsSelfDriving(false)}>
                Xe Có Tài Xế
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h4>{isSelfDriving ? "Thuê Xe Tự Lái" : "Xe Có Tài Xế"}</h4>
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor="location">Địa điểm:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={location}
                    readOnly
                    onClick={() => document.getElementById('locationModal').classList.add('show')}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="currentLocation">Vị trí của bạn:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="Nhập vị trí của bạn"
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="datetime">Thời gian:</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 text-right">
                  <button className="btn btn-success mt-3" onClick={() => alert("Tìm kiếm xe")}>
                    Tìm Xe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Địa Điểm */}
      <div className="modal fade" id="locationModal" tabIndex="-1" role="dialog" aria-labelledby="locationModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="locationModalLabel">Chọn Địa Điểm</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => document.getElementById('locationModal').classList.remove('show')}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="inputLocation">Địa điểm mặc định:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLocation"
                  placeholder="Nhập địa chỉ"
                  value={location}
                  readOnly
                  onClick={() => document.getElementById('locationModal').classList.add('show')}
                />
              </div>
              <div className="form-group">
                <label>Giao xe tại sân bay:</label>
                <div className="d-flex flex-wrap">
                  {["Sân bay Tân Sơn Nhất", "Sân bay Nội Bài", "Sân bay Đà Nẵng", "Sân bay Cam Ranh", "Sân bay Phú Quốc", "Sân bay Liên Khương"].map((airportOption) => (
                    <div
                      key={airportOption}
                      className={`p-2 m-1 border rounded ${airport === airportOption ? "bg-success text-white" : "bg-light"}`}
                      onClick={() => handleAirportSelection(airportOption)}
                      style={{ cursor: "pointer" }}
                    >
                      {airportOption}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('locationModal').classList.remove('show')}>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timkiemxe;
