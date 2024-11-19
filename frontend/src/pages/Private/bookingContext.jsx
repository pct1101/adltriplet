import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  // note: set booking
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : null;
  });
  // note: set days
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem("startDate");
    return saved ? dayjs(saved) : dayjs();
  });
  const [endDate, setEndDate] = useState(() => {
    const saved = localStorage.getItem("endDate");
    return saved ? dayjs(saved) : dayjs().add(1, "day");
  });
  // note: set time
  const [selectedTimes, setSelectedTimes] = useState(() => {
    const saved = localStorage.getItem("selectedTimes");
    return saved
      ? JSON.parse(saved)
      : {
          nhanXe: dayjs().add(1, "hour").format("HH:mm"),
          traXe: dayjs().add(4, "hour").format("HH:mm"),
        };
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);
  // note: set địa điểm
  const [selectedProvince, setSelectedProvince] = useState(() => {
    const saved = localStorage.getItem("selectedProvince");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const saved = localStorage.getItem("selectedDistrict");
    return saved ? JSON.parse(saved) : null;
  });
  useEffect(() => {
    localStorage.setItem("selectedProvince", JSON.stringify(selectedProvince));
  }, [selectedProvince]);
  useEffect(() => {
    localStorage.setItem("selectedDistrict", JSON.stringify(selectedDistrict));
  }, [selectedDistrict]);
  return (
    <BookingContext.Provider
      value={{
        selectedProvince,
        setSelectedProvince,
        selectedDistrict,
        setSelectedDistrict,
        bookings,
        setBookings,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        selectedTimes,
        setSelectedTimes,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
