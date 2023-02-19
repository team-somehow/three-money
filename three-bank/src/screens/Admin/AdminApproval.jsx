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
    ListItemIcon
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AdminApprovalListItem from "../../components/admin/AdminApprovalListItem";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../config/firebase";
import DashboardNav from "../../components/accounts/DashboardNav";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

function AdminApproval() {
    const [data, setData] = useState([]);
    const [walletAddress, setWalletAddress] = useState("");
    const [approved, setApproved] = useState(8);
    const [pending, setPending] = useState(7);
    const navigate = useNavigate();
    const auth = useAuth();
    const [loading, setLoading] = useState();

    // _________________________________________
    // TODO: approve karne par
    // arcanaUid se ko ThreeCredit se lo aur
    // isAccountApproved ko true karo

    // ye karne ke baad Credit details waale mao thoos do
    // _________________________________________

    useEffect(() => {
        (async () => {
            setLoading(true);

            if (!auth) return;
            if (!auth?.user) return;
            if (!auth.user?.publicKey) return;

            const q = query(
                collection(db, "ThreeBank"),
                where("isAccountApproved", "==", false)
            );
            const querySnapshot = await getDocs(q);

            const dataFromFb = [];
            querySnapshot.forEach(doc => {
                const loopWaalaData = doc.data();
                dataFromFb.push({
                    id: doc.id,
                    name: loopWaalaData.personalDetails.name,
                    FatherName: loopWaalaData.personalDetails.fatherName,
                    address: loopWaalaData.personalDetails.address,
                    panCardNumber: loopWaalaData.personalDetails.pan,
                    mobileNumber: loopWaalaData.personalDetails.mobile,
                    panCard: loopWaalaData.personalDetails.documents.panCardUrl,
                    addressProof:
                        loopWaalaData.personalDetails.documents.addressProofUrl,
                    SignatureProof:
                        loopWaalaData.personalDetails.documents
                            .signatureProofUrl,
                    IncomeProof:
                        loopWaalaData.personalDetails.documents.incomeProofUrl
                });
            });
            setData(dataFromFb);
        })();
    }, [auth]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row"
            }}
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
                width={"74%"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    mx: "auto"
                }}
            >
                <Typography my={4} variant="h4">
                    Aprove Accounts - Admin
                </Typography>
                {data.map(item => (
                    <AdminApprovalListItem {...item} />
                ))}
            </Box>
        </Box>
    );
}

export default AdminApproval;
