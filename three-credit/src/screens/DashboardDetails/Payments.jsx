import { Box, Dialog, Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PaymentCalender from "../../components/PaymentCalender";
import AppreciateCard from "../../components/AppreciateCard";
import PaymentCalenderInfoLabel from "../../components/PaymentCalenderInfoLabel";
import DetailsCard from "../../components/DetailsCard";
import AccountListItem from "../../components/AccountListItem";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";

const Payments = () => {
    const creditDataCtx = useContext(CreditDataContext);

    const [isPaymentHistoryModal, setIsPaymentHistoryModal] = useState(false);
    const [paymentLefts, setPaymentLeft] = useState(0);
    const [paymentsPaid, setPaymentPaid] = useState(0);
    const activateHistoryModal = () => {
        setIsPaymentHistoryModal(true);
    };
    const accounts = [
        {
            icon: "/assets/hdfc_logo.png",
            bankName: "Home Loan",
            cardNumber: "**** *890",
            loanTenure: 15,
            paymentsMade: 15,
            onClickHandle: () => activateHistoryModal(),
        },
        {
            bankName: "SBI Bank",
            cardNumber: "**** *69",
            loanTenure: 15,
            paymentsMade: 5,
            onClickHandle: () => activateHistoryModal(),
        },
    ];

    useEffect(() => {
        let temp1 = 0;
        let temp2 = 0;
        for (let i = 0; i < accounts.length; i++) {
            temp1 += accounts[i].loanTenure - accounts[i].paymentsMade;
            temp2 += accounts[i].paymentsMade;
        }
        setPaymentLeft(temp1);
        setPaymentPaid(temp2);
    }, [accounts]);

    return (
        <Box width={"78%"} mx={"auto"}>
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
                leftHeadingTitle={"Payments Left"}
                rightHeadingNumber={paymentsPaid}
                rightHeadingTitle={"Payments Paid"}
            />
            <Box>
                <Typography variant="h4">Your Loans</Typography>
                {accounts.map((acc) => (
                    <AccountListItem
                        key={acc.bankName + acc.icon}
                        icon={acc.icon}
                        bankName={acc.bankName}
                        cardNumber={acc.cardNumber}
                        isActive={acc.loanTenure === acc.paymentsMade}
                        onClickHandle={acc.onClickHandle}
                    />
                ))}
            </Box>
            <AppreciateCard
                headingText={"On time payment in the month of December"}
                subHeading={"Great! Keep on time paying"}
                label={"Dec"}
            />
            <PaymentCalenderInfoLabel />
        </Box>
    );
};

export default Payments;
