import {
    Avatar,
    Box,
    Container,
    List,
    ListItemAvatar,
    Typography,
    ListItem,
    ListItemText,
    Divider,
    Card,
    Button,
    Paper,
    Grid,
    ListItemIcon,
    CircularProgress,
    IconButton
} from "@mui/material";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "@arcana/auth-react";
import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc
} from "@firebase/firestore";
import { db } from "../../config/firebase";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { providers, Contract, utils } from "ethers";
import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
import contractAddress from "../../constants/contractAddress";
import { arcanaProvider } from "../../main";
import InputAdornment from "@mui/material/InputAdornment";
import RefreshIcon from "@mui/icons-material/Refresh";
import BarGraph from "../../components/BarGraph";

function DashboardDetails() {
    const provider = new providers.Web3Provider(arcanaProvider.provider);
    const signer = provider.getSigner();
    const contract = new Contract(contractAddress, ThreeBank.abi, signer);

    const auth = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState();
    const [balance, setBalance] = useState();
    const [pan, setPan] = useState();
    const [docId, setDocId] = useState();

    const [depositVal, setDepositVal] = useState(0);
    const [withdrawVal, setWithdrawVal] = useState(0);

    useEffect(() => {
        (async () => {
            setLoading(true);

            if (!auth) return;
            if (!auth?.user) return;
            if (!auth.user?.publicKey) return;

            console.log(auth?.user?.publicKey);

            const q = query(
                collection(db, "ThreeBank"),
                where("arcanaUid", "==", auth?.user?.publicKey)
            );
            const querySnapshot = await getDocs(q);

            let threeBanksUserData = null;

            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data());
                threeBanksUserData = { id: doc.id, ...doc.data() };
            });

            if (
                !threeBanksUserData?.isAccountApproved ||
                threeBanksUserData?.isAccountApproved === undefined
            ) {
                navigate("/dashboard/approved-status");
                return;
            }

            if (threeBanksUserData?.bankDetails?.balance !== undefined) {
                setBalance(threeBanksUserData?.bankDetails?.balance);
                setPan(threeBanksUserData?.pan);
                setDocId(threeBanksUserData?.id);
            }

            setLoading(false);
        })();
    }, [auth]);

    const fetchBalance = async () => {
        console.log("Result");

        await arcanaProvider.connect();

        const getBalData = await contract.getBalance(pan);

        console.log(ethers.utils.formatEther(getBalData));
        setBalance(ethers.utils.formatEther(getBalData))
    };

    const deposit = async () => {
        console.log("Deposit");
        // await arcanaProvider.connect();

        console.log("deposit", depositVal);
        console.log("__________________");
        console.log("pan", pan);

        const amountInWei = utils.parseEther(depositVal.toString());

        console.log("amountInWei", amountInWei);

        await contract.deposit(pan, {
            value: amountInWei
        });

        const userDataRef = doc(db, "ThreeBank", docId);
        await updateDoc(userDataRef, {
            bankDetails: {
                balance: parseFloat(balance) + parseFloat(depositVal)
            }
        });
        setBalance(parseFloat(balance) + parseFloat(depositVal));
        setDepositVal(0);
    };
    const withdraw = async () => {
        console.log("Withdraw");
        // await arcanaProvider.connect();

        const amountInWei = utils.parseEther(withdrawVal.toString());
        console.log("amountInWei", amountInWei);

        await contract.withdraw(amountInWei, pan);

        const userDataRef = doc(db, "ThreeBank", docId);
        await updateDoc(userDataRef, {
            bankDetails: {
                balance: parseFloat(balance) - parseFloat(withdrawVal)
            }
        });
        setBalance(parseFloat(balance) - parseFloat(withdrawVal));
        setDepositVal(0);
    };

    if (loading)
        return (
            <div className="center-container">
                <CircularProgress />
            </div>
        );

    return (
        <Box
            width={"76%"}
            mx={"auto"}
            my={4}
            sx={{
                display: "flex"
            }}
        >
            <Box width={"40%"}>
                <Box>
                    <Typography variant="h3">My Wallet</Typography>
                    <Box position={"relative"} mt={1}>
                        <img
                            src="/assets/Wallet.png"
                            width={"80%"}
                            style={{ marginRight: "auto" }}
                        />
                        <Typography
                            variant="h6"
                            position={"absolute"}
                            bottom={"30px"}
                            left={"20px"}
                            color={"white"}
                        >
                            {pan}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    width={"80%"}
                    sx={{
                        borderRadius: "10px",
                        my: 2,
                        p: 2,
                        display: "flex",
                        flexDirection: "column"
                    }}
                    component={Paper}
                >
                    <TextField
                        type="number"
                        value={depositVal}
                        onChange={e => setDepositVal(e.target.value)}
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
                    />
                    <Button
                        onClick={deposit}
                        variant="contained"
                        sx={{
                            fontSize: "18px",
                            px: 3,
                            py: 1,
                            mx: "auto",
                            mt: 2
                        }}
                    >
                        Deposit
                    </Button>
                </Box>

                <Box
                    width={"80%"}
                    sx={{
                        borderRadius: "10px",
                        my: 2,
                        p: 4,
                        display: "flex",
                        flexDirection: "column"
                    }}
                    component={Paper}
                >
                    <TextField
                        type="number"
                        value={withdrawVal}
                        onChange={e => setWithdrawVal(e.target.value)}
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
                    />
                    <Button
                        onClick={withdraw}
                        variant="contained"
                        sx={{
                            fontSize: "18px",
                            px: 3,
                            py: 1,
                            mx: "auto",
                            mt: 2
                        }}
                    >
                        Withdraw
                    </Button>
                </Box>
            </Box>
            <Box
                width={"60%"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "10px",
                        p: 4
                    }}
                    component={Paper}
                >
                    <Box>
                        <Typography variant="h6">Your Balance</Typography>
                        <Typography
                            variant="h2"
                            display={"flex"}
                            alignItems={"center"}
                        >
                            <img src="/assets/matic.png" width={"80px"} />
                            {balance}
                        </Typography>
                        <Typography variant="h6">
                            Last Updated: <b>12 Feb 2023</b>
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={fetchBalance}
                        variant="outlined"
                        title="Fetch Balance"
                    >
                        <RefreshIcon sx={{ fontSize: "48px" }} />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "10px",
                        p: 2,
                        mt: 2
                    }}
                    component={Paper}
                >
                    <Typography variant="h4">Monthly Activities</Typography>
                    <BarGraph />
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardDetails;
