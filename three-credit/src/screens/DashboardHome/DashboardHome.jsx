import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../components/LineChart";
import {
    Box,
    Button,
    Container,
    dividerClasses,
    Paper,
    Typography,
} from "@mui/material";
import SummaryDetails from "../../components/SummaryDetails";
import ThreeCredit from "../../artifacts/contracts/ThreeCredit.sol/ThreeCredit.json";
import { links } from "../../data";
import CreditMeter from "../../components/CreditMeter";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";
import { useState } from "react";
import { providers, Contract, utils } from "ethers";
import { arcanaProvider } from "../../main";
import contractAddress from "../../constants/contractAddress";
import { useEffect } from "react";
import CachedIcon from "@mui/icons-material/Cached";

const DashboardHome = () => {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, ThreeCredit.abi, signer);

    const creditDataCtx = useContext(CreditDataContext);
    const [creditScore, setCreditScore] = useState(
        creditDataCtx.userCreditRequest[0].creditScore
    );

    const updateScore = async () => {
        await arcanaProvider.connect();
        const result = await contract.calculateCreditScore(creditDataCtx.pan);
        setCreditScore(utils.formatEther(result));
        console.log(result, utils.formatEther(result));
    };

    if (!creditDataCtx?.userCreditRequest)
        return <div>account to bana le bhai</div>;

    return (
        <Box
            sx={{
                display: "flex",
                background: `conic-gradient(
        from 136.11deg at 39.58% 43.78%,
        #f5f6ff -56.04deg,
        #f8f9ff 8.89deg,
        #f4f8ff 120.09deg,
        #f5f6ff 303.96deg,
        #f8f9ff 368.89deg
    )`,
                // background: `url("/assets/bg5.png   ") no-repeat`,
                // backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                height: "100vh",
            }}
        >
            <Box
                display={"flex"}
                alignItems={"center"}
                flexDirection={"column"}
                width={"40%"}
            >
                <Box
                    width={"80%"}
                    component={Paper}
                    p={2}
                    mt={4}
                    ml={4}
                    display={"flex"}
                    justifyContent={"center"}
                    alignContent={"space-evenly"}
                    flexDirection={"column"}
                >
                    <Typography variant="h3" align="center">
                        Request Credit Score
                    </Typography>
                    <CreditMeter creditScore={creditScore} />
                    <Typography align="center" variant="h5" mb={2}>
                        Last Updated:{" "}
                        <b>
                            {JSON.stringify(
                                new Date(
                                    creditDataCtx.userCreditRequest[0].timestamp
                                ).toDateString()
                            )}
                        </b>
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            py: 2,
                            bgcolor: "#618EF6",
                            color: "white",
                            mx: "auto",
                        }}
                        onClick={updateScore}
                        startIcon={<CachedIcon />}
                    >
                        Update Score
                    </Button>
                </Box>
                <Box component={Paper} p={2} width={"80%"} ml={4} mt={2}>
                    <Typography variant="h2" py={2}>
                        Your Score History
                    </Typography>
                    <LineChart />
                </Box>
            </Box>
            <SummaryDetails links={links} />
            {/* <Link to="/dashboard/">Home</Link>
      <Link to="/dashboard/details">Dashboard Details</Link>
      {links.map((link) => (
        <Link to={link.path}>{link.name}</Link>
      ))} */}
        </Box>
    );
};

export default DashboardHome;
