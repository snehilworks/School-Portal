import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const StudentListContent = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Student List Component</Typography>
      </CardContent>
    </Card>
  );
};

export default StudentListContent;
