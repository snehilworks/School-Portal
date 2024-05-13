import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Box,
  Divider,
} from "@mui/material";

const PaymentsContent = () => {
  const [payments, setPayments] = useState([
    { id: 1, studentName: "John Doe", january: "Paid", february: "Unpaid" },
    { id: 2, studentName: "Jane Smith", january: "Paid", february: "Paid" },
    {
      id: 3,
      studentName: "Alice Johnson",
      january: "Unpaid",
      february: "Paid",
    },
  ]);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Card
      sx={{ width: "100%", maxWidth: 800, margin: "auto", borderRadius: 3 }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
            Payments
          </Typography>
          <FormControl>
            <InputLabel id="month-select-label" sx={{ fontWeight: 500 }}>
              Select Month
            </InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              value={selectedMonth}
              onChange={handleChangeMonth}
              sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "text.primary",
                },
              }}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List disablePadding>
          {payments.map((payment) => (
            <ListItem
              key={payment.id}
              divider
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "background.paper",
                },
              }}
            >
              <ListItemText
                primary={payment.studentName}
                secondary={`Status: ${
                  payment[selectedMonth.toLowerCase()]
                } (${selectedMonth})`}
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{ fontWeight: 400 }}
              />
              <Chip
                label={payment[selectedMonth.toLowerCase()]}
                color={
                  payment[selectedMonth.toLowerCase()] === "Paid"
                    ? "success"
                    : "error"
                }
                sx={{
                  fontWeight: 500,
                  fontSize: 14,
                  height: 28,
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PaymentsContent;