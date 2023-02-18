import { useAuth } from "@arcana/auth-react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import LoanPaymentListItem from "../../components/dashboard/LoanPaymentListItem";
import { db } from "../../config/firebase";

const DashboardLoanPayment = () => {
    const auth = useAuth();
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            console.log("DashboardLoanPayment 0");

            if (!auth) return;
            if (!auth?.user) return;
            if (!auth.user?.publicKey) return;

            console.log("DashboardLoanPayment 1");

            const q = query(
                collection(db, "ThreeBank"),
                where("arcanaUid", "==", auth.user.publicKey)
            );
            console.log("DashboardLoanPayment 2");

            const querySnapshot = await getDocs(q);
            const dataArr = [];
            console.log("DashboardLoanPayment 3");

            querySnapshot.forEach((doc) => {
                dataArr.push({ id: doc.id, ...doc.data() });
            });
            console.log("DashboardLoanPayment 3", dataArr[0]);

            setData(dataArr[0]);
        })();
    }, [auth]);

    return (
        <Box p={4} width={"100%"}>
            <Typography variant="h2" mb={4}>
                My Loans
            </Typography>

            {data?.loanPayments &&
                data?.loanPayments.map((item) => {
                    return (
                        <LoanPaymentListItem
                            {...item}
                            id={data.id}
                            name={item.name}
                            month={item.month}
                            payAmount={
                                parseFloat(item.loanAmmount) /
                                parseFloat(item.loanTenure)
                            }
                            panNumber={data.pan}
                        />
                    );
                })}
        </Box>
    );
};

export default DashboardLoanPayment;
