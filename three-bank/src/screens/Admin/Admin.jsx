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
                display: "flex",
                flexDirection: "row"
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
                width={"76%"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    mx: "auto"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        direction: "column",
                        justifyContent: "center",
                        borderRadius: "1vh",
                        px: 4,
                        py: 2,
                        my: 4,
                        mt: 6,
                        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 40,
                            textAlign: "center"
                        }}
                    >
                        Approve Loans | Admin
                    </Typography>
                </Box>
                {data.length > 0 &&
                    data.map(item => <AdminListItem {...item} />)}
                {data.length < 1 && (
                    <Typography sx={{ marginTop: 10, fontSize: 24 }}>
                        Whoops! No Loans To Show Here
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default AdminApproval;
