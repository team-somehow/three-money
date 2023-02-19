import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "@arcana/auth-react";
import { CircularProgress } from "@mui/material";

export const CreditDataContext = createContext();

const structVM = {
    arcanaUid: "Vijay Malya",
    pan: "Vijaymalya",
    personalDetails: {
        incomeDetails: {
            yearlyIncome: 100000000,
        },
    },
    userCreditRequest: [
        {
            creditScore: 200,
            requestId: 1,
            timestamp: new Date(),
        },
    ],
    enquiry: [
        {
            timestamp: new Date(),
            enquiryId: 69,
            enquiryBy: "three-bank",
        },
        {
            timestamp: new Date(),
            enquiryId: 99,
            enquiryBy: "Three Bank",
        },
    ],
    accounts: [
        {
            bankProvider: "three-bank",
            accountStartTime: new Date("2022"),
            loans: [
                {
                    loanType: "personal",
                    loanId: "69",
                    loanAmount: 20000000,
                    loanTenure: 30,
                    paymentsMade: 3,
                    payments: [
                        {
                            year: 2022,
                            calendar: [
                                {
                                    month: "december",
                                    state: "missed",
                                },
                            ],
                        },
                        {
                            year: 2023,
                            calendar: [
                                {
                                    month: "january",
                                    state: "missed",
                                },
                                {
                                    month: "february",
                                    state: "missed",
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

const structNew = {
    arcanaUid: "Vijay Malya",
    pan: "Vijaymalya",
    personalDetails: {
        incomeDetails: {
            yearlyIncome: 0,
        },
    },
    userCreditRequest: [
        {
            creditScore: 500,
            requestId: 1,
            timestamp: new Date(),
        },
    ],
    enquiry: [],
    accounts: [],
};

const firebaseStructure = {
    arcanaUid: "farmer",
    pan: "farmer",
    personalDetails: {
        incomeDetails: {
            yearlyIncome: 100000,
        },
    },
    userCreditRequest: [
        {
            creditScore: 500,
            requestId: 1,
            timestamp: new Date(),
        },
    ],
    enquiry: [],
    accounts: [
        {
            bankProvider: "three-bank",
            accountStartTime: new Date("2022"),
            loans: [
                {
                    loanType: "Vehicle Loan",
                    loanId: "69",
                    loanAmount: 2000,
                    loanTenure: 12,
                    paymentsMade: 3,
                    payments: [
                        {
                            year: 2022,
                            calendar: [
                                {
                                    month: "december",
                                    state: "ontime",
                                },
                            ],
                        },
                        {
                            year: 2023,
                            calendar: [
                                {
                                    month: "january",
                                    state: "ontime",
                                },
                                {
                                    month: "february",
                                    state: "ontime",
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
    const [firebaseData, setFirebaseData] = useState(structNew);

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
