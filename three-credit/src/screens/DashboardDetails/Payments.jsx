import { Box, Dialog, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PaymentCalender from "../../components/PaymentCalender";
import AppreciateCard from "../../components/AppreciateCard";
import PaymentCalenderInfoLabel from "../../components/PaymentCalenderInfoLabel";
import DetailsCard from "../../components/DetailsCard";
import AccountListItem from "../../components/AccountListItem";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

import { useAuth } from "@arcana/auth-react";

const Payments = () => {
    const creditDataCtx = useContext(CreditDataContext);
    const auth = useAuth();

    const [isPaymentHistoryModal, setIsPaymentHistoryModal] = useState(false);
    const [paymentLefts, setPaymentLeft] = useState(0);
    const [paymentsPaid, setPaymentPaid] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [pan, setPan] = useState("");
    const activateHistoryModal = () => {
        setIsPaymentHistoryModal(true);
    };

    useEffect(() => {
        (async () => {
            const q = query(
                collection(db, "CreditDetails"),
                where("arcanaUid", "==", auth.user.publicKey)
            );
            const snapshot = await getDocs(q);
            let data;
            snapshot.forEach((doc) => {
                data = {
                    id: doc.id,
                    ...doc.data(),
                };
            });

            const q2 = query(
                collection(db, "ThreeBank"),
                where("pan", "==", data.pan)
            );
            const snapshot2 = await getDocs(q2);

            snapshot2.forEach((doc) => {
                data = doc.data().loanRequest;
            });
            setAccounts(data);
            console.log(data);
        })();
    }, [auth]);

    useEffect(() => {
        let temp1 = 0;
        let temp2 = 0;
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].approvedStatus === "approved") temp1 += 1;
        }

        setPaymentLeft(accounts.length || 0 - temp1);
        setPaymentPaid(temp1);
    }, [accounts]);
    useEffect(() => {
        setPan(creditDataCtx.pan);
    }, [creditDataCtx]);

    return (
        <Box width={"78%"} mx={"auto"}>
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
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 40,
                        textAlign: "center",
                    }}
                >
                    Payments
                </Typography>
            </Box>
            <Dialog
                onClose={() => setIsPaymentHistoryModal(false)}
                open={isPaymentHistoryModal}
            >
                <Box sx={{ p: 5 }} width={"100%"} height={"100%"}>
                    <PaymentCalender />
                </Box>
            </Dialog>
            <DetailsCard
                mainHeading={"High Impact"}
                lastUpdated={JSON.stringify(
                    creditDataCtx.userCreditRequest[0].timestamp
                )}
                label={"Good"}
                labelBackground={"orange"}
                leftHeadingNumber={paymentLefts}
                leftHeadingTitle={"Pending Loans"}
                rightHeadingNumber={paymentsPaid}
                rightHeadingTitle={"Approved Loans"}
            />
            <Box>
                <Typography variant="h4">Your Loans</Typography>
                {accounts.length > 0 &&
                    accounts.map((acc) => (
                        <AccountListItem
                            key={acc.loanId + acc.icon}
                            icon={acc.icon}
                            bankName={acc.loanId}
                            cardNumber={acc.cardNumber}
                            isActive={acc.approvedStatus === "approved"}
                            onClickHandle={acc.onClickHandle}
                            status={acc.approvedStatus}
                        />
                    ))}
                {!accounts?.length && (
                    <Typography sx={{ mt: 5 }}>No Loans To Show</Typography>
                )}
            </Box>
            {pan !== "Vijaymalya" && (
                <div>
                    <AppreciateCard
                        headingText={"On time payment in the month of December"}
                        subHeading={"Great! Keep on time paying"}
                        label={"Dec"}
                    />
                    <PaymentCalenderInfoLabel />{" "}
                </div>
            )}
        </Box>
    );
};

export default Payments;
