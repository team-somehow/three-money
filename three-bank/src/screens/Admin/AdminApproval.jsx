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
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import AdminApprovalListItem from "../../components/admin/AdminApprovalListItem";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../config/firebase";

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
            querySnapshot.forEach((doc) => {
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
                        loopWaalaData.personalDetails.documents.incomeProofUrl,
                });
            });
            setData(dataFromFb);
        })();
    }, [auth]);

    return (
        <Box
            component={Paper}
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
                paddingY: "4vh",
            }}
            className="awesome-bg-0 "
        >
            <Box width={"20%"}>
                {/* <img
                    src="/logo.png"
                    style={{
                        height: "10vh",
                        // width: "100%",
                        margin:"auto"
                    }}
                /> */}
                <div
                    style={{
                        paddingLeft: "18px",
                        marginTop: "12px",
                        marginBottom: "28px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <ListItem onClick={() => navigate("/")}>
                        <ListItemIcon>
                            <img src="/logo.png" width={"40px"} />
                        </ListItemIcon>
                        <ListItemText>
                            <h2>3 Bank</h2>
                        </ListItemText>
                    </ListItem>
                </div>
            </Box>
            <Box
                width={"80%"}
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
                    <Typography variant="h4">Admin Portal</Typography>
                </Box>
                {data.map((item) => (
                    <AdminApprovalListItem {...item} />
                ))}
            </Box>
        </Box>
    );
}

export default AdminApproval;
