import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MonthCard from "./MonthCard";
import { useEffect } from "react";
// import { db } from "../config/firebase";
// import { doc } from "firebase/firestore";

const data = [
  {
    year: 2021,
    calender: [
      { month: "January", shortName: "Jan", state: 2 },
      { month: "February", shortName: "Feb", state: 2 },
      { month: "March", shortName: "Mar", state: 2 },
      { month: "April", shortName: "Apr", state: 2 },
      { month: "May", shortName: "May", state: 2 },
      { month: "June", shortName: "June", state: 2 },
      { month: "July", shortName: "July", state: 2 },
      { month: "August", shortName: "Aug", state: 2 },
      { month: "September", shortName: "Sept", state: 2 },
      { month: "October", shortName: "Oct", state: 2 },
      { month: "November", shortName: "Nov", state: 2 },
      { month: "December", shortName: "Dec", state: 2 },
    ],
  },
  {
    year: 2022,
    calender: [
      { month: "January", shortName: "Jan", state: 2 },
      { month: "February", shortName: "Feb", state: 2 },
      { month: "March", shortName: "Mar", state: 2 },
      { month: "April", shortName: "Apr", state: 2 },
      { month: "May", shortName: "May", state: 1 },
      { month: "June", shortName: "June", state: 2 },
      { month: "July", shortName: "July", state: 2 },
      { month: "August", shortName: "Aug", state: 1 },
      { month: "September", shortName: "Sept", state: 0 },
      { month: "October", shortName: "Oct", state: 2 },
      { month: "November", shortName: "Nov", state: 2 },
      { month: "December", shortName: "Dec", state: 2 },
    ],
  },
  {
    year: 2023,
    calender: [
      { month: "January", shortName: "Jan", state: 1 },
      { month: "February", shortName: "Feb", state: 2 },
      { month: "March", shortName: "Mar" },
      { month: "April", shortName: "Apr" },
      { month: "May", shortName: "May" },
      { month: "June", shortName: "June" },
      { month: "July", shortName: "July" },
      { month: "August", shortName: "Aug" },
      { month: "September", shortName: "Sept" },
      { month: "October", shortName: "Oct" },
      { month: "November", shortName: "Nov" },
      { month: "December", shortName: "Dec" },
    ],
  },
];

function PaymentCalender() {
  const [selectedYear, setSelectedYear] = useState(1);

  useEffect(() => {
    // const pan = "abc";
    // const propertyRef = doc(db, "UserDetails", pan);
  }, []);

  return (
    <Box width={"100%"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4">Payment History</Typography>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <IconButton
            color="primary"
            onClick={() => {
              console.log(selectedYear);
              if (selectedYear - 1 >= 0) setSelectedYear(selectedYear - 1);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Typography fontSize={"24px"}>{data[selectedYear].year}</Typography>
          <IconButton
            color="primary"
            onClick={() => {
              if (selectedYear + 1 <= data.length - 1)
                setSelectedYear(selectedYear + 1);
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"auto auto auto auto auto auto"}
        gridTemplateRows={"auto auto"}
        my={4}
      >
        {data[selectedYear].calender.map((month) => (
          <Box
            key={month.year}
            display={"flex"}
            flexDirection={"column"}
            m={2}
            alignItems={"center"}
          >
            <Typography variant="h6" pb={1}>
              {month.shortName}
            </Typography>
            <MonthCard state={month.state} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PaymentCalender;
