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
    CircularProgress,
    ListItemIcon
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import AdminApprovalListItem from "../../components/admin/AdminListItem";
import AdminListItem from "../../components/admin/AdminListItem";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc
} from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "@arcana/auth-react";
import DashboardNav from "../../components/accounts/DashboardNav";

function AdminApproval() {
    const auth = useAuth();

    const [data, setData] = useState([]);
    const [walletAddress, setWalletAddress] = useState("");
    const [approved, setApproved] = useState(8);
    const [pending, setPending] = useState(7);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);

            const q = query(
                collection(db, "ThreeBank"),
                where("isAccountApproved", "==", true)
            );
            const querySnapshot = await getDocs(q);

            let loanRequests = [];

            querySnapshot.forEach(doc => {
                const docData = doc.data().loanRequest;
                // console.log("jasjdbj",docData)
                docData.forEach(loanReq => {
                    if (loanReq.approvedStatus === "waiting")
                        loanRequests.push({
                            id: doc.id,
                            ...loanReq,
                            panCardNumber: doc.data().pan
                        });
                });
            });

            setData(loanRequests);

            setLoading(false);
        })();
    }, [auth]);

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
                maxHeight: "96vh",
                height: "96vh",
                borderRadius: "1vw",
                paddingX: "1.5vw",
                display: "flex",
                flexDirection: "row",
                marginY: "1.5vh",
                marginX: "1.5vw",
                overflowY: "scroll",
                paddingY: "4vh"
            }}
            className="awesome-bg-0 "
        >
            <DashboardNav
                routes={[
                    {
                        path: "/admin/approvals",
                        headingText: "Approve Account",
                        mainIcon: <HowToRegIcon fontSize="large" />
                    },
                    {
                        path: "/admin",
                        headingText: "Approve Loans",
                        mainIcon: <PriceCheckIcon fontSize="large" />
                    }
                ]}
            />
            <Box
                width={"80%"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "2vh",
                    paddingX: "5%"
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
                        height: "10vh"
                    }}
                >
                    <Typography variant="h4">Admin Portal</Typography>
                </Box>
                {data.length && data.map(item => <AdminListItem {...item} />)}
            </Box>
        </Box>
    );
}

export default AdminApproval;
