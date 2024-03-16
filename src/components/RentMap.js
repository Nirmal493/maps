import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { db } from "../firebase-config";
// import mapimage from "../mapimage.png";
// import Map from "./Map.jsx";

const RentMap = () => {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkBooking = async () => {
      const db = getDatabase();
      const bookingsRef = ref(db, "VALUE/");

      try {
        const snapshot = await get(bookingsRef);

        if (isMounted && snapshot.exists()) {
          const data = snapshot.val();
          setBookingData(data);
        }
      } catch (error) {
        console.error("Error reading data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkBooking();

    return () => {
      isMounted = false;
    };
  }, [bookingData]);

  if (loading) {
    return (
      <div
        style={{
          fontFamily: "'digital-clock-font', sans-serif",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  return <Stopwatch startStopwatch={bookingData && bookingData.INT === 1} />;
};

const Stopwatch = ({ startStopwatch }) => {
  const [time, setTime] = useState(0);
  const [isRed, setIsRed] = useState(false);
  const [exceededMessage, setExceededMessage] = useState("");

  useEffect(() => {
    let timer;

    if (startStopwatch) {
      // Update time every 100 milliseconds
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 0.1;
          // Check if 2 minutes have passed
          if (newTime >= 2 * 60 && !isRed) {
            setIsRed(true);
            setExceededMessage(
              "Time limit exceeded. Extra charges will be applied from now on."
            );
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(timer);
  }, [startStopwatch, isRed]);

  const calculateFare = () => {
    const baseFare = 20;
    const additionalFare = Math.floor((time - 120) / 30) * 10;
    return Math.max(baseFare + additionalFare, 20); // Ensure the minimum fare is Rs 20
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);

    return `${minutes}:${seconds.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    })}.${milliseconds.toLocaleString("en-US", {
      minimumIntegerDigits: 3,
    })}`;
  };

  return (
    <div
      className={`stopwatch bg-black flex flex-col items-center max-h-32 justify-center ${
        isRed ? "text-red-400" : "text-green-400"
      }`}
      style={{
        fontFamily: "'digital-clock-font', sans-serif",
        textAlign: "center",
      }}
    >
      <div className="flex flex-row justify-center mt-2 items-center">
        <p
          className="text-6xl mr-14"
          style={{ color: isRed ? "red-400" : "green-400" }}
        >{`Time: ${formatTime(time)}`}</p>
        <p
          className="text-6xl"
          style={{ color: isRed ? "red-400" : "green-400" }}
        >{`Fare: Rs. ${calculateFare()}`}</p>
      </div>
      {isRed && <p className="text-lg text-red-400 mt-4">{exceededMessage}</p>}
    </div>
  );
};

export default RentMap;
