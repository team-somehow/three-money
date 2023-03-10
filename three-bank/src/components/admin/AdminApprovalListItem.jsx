import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { arcanaProvider } from "../../main";
import contractAddress from "../../constants/contractAddress";
import { providers, Contract, utils } from "ethers";
import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
import { useNavigate } from "react-router-dom";

const AdminApprovalListItem = props => {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, ThreeBank.abi, signer);
    const item = props;
    const [expand, setExpand] = useState(false);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const approve = async () => {
        setLoading(true);
        await arcanaProvider.connect();
        const personalData = {
            name: item.name,
            dateOfBirth: "01-01-1980",
            gender: "Male",
            panNumber: item.panCardNumber
        };

        await contract.enroll(personalData, personalData.panNumber, {
            employerName: "Arya Nair",
            occupation: "SWE",
            incomePerYear: 100000,
            startTime: "01-01-1980",
            endTime: "01-01-1980"
        });

        await updateDoc(doc(db, "ThreeBank", item.id), {
            isAccountApproved: true
        });
        navigate(0);
        setLoading(false);
    };

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1vh",
                    borderRadius: "1vh",
                    paddingY: "3vh",
                    paddingX: "2vw",
                    mb: 3
                }}
                component={Paper}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        marginX: "2%",
                        height: "100%",
                        flexGrow: 1,
                        gap: "1.5vh"
                    }}
                >
                    <Typography variant="h4">{item.name}</Typography>
                    <Typography variant="body1">{item.city}</Typography>
                    {expand && (
                        <div>
                            <Typography variant="body1">
                                Father/Husband Name: {item.FatherName}
                            </Typography>
                            <Typography variant="body1">
                                Address: {item.address}
                            </Typography>
                            <Typography variant="body1">
                                PanCard Number: {item.panCardNumber}
                            </Typography>
                            <Typography variant="body1">
                                Mobile Number: {item.mobileNumber}
                            </Typography>

                            <a href={item.panCard} target="_blank">
                                <Button fullWidth variant="outlined">
                                    PanCard
                                </Button>
                            </a>
                            <a href={item.addressProof} target="_blank">
                                <Button fullWidth variant="outlined">
                                    Address Proof
                                </Button>
                            </a>
                            <a href={item.SignatureProof} target="_blank">
                                <Button fullWidth variant="outlined">
                                    Signature Proof
                                </Button>
                            </a>
                            <a href={item.IncomeProof} target="_blank">
                                <Button fullWidth variant="outlined">
                                    Income Proof
                                </Button>
                            </a>
                        </div>
                    )}
                </Box>
                <Box width="20%">
                    <Button
                        fullWidth
                        onClick={() => setExpand(!expand)}
                        sx={{
                            marginTop: "10%"
                        }}
                        variant="outlined"
                        endIcon={
                            !expand ? (
                                <KeyboardDoubleArrowDownIcon />
                            ) : (
                                <KeyboardDoubleArrowUpIcon />
                            )
                        }
                    >
                        {expand ? `Collapse` : `Expand`}
                    </Button>
                    {expand && (
                        <Button
                            fullWidth
                            onClick={() => {
                                approve();
                            }}
                            sx={{
                                marginTop: "10%"
                            }}
                            variant="contained"
                            disabled={loading}
                        >
                            {!loading && "Verify"}

                            {loading && <CircularProgress />}
                        </Button>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default AdminApprovalListItem;
