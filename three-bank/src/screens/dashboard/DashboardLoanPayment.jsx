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
            if (!auth) return;
            if (!auth?.user) return;
            if (!auth.user?.publicKey) return;

            const q = query(
                collection(db, "ThreeBank"),
                where("arcanaUid", "==", auth.user.publicKey)
            );

            const querySnapshot = await getDocs(q);
            const dataArr = [];

            querySnapshot.forEach(doc => {
                dataArr.push({ id: doc.id, ...doc.data() });
            });

            setData(dataArr[0]);
        })();
    }, [auth]);

    return (
        <Box p={4} width={"100%"}>
            <Box
                sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                    borderRadius: "1vh",
                    px: 4,
                    py: 2,
                    my: 4,
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
                }}
            >
                <Typography
                    sx={{
                        fontSize: 40,
                        textAlign: "center"
                    }}
                >
                    Loan Details
                </Typography>
            </Box>

            {data?.loanPayments &&
                data?.loanPayments.map(item => {
                    if (item.currentPayment < parseInt(item.loanTenure)) {
                        console.log(
                            item.currentPayment,
                            parseInt(item.loanTenure)
                        );
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
                    }
                })}

            {data?.loanPayments?.length < 1 && (
                <Typography sx={{ marginTop: 10, fontSize: 24 }}>
                    Whoops! No Loans To Show Here
                </Typography>
            )}
        </Box>
    );
};

export default DashboardLoanPayment;
