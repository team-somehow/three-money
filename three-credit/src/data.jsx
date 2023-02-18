import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import Person2Icon from "@mui/icons-material/Person2";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export const links = [
  {
    tagLabel: "2",
    tagLabelColor: "#a9e1c9",
    mainIcon: <AccessTimeIcon sx={{ fontSize: "1em", color: "inherit" }} />,
    iconColor: "#a9e1c9",
    headingText: "Payments",
    subText: "High Impact",
    buttonHeading: "Timely payments",
    percentValue: "100%",
    path: "/dashboard/details/payments",
    name: "Payments",
  },
  {
    tagLabel: "1",
    tagLabelColor: "#a9e1c9",
    mainIcon: <BarChartIcon sx={{ fontSize: "1em" }} />,
    iconColor: "#a9e1c9",
    headingText: "Age",
    subText: "Medium Impact",
    buttonHeading: "Total Accounts",
    percentValue: "1",
    path: "/dashboard/details/age",
    name: "Age",
  },
  {
    mainIcon: <TrendingUpIcon sx={{ fontSize: "1em", color: "inherit" }} />,
    iconColor: "#a9e1c9",
    subText: "High Impact",
    buttonHeading: "Credit Limit Used",
    percentValue: "33%",
    headingText: "Limit",
    path: "/dashboard/details/limit",
    name: "Limit",
  },
  {
    mainIcon: <ManageAccountsIcon sx={{ fontSize: "1em" }} />,
    iconColor: "#a9e1c9",
    headingText: "Accounts",
    subText: "Medium Impact",
    buttonHeading: "Total Accounts",
    percentValue: "1",
    path: "/dashboard/details/accounts",
    name: "Accounts",
  },
  {
    mainIcon: <QuestionAnswerIcon sx={{ fontSize: "1em" }} />,
    iconColor: "#a9e1c9",
    headingText: "Enquiry",
    subText: "Low Impact",
    buttonHeading: "Total Accounts",
    percentValue: "2",
    path: "/dashboard/details/enquiry",
    name: "Enquiry",
  },
  {
    tagLabel: "1",
    tagLabelColor: "#a9e1c9",
    mainIcon: <Person2Icon sx={{ fontSize: "1em" }} />,
    iconColor: "#a9e1c9",
    headingText: "Profile",
    subText: "Low Impact",
    buttonHeading: "Your Accounts",
    percentValue: "1",
    path: "/dashboard/details/profile",
    name: "Profile",
  },
];
