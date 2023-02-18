import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AccountListItem from "../../components/AccountListItem";
import DetailsCard from "../../components/DetailsCard";

import AppreciateCard from "../../components/AppreciateCard";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";

const Age = () => {
  const CreditDataCtx = useContext(CreditDataContext);
  const [enquieries, setEnquiries] = useState([]);
  const [userCredit, setUserCredit] = useState([
    {
      timestamp: new Date(),
    },
  ]);
  useEffect(() => {
    const { enquiry, userCreditRequest } = CreditDataCtx;
    setEnquiries(enquiry);
    setUserCredit(userCreditRequest);
  }, [CreditDataCtx]);

  return (
    <Box width={"76%"} m={"auto"}>
      {userCredit && (
        <DetailsCard
          mainHeading={"Low Impact"}
          lastUpdated={userCredit[0].timestamp.toString()}
          label={"Excellent"}
          labelBackground={"green"}
          leftHeadingNumber={enquieries.length}
          leftHeadingTitle={"Enquires for Loan"}
          rightHeadingNumber={0}
          rightHeadingTitle={"For Credit Cards"}
        />
      )}
      <AppreciateCard
        headingText={`${enquieries.length} enquiry in last 2 Days`}
        subHeading={
          "Good Job! Therer are any very few enquires in the last 30 days"
        }
        label={""}
      />
      <Box>
        <Typography variant="h4">Enquiry Details</Typography>
        {enquieries.map((item) => (
          <AccountListItem
            bankName={item.enquiryBy}
            cardNumber={item.enquiryId}
            icon={item.bankLogo}
            // isActive={false}
            enquiryDate={JSON.stringify(item.timestamp)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Age;