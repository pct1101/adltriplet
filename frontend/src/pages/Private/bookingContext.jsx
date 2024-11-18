import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("bookings");
    return saved ? JSON.parse(saved) : null;
  });
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem("startDate");
    return saved ? dayjs(saved) : dayjs();
  });
  const [endDate, setEndDate] = useState(() => {
    const saved = localStorage.getItem("endDate");
    return saved ? dayjs(saved) : dayjs().add(1, "day");
  });
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
  return (
    <BookingContext.Provider
      value={{
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
