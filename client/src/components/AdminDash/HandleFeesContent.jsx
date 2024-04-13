import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  Typography,
  Card,
  CardContent,
  Container,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Grow,
} from "@mui/material";

function FeeForm() {
  const [classIds, setClassIds] = useState([]);
  const [feeData, setFeeData] = useState({
    name: "",
    description: "",
    amount: 0,
    currency: "",
    type: "",
    selectedClass: "",
  });
  const [classes, setClasses] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:400/api/classes");
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        console.error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      setFeeData({ ...feeData, type: value });
    } else {
      setFeeData({ ...feeData, [name]: value });
    }
  };

  const handleClassChange = (e) => {
    setFeeData({ ...feeData, selectedClass: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const response = await fetch("/api/set-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classIds, feeData }),
      });

      if (response.ok) {
        alert("Fees set for classes successfully");
      } else {
        alert("Failed to set fees for classes");
      }
    } catch (error) {
      console.error("Error setting fees:", error.message);
      alert("Failed to set fees for classes");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Card
          variant="outlined"
          style={{ boxSizing: "border-box", borderRadius: "8px" }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Set Fees
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="class-select-label">
                      Select Class
                    </InputLabel>
                    <Select
                      labelId="class-select-label"
                      id="class-select"
                      value={feeData.selectedClass}
                      onChange={handleClassChange}
                      label="Select Class"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {classes.map((cls) => (
                        <MenuItem key={cls._id} value={cls._id}>
                          {cls.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={feeData.description}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    label="Amount"
                    name="amount"
                    value={feeData.amount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="type"
                    value={feeData.type}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    variant="outlined"
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select Type</option>
                    <option value="Annual">Annual</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box mt={4} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        borderRadius: 20,
                        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
                        transform: "translateY(-4px)",
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.25)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Set Fees
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
        {submitted && (
          <Grow in={submitted} timeout={1000}>
            <Box mt={4} display="flex" justifyContent="center">
              <Typography variant="h5">
                Thank you! {feeData.type} Fees for Class have been set.
              </Typography>
            </Box>
          </Grow>
        )}
      </Box>
    </Container>
  );
}

export default FeeForm;
