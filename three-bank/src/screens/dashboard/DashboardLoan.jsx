import { useAuth } from "@arcana/auth-react";
import {
    Box,
    Typography,
    TextField,
    Paper,
    Button,
    CircularProgress
} from "@mui/material";
import {
    collection,
    getDocs,
    query,
    updateDoc,
    where,
    doc,
    arrayUnion
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import DashboardLoanListItem from "../../components/dashboard/DashboardLoanListItem";
import { db } from "../../config/firebase";
import InputAdornment from "@mui/material/InputAdornment";

import contractAddress from "../../constants/contractAddress";
import { providers, Contract, utils, ethers } from "ethers";
import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
import { arcanaProvider } from "../../main";

const DashboardLoan = () => {
    const [loanVal, setLoanVal] = useState(0);
    const [loanTenure, setLoanTenure] = useState(0);
    const [loanRequests, setLoanRequest] = useState([]);
    const [pan, setPan] = useState(null);
    const [loading, setLoading] = useState(false);

    const auth = useAuth();

    useEffect(() => {
        (async () => {
            const q = query(
                collection(db, "ThreeBank"),
                where("arcanaUid", "==", auth.user.publicKey)
            );

            const querySnapshot = await getDocs(q);
            const dataArr = [];

            querySnapshot.forEach(doc => {
                dataArr.push({ id: doc.id, ...doc.data() });
            });

            setPan(dataArr[0].pan);
            setLoanRequest(dataArr[0].loanRequest);
        })();
    }, [auth]);

    const handleLoanRequest = async () => {
        setLoading(true);
        if (!auth.user.publicKey) {
            alert("Arcana nahi aya");
            return;
        }
        if (!pan) {
            alert("pan nahi aya");
            return;
        }

        const provider = new providers.Web3Provider(arcanaProvider.provider);
        const signer = provider.getSigner();
        const contract = new Contract(contractAddress, ThreeBank.abi, signer);

        let requestLoanData = {
            loanType: "Home",
            loanAmount: ethers.utils.parseEther(loanVal),
            loanTenure: loanTenure,
            repaymentStatus: "ongoing"
        };

        await contract.requestLoan(pan, requestLoanData);

        const q = query(
            collection(db, "ThreeBank"),
            where("arcanaUid", "==", auth.user.publicKey)
        );

        const data = await getDocs(q);
        let datafromfirebase = [];
        data.forEach(doc => {
            datafromfirebase.push({ id: doc.id, ...doc.data() });
        });

        const accountRef = doc(db, "ThreeBank", datafromfirebase[0].id);
        let temp = parseInt(Math.random() * 100).toString();
        await updateDoc(accountRef, {
            loanRequest: arrayUnion({
                loanId: temp,
                loanAmmount: loanVal,
                loanTenure: loanTenure,
                approvedStatus: "waiting",
                timestamp: new Date()
            })
        });
        setLoanRequest(prev => {
            prev.push({
                loanId: temp,
                loanAmmount: loanVal,
                loanTenure: loanTenure,
                approvedStatus: "waiting",
                timestamp: new Date()
            });
            return [...prev];
        });
        console.log("hogaya bhai");
        setLoading(false);
    };

    return (
        <Box width={"78%"} mx={"auto"} my={4}>
            <Typography variant="h3">Loan Details</Typography>
            <Box
                sx={{
                    width: "100%",
                    my: 3,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "1vh",
                    paddingY: "3vh",
                    paddingX: "2vw"
                }}
                component={Paper}
            >
                <Box display={"flex"} alignItems={"center"}>
                    <TextField
                        placeholder="Enter Loan Amount"
                        label="Loan Amount"
                        value={loanVal}
                        onChange={e => setLoanVal(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img
                                        src="/assets/matic.png"
                                        width={"40px"}
                                    />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    ></TextField>
                    <Box width={"400px"}></Box>
                    <TextField
                        placeholder="Enter Loan tenure"
                        label="Loan Tenure"
                        value={loanTenure}
                        onChange={e => setLoanTenure(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    months
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    ></TextField>
                </Box>
                <Button
                    sx={{
                        mx: "auto",
                        mt: 4,
                        width: "50%",
                        fontSize: "18px"
                    }}
                    variant="contained"
                    onClick={handleLoanRequest}
                    disabled={loading}
                >
                    {loading && <CircularProgress />}
                    {!loading && "Request Loan"}
                </Button>
            </Box>
            <Typography variant="h3">Loan Requests</Typography>
            {loanRequests.map(item => (
                <DashboardLoanListItem {...item} />
            ))}
        </Box>
    );
};

export default DashboardLoan;
