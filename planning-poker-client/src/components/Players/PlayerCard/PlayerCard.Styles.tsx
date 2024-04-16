import styled from "@emotion/styled";
import { Card, CardContent, CardHeader } from "@mui/material";

export const CustomPlayerCard = styled(Card)({
    maxWidth: "120px",
    minWidth: "120px",
    margin: "10px",
    height: "150px",
    marginTop: "40px",
    width: "100%",
    overflow: "initial",
    transition: "0.3s",
    borderRadius: "4px"
})

export const CustomPlayerCardTitle = styled(CardHeader)({
    display: "flex",
    textAlign: "center",
    borderRadius: "16px",
    border: "2px solid red",
    backgroundColor: "white",
    margin: "-20px auto 0",
    width: "88%",
    padding: "16px",
    height: "40px"
})