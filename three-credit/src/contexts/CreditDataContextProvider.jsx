import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";

export const CreditDataContext = createContext();

const firebaseStructure = {
  arcanaUid: "hussain",
  pan: "hussain",
  personalDetails: {
    incomeDetails: {
      yearlyIncome: 10000,
    },
  },
  userCreditRequest: [
    {
      creditScore: 500,
      requestId: 1,
      timestamp: new Date(),
    },
  ],
  enquiry: [
    {
      timestamp: new Date(),

      bankLogo: "/assets/hdfc_logo.png",
      enquiryId: 69,
      enquiryBy: "three-bank",
    },
    {
      timestamp: new Date(),

      bankLogo: "/assets/hdfc_logo.png",
      enquiryId: 99,
      enquiryBy: "HDFC Bank",
    },
  ],
  accounts: [
    {
      bankProvider: "three-bank",
      bankLogo: "/assets/hdfc_logo.png",
      accountStartTime: new Date("2022"),
      loans: [
        {
          loanType: "personal",
          loanId: "69",
          loanAmount: 10000,
          loanTenure: 15,
          paymentsMade: 3,
          payments: [
            {
              year: 2022,
              calendar: [
                {
                  month: "december",
                  state: "on_time",
                },
              ],
            },
            {
              year: 2023,
              calendar: [
                {
                  month: "january",
                  state: "semi_delayed",
                },
                {
                  month: "february",
                  state: "delayed",
                },
              ],
            },
          ],
        },
        {
          loanType: "home",
          loanId: "99",
          loanAmount: 30000,
          loanTenure: 4,
          paymentsMade: 4,
          payments: [
            {
              year: 2022,
              calendar: [
                {
                  month: "august",
                  state: "on_time",
                },
                {
                  month: "september",
                  state: "semi_delayed",
                },
                {
                  month: "october",
                  state: "on_time",
                },
                {
                  month: "november",
                  state: "on_time",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const CreditDataContextProvider = ({ children }) => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [firebaseData, setFirebaseData] = useState(firebaseStructure);

  useEffect(() => {
    if (!auth) return;
    (async () => {
      setLoading(true);

      const q = query(
        collection(db, "CreditDetails"),
        where("arcanaUid", "==", auth.user.publicKey)
      );

      const querySnapshot = await getDocs(q);
      const dataArr = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        dataArr.push({ id: doc.id, ...doc.data() });
      });
      console.log(dataArr);

      if (dataArr.length !== 0) {
        const data = dataArr[0];
        // setFirebaseData(data);
        // thoos data in context
        console.log("firebase se aaya data CreditDataContext", data);
      } else {
        console.log("nahi hai data");
      }

      setLoading(false);
    })();
  }, [auth]);

  // if (loading)
  //   return (
  //     <div className="center-container">
  //       <CircularProgress />
  //     </div>
  //   );

  return (
    <CreditDataContext.Provider value={firebaseData}>
      {children}
    </CreditDataContext.Provider>
  );
};

export default CreditDataContextProvider;
