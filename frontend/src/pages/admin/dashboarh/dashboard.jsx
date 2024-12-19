import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { getAllCars, getUserdashboard } from "../../../lib/Axiosintance";

function Dashboarh() {
  const [cars, setCars] = useState([]);
  const myChartRef = useRef(null);
  const earningChartRef = useRef(null);
  const myChartInstance = useRef(null);
  const earningChartInstance = useRef(null);
  useEffect(() => {
    if (myChartRef.current && earningChartRef.current) {
      if (myChartInstance.current) {
        myChartInstance.current.destroy();
      }
      if (earningChartInstance.current) {
        earningChartInstance.current.destroy();
      }
      const ctx = myChartRef.current.getContext("2d");
      myChartInstance.current = new Chart(ctx, {
        type: "polarArea",
        data: {
          labels: ["KIA", "MITSUBISHI", "MERCERDES", "TOYOTA", "HYUNHDAI"],
          datasets: [
            {
              label: "Traffic Source",
              data: [35, 35, 40, 20, 29],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgb(255, 0, 0)",
                "rgb(106, 90, 205)",
              ],
            },
          ],
        },
        options: { responsive: true },
      });
      const earningCtx = earningChartRef.current.getContext("2d");
      earningChartInstance.current = new Chart(earningCtx, {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Earning",
              data: [
                4500, 4106, 7005, 6754, 5154, 4554, 7815, 3152, 12204, 4457,
                8740, 11000,
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  }, []);

  //   note: get data car
  const fetchCars = async () => {
    try {
      const response = await getAllCars();
      setCars(response.data.cars);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
    fetchCars();
  };

  //   note: get data user
  const fetchDataUsers = async () => {
    try {
      const response = await getUserdashboard();
      setCars(response);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
    fetchDataUsers();
  };

  return (
    <div>
      <div className="topbar">
        <div className="toggle"></div>
      </div>
      <div className="cardBox">
        <div className="card">
          <div className="iconBx">
            <i className="fa-solid fa-car"></i>{" "}
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="numbers">100</div>
            <div className="cardName">Xe</div>
          </div>
        </div>
        <div className="card">
          <div className="iconBx">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="numbers">80</div>
            <div className="cardName">Người dùng</div>
          </div>
        </div>
        <div className="card">
          <div className="iconBx">
            <i className="fa-solid fa-phone"></i>{" "}
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="numbers">284</div>
            <div className="cardName">Booking</div>
          </div>
        </div>
        <div className="card">
          <div className=" align-items-center gap-2">
            <div className="numbers">$7,842</div>
            <div className="cardName">Tổng doanh thu</div>
          </div>
        </div>
      </div>
      <div className="graphBox mt-3">
        <div className="box">
          {" "}
          <canvas id="myChart" ref={myChartRef}></canvas>{" "}
        </div>{" "}
        <div className="box">
          {" "}
          <canvas id="earning" ref={earningChartRef}></canvas>{" "}
        </div>
      </div>

      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>CAR OF ALD TRIPLE T</h2>
            <a href="/admincar" className="btn">
              View All
            </a>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Car Name</th>
                <th scope="col">Car Image</th>
                <th scope="col">Rental Price</th>
                <th scope="col">License Plate</th>
              </tr>
            </thead>
            <tbody>
              {cars.splice(0, 7).map((car) => (
                <tr key={car.car_id}>
                  <td>{car.car_name}</td>
                  <td>
                    <img
                      src={`../img/${car.car_image}`}
                      style={{ width: "150px" }}
                      alt=""
                    />
                  </td>
                  <td>{car.rental_price} VND</td>
                  <td>111</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="recentCustomers">
          <div className="cardHeader">
            <h2>Users</h2>
          </div>
          <table>
            <tr>
              <td width="60px">
                <div className="imgBx">
                  <img src="img1.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>Italy</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img2.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>India</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img3.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>France</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img4.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>USA</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img5.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>Japan</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img6.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>India</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img7.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>Malaysia</span>
                </h4>
              </td>
            </tr>
            <tr>
              <td>
                <div className="imgBx">
                  <img src="img8.jpg" />
                </div>
              </td>
              <td>
                <h4>
                  Coding World
                  <br />
                  <span>India</span>
                </h4>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboarh;
