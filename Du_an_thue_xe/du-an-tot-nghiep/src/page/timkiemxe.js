import React from 'react'

function Timkiemxe() {
  return (
    <div>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="location">Địa điểm</label>
                <input type="text" className="form-control" id="location" placeholder="Hồ Chí Minh" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label htmlFor="time">Thời gian thuê</label>
                <input type="text" className="form-control" id="time" placeholder="20:00, 26/6/2024 - 20:00, 27/6/2024" />
            </div>
        </div>
        <div className="col-md-12 text-center mt-3">
            <button className="btn btn-primary">Tìm Xe</button>
        </div>
            </div>
        </div>
    </div>
  )
}

export default Timkiemxe;
