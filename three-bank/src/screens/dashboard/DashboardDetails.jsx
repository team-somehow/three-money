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
    doc,
} from "@firebase/firestore";
import { db } from "../../config/firebase";

import { useNavigate } from "react-router-dom";
import { providers, Contract, utils } from "ethers";
import ThreeBank from "../../artifacts/contracts/ThreeBank.sol/ThreeBank.json";
import contractAddress from "../../constants/contractAddress";
import { arcanaProvider } from "../../main";

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

            querySnapshot.forEach((doc) => {
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

        console.log(getBalData);
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
            value: amountInWei,
        });

        const userDataRef = doc(db, "ThreeBank", docId);
        await updateDoc(userDataRef, {
            bankDetails: {
                balance: parseFloat(balance) + parseFloat(depositVal),
            },
        });
        setBalance(parseFloat(balance) + parseFloat(depositVal));
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
                balance: parseFloat(balance) - parseFloat(withdrawVal),
            },
        });
        setBalance(parseFloat(balance) - parseFloat(withdrawVal));
    };

    if (loading)
        return (
            <div className="center-container">
                <CircularProgress />
            </div>
        );

    return (
        <Box
            width={"97vw"}
            elevation={12}
            sx={{
                height: "96vh",
                paddingX: "1.5vw",
                display: "flex",
                flexDirection: "row",
                marginY: "1.5vh",
                marginX: "1.5vw",
                overflowY: "scroll",
                paddingY: "4vh",
            }}
        >
            <Box
                width={"100%"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "2vh",
                    paddingX: "5%",
                }}
            >
                <Box
                    component={Paper}
                    sx={{
                        backgroundColor: "white",
                        padding: "2%",
                        textAlign: "center",
                        borderRadius: "0.5vw",
                        marginBottom: "4.5vh",
                        height: "10vh",
                    }}
                >
                    <Typography variant="h4">Your Account</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1vh",
                        borderRadius: "1vh",
                        alignItems: "center",

                        paddingY: "3vh",
                        paddingX: "5vw",
                        mb: 3,
                    }}
                    component={Paper}
                    // elevation={6}
                    // className={"awesome-bg-0"}
                >
                    <Typography>Balance: {balance}</Typography>
                    <Button onClick={fetchBalance} variant="outlined">
                        Fetch Balance{" "}
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1vh",
                        borderRadius: "1vh",
                        alignItems: "center",

                        paddingY: "3vh",
                        paddingX: "5vw",
                        mb: 3,
                    }}
                    component={Paper}
                    // elevation={6}
                    // className={"awesome-bg-0"}
                >
                    <TextField
                        type="number"
                        value={depositVal}
                        onChange={(e) => setDepositVal(e.target.value)}
                    />
                    <Button onClick={deposit} variant="outlined">
                        Deposit
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1vh",
                        borderRadius: "1vh",
                        alignItems: "center",

                        paddingY: "3vh",
                        paddingX: "5vw",
                        mb: 3,
                    }}
                    component={Paper}
                    // elevation={6}
                    // className={"awesome-bg-0"}
                >
                    <TextField
                        type="number"
                        value={withdrawVal}
                        onChange={(e) => setWithdrawVal(e.target.value)}
                    />
                    <Button onClick={withdraw} variant="outlined">
                        Withdraw
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardDetails;
