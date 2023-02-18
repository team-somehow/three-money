import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { arcanaProvider } from "../../main";
import contractAddress from "../../constants/contractAddress";
import { providers, Contract, utils } from "ethers";
import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";

const AdminApprovalListItem = (props) => {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, ThreeBank.abi, signer);
    const item = props;
    console.log(contractAddress);
    const [expand, setExpand] = useState(false);

    const [loading, setLoading] = useState(false);

    const approve = async () => {
        await arcanaProvider.connect();
        const personalData = {
            name: item.name,
            dateOfBirth: "01-01-1980",
            gender: "Male",
            panNumber: item.panCardNumber,
        };

        await contract.enroll(personalData, personalData.panNumber);

        await updateDoc(doc(db, "ThreeBank", item.id), {
            isAccountApproved: true,
        });
    };

    return (
        <>
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
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        marginX: "2%",
                        height: "100%",
                        flexGrow: 1,
                        gap: "1.5vh",
                    }}
                >
                    <Typography variant="h4">{item.name}</Typography>
                    <Typography variant="body1">{item.city}</Typography>
                    {expand && (
                        <>
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
                        </>
                    )}
                </Box>
                <Box width="20%">
                    <Button
                        fullWidth
                        onClick={() => setExpand(!expand)}
                        sx={{
                            marginTop: "10%",
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
                                marginTop: "10%",
                            }}
                            variant="contained"
                            disabled={loading}
                        >
                            Verify
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default AdminApprovalListItem;
