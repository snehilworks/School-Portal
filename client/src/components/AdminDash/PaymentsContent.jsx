import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";

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
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Payments
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="month-select-label">Select Month</InputLabel>
              <Select
                labelId="month-select-label"
                id="month-select"
                value={selectedMonth}
                onChange={handleChangeMonth}
                fullWidth
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
          </Grid>
        </Grid>
        <List>
          {payments.map((payment) => (
            <ListItem key={payment.id}>
              <ListItemText
                primary={payment.studentName}
                secondary={`Status: ${
                  payment[selectedMonth.toLowerCase()]
                } (${selectedMonth})`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PaymentsContent;
