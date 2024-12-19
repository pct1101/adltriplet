import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
  getAllCars,
  getBookingdashboard,
  getBrandCar,
  getBrands,
  getCars,
  getCarsbybrand,
  getCarsdashboard,
  getRevenuebymonth,
  getRevenueDashboarh,
  getTotal_topuser,
  getUserdashboard,
} from "../../../lib/Axiosintance";
import { API_URL_IMG } from "../../../lib/Axiosintance";

function Dashboarh() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [total_topuser, setTotal_topuser] = useState([]);
  // note: getdataDashboarh
  const [user, setuser] = useState([]);
  const [car, setcar] = useState([]);
  const [booking, setbooking] = useState([]);
  const [feedback, setfeedback] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [carsbybrand, setcarsbybrand] = useState([]);
  console.log(carsbybrand);
  const [revenuebymonth, setrevenuebymonth] = useState([]);
  console.log(revenuebymonth);

  const myChartRef = useRef(null);
  const earningChartRef = useRef(null);
  const myChartInstance = useRef(null);
  const earningChartInstance = useRef(null);

  const brandNames = carsbybrand
    .filter((car) => car.cars_count > 0)
    .map((car) => car.brand_name);
  const brandCount = carsbybrand
    .filter((car) => car.cars_count > 0)
    .map((car) => car.cars_count);

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
          labels: brandNames,
          datasets: [
            {
              label: "Traffic Source",
              data: brandCount,
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
              label: "Doanh thu theo tháng",
              data: revenuebymonth,
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

  const formatRevenue = (revenue) => {
    return revenue.toLocaleString("vi-VN"); // Định dạng số theo chuẩn Việt Nam
  };
  const formattedRevenue = formatRevenue(Number(revenue.total_revenue));

  //   note: get data car
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await getCars();
        setCars(response.data.cars);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchCars();
  }, []);

  // note: user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserdashboard();
        setuser(response.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchUser();
  }, []);
  // note: car
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCarsdashboard();
        setcar(response.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchCar();
  }, []);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getBookingdashboard();
        setbooking(response.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchBooking();
  }, []);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await getRevenueDashboarh();
        setRevenue(response.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchRevenue();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        setBrands(response);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchCarbybrand = async () => {
      try {
        const response = await getCarsbybrand();
        setcarsbybrand(response.data.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchCarbybrand();
  }, []);

  // note: doanh thu booking theo tháng
  useEffect(() => {
    const fetchRevenuebymonth = async () => {
      try {
        const response = await getRevenuebymonth();
        setrevenuebymonth(response.data.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchRevenuebymonth();
  }, []);

  // note: người dùng booking nhiều nhất
  useEffect(() => {
    const fetchTotal_topuser = async () => {
      try {
        const response = await getTotal_topuser();
        setTotal_topuser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch cars", error);
      }
    };
    fetchTotal_topuser();
  }, []);

  const usersArray = Object.values(total_topuser);

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
            <div className="numbers"> {car.total_cars} </div>
            <div className="cardName">Xe</div>
          </div>
        </div>
        <div className="card">
          <div className="iconBx">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="numbers">{user.total_users}</div>
            <div className="cardName">Người dùng</div>
          </div>
        </div>
        <div className="card">
          <div className="iconBx">
            <i className="fa-solid fa-phone"></i>{" "}
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="numbers">{booking.total_bookings} </div>
            <div className="cardName">Booking</div>
          </div>
        </div>
        <div className="card">
          <div className=" align-items-center gap-2">
            <div className="numbers">{formattedRevenue} </div>
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
              {cars.slice(0, 6).map((car) => (
                <tr key={car.car_id}>
                  <td>{car.car_name}</td>
                  <td>
                    <img
                      src={` ${API_URL_IMG}/${car.car_image}`}
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
            <h2>
              Users
              <table>
                {usersArray.map((user) => {
                  return (
                    <tr key={user?.id}>
                      {" "}
                      {/* Đảm bảo thêm key unique */}
                      <td width="60px">
                        <div className="imgBx">
                          <img src="../upload/avatar-4.png" alt="User" />
                        </div>
                      </td>
                      <td>
                        <h4>
                          {user?.user_name}
                          <br />
                          <span> {user?.email}</span>
                        </h4>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboarh;
