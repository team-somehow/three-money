import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useAuth } from "@arcana/auth-react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { Box, Typography } from "@mui/material";

const DashboardApproveStatus = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();

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
                threeBanksUserData = doc.data();
            });

            // let approvedByBank = true;
            let approvedByBank = threeBanksUserData?.isAccountApproved;

            console.log("approvedByBank", approvedByBank);

            if (approvedByBank) {
                navigate("/dashboard/details");
            } else {
                navigate("/dashboard/approved-status");
            }
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
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="h2">
                Your Account is Not yet Approved
            </Typography>
        </Box>
    );
};

export default DashboardApproveStatus;
