import React from "react";
import {
  Modal,
  Fade,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "./AdmissionForm.css";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const modalContentStyle = {
  backgroundColor: "#F9F9F9", // Light gray background
  borderRadius: "12px", // Increased border radius for a softer look
  padding: "40px", // Increased padding for better spacing
  maxWidth: "600px",
  width: "80%", // Adjusted width to make it responsive
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added box shadow for depth
};

const AdmissionForm = ({ open, onClose }) => {
  const [formData, setFormData] = React.useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    selectedClass: "",
    fatherPhone: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission or validation here
    onClose();
  };

  const handlePay = () => {
    // Here, you can redirect the user to the Razorpay payment gateway
    // Example: window.location.href = 'YOUR_RAZORPAY_PAYMENT_URL';
    // Make sure to replace 'YOUR_RAZORPAY_PAYMENT_URL' with the actual URL provided by Razorpay
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={modalStyle}
    >
      <Fade in={open}>
        <div className="animated-form" style={modalContentStyle}>
          <Typography
            variant="h5"
            align="center"
            style={{ marginBottom: "20px" }}
          >
            Admission Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="studentName"
              name="studentName"
              label="Student Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
            <TextField
              id="fatherName"
              name="fatherName"
              label="Father's Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.fatherName}
              onChange={handleChange}
              required
            />
            <TextField
              id="motherName"
              name="motherName"
              label="Mother's Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.motherName}
              onChange={handleChange}
              required
            />
            <TextField
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="class-label">Class</InputLabel>
              <Select
                labelId="class-label"
                id="selectedClass"
                name="selectedClass"
                value={formData.selectedClass}
                onChange={handleChange}
                label="Class"
                required
              >
                <MenuItem value="Nursery">Nursery</MenuItem>
                <MenuItem value="LKG">LKG</MenuItem>
                <MenuItem value="UKG">UKG</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                {/* Add more class options */}
              </Select>
            </FormControl>
            <TextField
              id="fatherPhone"
              name="fatherPhone"
              label="Father's Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.fatherPhone}
              onChange={handleChange}
              required
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                label="Gender"
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              Save
            </Button>
          </form>
          <Button
            variant="contained"
            fullWidth
            onClick={handlePay}
            style={{
              marginTop: "20px",
              backgroundColor: "#FF6B00",
              color: "#FFFFFF",
            }}
          >
            Pay Now
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AdmissionForm;

// import React from "react";
// import {
//   Modal,
//   Fade,
//   Typography,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import "./AdmissionForm.css";

// const modalStyle = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor: "rgba(0, 0, 0, 0.5)",
// };

// const modalContentStyle = {
//   backgroundColor: "#F9F9F9", // Light gray background
//   borderRadius: "12px", // Increased border radius for a softer look
//   padding: "40px", // Increased padding for better spacing
//   maxWidth: "800px", // Increased width
//   width: "80%", // Adjusted width to make it responsive
//   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Added box shadow for depth
// };

// const formContainerStyle = {
//   display: "flex",
//   flexDirection: "column", // Display fields vertically
//   gap: "20px", // Add space between fields
// };

// const horizontalContainerStyle = {
//   display: "flex",
//   flexDirection: "row", // Display fields horizontally
//   justifyContent: "space-between", // Add space between fields
// };

// const formFieldStyle = {
//   flex: 1, // Each field takes up equal space
// };

// const AdmissionForm = ({ open, onClose }) => {
//   const [formData, setFormData] = React.useState({
//     studentName: "",
//     fatherName: "",
//     motherName: "",
//     dateOfBirth: "",
//     selectedClass: "",
//     fatherPhone: "",
//     gender: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can perform form submission or validation here
//     onClose();
//   };

//   const handlePay = () => {
//     // Here, you can redirect the user to the Razorpay payment gateway
//     // Example: window.location.href = 'YOUR_RAZORPAY_PAYMENT_URL';
//     // Make sure to replace 'YOUR_RAZORPAY_PAYMENT_URL' with the actual URL provided by Razorpay
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//       sx={modalStyle}
//     >
//       <Fade in={open}>
//         <div className="animated-form" style={modalContentStyle}>
//           <Typography
//             variant="h5"
//             align="center"
//             style={{ marginBottom: "20px" }}
//           >
//             Admission Form
//           </Typography>
//           <form onSubmit={handleSubmit} style={formContainerStyle}>
//             <div style={horizontalContainerStyle}>
//               <TextField
//                 id="studentName"
//                 name="studentName"
//                 label="Student Name"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.studentName}
//                 onChange={handleChange}
//                 required
//                 style={formFieldStyle}
//               />
//               <TextField
//                 id="fatherName"
//                 name="fatherName"
//                 label="Father's Name"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.fatherName}
//                 onChange={handleChange}
//                 required
//                 style={{ ...formFieldStyle, marginLeft: "20px" }}
//               />
//             </div>
//             <div style={horizontalContainerStyle}>
//               <TextField
//                 id="motherName"
//                 name="motherName"
//                 label="Mother's Name"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.motherName}
//                 onChange={handleChange}
//                 required
//                 style={formFieldStyle}
//               />
//               <TextField
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 label="Date of Birth"
//                 type="date"
//                 variant="outlined"
//                 fullWidth
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 required
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//                 style={{ ...formFieldStyle, marginLeft: "20px" }}
//               />
//             </div>
//             <div style={horizontalContainerStyle}>
//               <FormControl variant="outlined" fullWidth>
//                 <InputLabel id="class-label">Class</InputLabel>
//                 <Select
//                   labelId="class-label"
//                   id="selectedClass"
//                   name="selectedClass"
//                   value={formData.selectedClass}
//                   onChange={handleChange}
//                   label="Class"
//                   required
//                   style={formFieldStyle}
//                 >
//                   <MenuItem value="Nursery">Nursery</MenuItem>
//                   <MenuItem value="LKG">LKG</MenuItem>
//                   <MenuItem value="UKG">UKG</MenuItem>
//                   <MenuItem value="1">1</MenuItem>
//                   <MenuItem value="2">2</MenuItem>
//                   {/* Add more class options */}
//                 </Select>
//               </FormControl>
//               <FormControl variant="outlined" fullWidth>
//                 <InputLabel id="gender-label">Gender</InputLabel>
//                 <Select
//                   labelId="gender-label"
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   label="Gender"
//                   required
//                   style={{ ...formFieldStyle, marginLeft: "20px" }}
//                 >
//                   <MenuItem value="male">Male</MenuItem>
//                   <MenuItem value="female">Female</MenuItem>
//                 </Select>
//               </FormControl>
//             </div>
//             <TextField
//               id="fatherPhone"
//               name="fatherPhone"
//               label="Father's Phone Number"
//               variant="outlined"
//               fullWidth
//               value={formData.fatherPhone}
//               onChange={handleChange}
//               required
//               style={{ ...formFieldStyle, marginTop: "20px" }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="primary"
//               fullWidth
//               style={{ marginTop: "20px" }}
//             >
//               Save
//             </Button>
//           </form>
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handlePay}
//             style={{
//               marginTop: "20px",
//               backgroundColor: "#FF6B00",
//               color: "#FFFFFF",
//             }}
//           >
//             Pay Now
//           </Button>
//         </div>
//       </Fade>
//     </Modal>
//   );
// };

// export default AdmissionForm;
