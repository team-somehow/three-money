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
    console.log(result);
  };

  if (!creditDataCtx?.userCreditRequest)
    return <div>account to bana le bhai</div>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box display={"flex"} alignItems={"center"}>
        <Box
          component={Paper}
          p={2}
          width={"60%"}
          height={"60vh"}
          m={"auto"}
          mt={6}
          mx={4}
        >
          <Typography variant="h2" py={2}>
            Your Score History
          </Typography>
          <LineChart />
        </Box>
        <Box
          component={Paper}
          p={2}
          width={"40%"}
          height={"60vh"}
          m={"auto"}
          mt={6}
          mx={4}
          display={"flex"}
          justifyContent={"center"}
          alignContent={"space-evenly"}
          flexDirection={"column"}
        >
          <Typography variant="h3" align="center" py={2}>
            Request Credit Score
          </Typography>
          <CreditMeter creditScore={creditScore} />
          <Typography align="center" variant="h5" mb={2}>
            Last Updated:{" "}
            <b>
              {JSON.stringify(creditDataCtx.userCreditRequest[0].timestamp)}
            </b>
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#618EF6", color: "white" }}
            onClick={updateScore}
          >
            Update Score
          </Button>
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
