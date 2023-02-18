import { useAuth } from "@arcana/auth-react";
import { Box, Typography, TextField, Paper, Button } from "@mui/material";
import {
    collection,
    getDocs,
    query,
    updateDoc,
    where,
    doc,
    arrayUnion,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import DashboardLoanListItem from "../../components/dashboard/DashboardLoanListItem";
import { db } from "../../config/firebase";

// const loanRequests = [
//     {
//         loanId: "loan 1",
//         loanAmmount: 3000,
//         approvedStatus: "approved",
//         timestamp: new Date(),
//     },
//     {
//         loanId: "loan 2",
//         loanAmmount: 4000,
//         approvedStatus: "rejected",
//         timestamp: new Date(),
//     },
//     {
//         loanId: "loan 3",
//         loanAmmount: 4000,
//         approvedStatus: "waiting",
//         timestamp: new Date(),
//     },
// ];

const DashboardLoan = () => {
    const [loanVal, setLoanVal] = useState(0);
    const [loanTenure, setLoanTenure] = useState(0);
    const [loanRequests, setLoanRequest] = useState([]);

    const auth = useAuth();

    useEffect(() => {
        (async () => {
            const q = query(
                collection(db, "ThreeBank"),
                where("arcanaUid", "==", auth.user.publicKey)
            );

            const querySnapshot = await getDocs(q);
            const dataArr = [];

            querySnapshot.forEach((doc) => {
                dataArr.push({ id: doc.id, ...doc.data() });
            });
            setLoanRequest(dataArr[0].loanRequest);
        })();
    }, [auth]);

    const handleLoanRequest = async () => {
        if (!auth.user.publicKey) {
            alert("Arcana nai aya");
            return;
        }
        const q = query(
            collection(db, "ThreeBank"),
            where("arcanaUid", "==", auth.user.publicKey)
        );

        const data = await getDocs(q);
        let datafromfirebase = [];
        data.forEach((doc) => {
            datafromfirebase.push({ id: doc.id, ...doc.data() });
        });

        const accountRef = doc(db, "ThreeBank", datafromfirebase[0].id);
        await updateDoc(accountRef, {
            loanRequest: arrayUnion({
                loanId: (Math.random() * 100).toString(),
                loanAmmount: loanVal,
                loanTenure: loanTenure,
                approvedStatus: "waiting",
                timestamp: new Date(),
            }),
        });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1vh",
                    borderRadius: "1vh",
                    paddingY: "3vh",
                    paddingX: "2vw",
                    mb: 3,
                }}
                component={Paper}
                // elevation={6}
                // className={"awesome-bg-0"}
            >
                <Typography>Loan Details</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1vh",
                    borderRadius: "1vh",
                    paddingY: "3vh",
                    paddingX: "2vw",
                    mb: 3,
                }}
                component={Paper}
                // elevation={6}
                // className={"awesome-bg-0"}
            >
                <TextField
                    placeholder="Enter Loan Amount"
                    label="Loan Amount"
                    value={loanVal}
                    onChange={(e) => setLoanVal(e.target.value)}
                ></TextField>
                <TextField
                    placeholder="Enter Loan tenure"
                    label="Loan Tenure"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                ></TextField>
                <Button onClick={handleLoanRequest}>Request Loan</Button>
            </Box>
            <Typography>Loan Requests</Typography>
            {loanRequests.map((item) => (
                <DashboardLoanListItem {...item} />
            ))}
        </Box>
    );
};

export default DashboardLoan;
