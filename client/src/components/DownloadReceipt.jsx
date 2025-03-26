import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

const loadImageAsDataUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const downloadReceipt = async (paymentDetails, paymentId) => {
  // Initialize PDF with professional settings
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Professional color scheme
  const brandColor = [41, 128, 185]; // Professional blue
  const darkGray = [52, 73, 94]; // Dark gray for text
  const lightGray = [236, 240, 241]; // Light gray for backgrounds
  const successGreen = [46, 204, 113]; // Success indicator
  const borderColor = [189, 195, 199]; // Subtle borders

  // ------------- Background -------------
  doc.setFillColor(...lightGray);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // ------------- Diagonal Text Watermark -------------
  doc.setFillColor(245, 245, 245);
  doc.setTextColor(220, 220, 220);
  doc.setFontSize(100);
  doc.setFont("helvetica", "bold");
  doc.text("PAID", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 45,
  });

  // ------------- Left Header Section -------------
  try {
    const logoDataUrl = await loadImageAsDataUrl("/education.png");
    doc.addImage(logoDataUrl, "PNG", margin, 15, 25, 25);
  } catch (error) {
    console.error("Error loading logo:", error);
  }

  // Company Information - Adjusted positioning
  doc.setFontSize(22);
  doc.setTextColor(...brandColor);
  doc.setFont("helvetica", "bold");
  doc.text("Shivam Public School", margin + 30, 25);

  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  doc.setFont("helvetica", "normal");
  const addressLines = [
    "123 Education Lane, Aarni",
    "Uttar Pradesh, India - 123456",
    "Tel: +91 1234567890",
    "GST: 29ABCDE1234F1Z5",
  ];
  addressLines.forEach((line, idx) => {
    doc.text(line, margin + 30, 32 + idx * 5);
  });

  // Receipt Details Box - Adjusted positioning
  const receiptBoxY = 15;
  const receiptBoxX = pageWidth - margin - 65;
  doc.setDrawColor(...borderColor);
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(receiptBoxX, receiptBoxY, 70, 45, 3, 3, "FD");

  doc.setFontSize(16);
  doc.setTextColor(...brandColor);
  doc.setFont("helvetica", "bold");
  doc.text("RECEIPT", receiptBoxX + 5, receiptBoxY + 10);

  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  doc.setFont("helvetica", "normal");
  const receiptDetails = [
    ["Receipt No:", `#${paymentId.slice(-8).toUpperCase()}`],
    ["Date:", format(new Date(), "dd/MM/yyyy")],
    ["Time:", format(new Date(), "HH:mm:ss")],
  ];
  receiptDetails.forEach(([label, value], idx) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, receiptBoxX + 5, receiptBoxY + 20 + idx * 7);
    doc.setFont("helvetica", "normal");
    doc.text(value, receiptBoxX + 30, receiptBoxY + 20 + idx * 7);
  });

  // ------------- Bill To Section - Adjusted size and padding -------------
  const billToY = 75;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(margin, billToY, pageWidth - 2 * margin, 40, 3, 3, "FD");

  doc.setFontSize(12);
  doc.setTextColor(...brandColor);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", margin + 5, billToY + 10);

  doc.setFontSize(10);
  doc.setTextColor(...darkGray);
  doc.setFont("helvetica", "normal");
  const customerDetails = [
    paymentDetails.customerName || "Student Name",
    paymentDetails.studentId || "Student ID: ABC123",
    paymentDetails.class || "Class: X-A",
    paymentDetails.email || "email@example.com",
  ];
  customerDetails.forEach((detail, idx) => {
    doc.text(detail, margin + 5, billToY + 20 + idx * 5);
  });

  // ------------- Payment Details Table - Adjusted positioning -------------
  const tableY = billToY + 50;
  const tableData = [
    [
      {
        content: "Description",
        styles: { fontStyle: "bold" },
      },
      {
        content: "Payment Method",
        styles: { fontStyle: "bold" },
      },
      {
        content: "Transaction ID",
        styles: { fontStyle: "bold" },
      },
      {
        content: "Amount",
        styles: { fontStyle: "bold" },
      },
    ],
    [
      paymentDetails.description || "School Fee Payment",
      paymentDetails.method,
      paymentId,
      `Rs. ${paymentDetails.amount}`,
    ],
  ];

  autoTable(doc, {
    startY: tableY,
    head: tableData.slice(0, 1),
    body: tableData.slice(1),
    theme: "grid",
    styles: {
      fontSize: 10,
      cellPadding: 8,
      textColor: [...darkGray],
      lineColor: [...borderColor],
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [...lightGray],
      textColor: [...darkGray],
      fontStyle: "bold",
    },
    margin: { left: margin, right: margin },
  });

  // ------------- Total Amount Section - Adjusted positioning -------------
  const tableHeight = 30; // Approximate height of the table
  const totalY = tableY + tableHeight + 20;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(pageWidth - margin - 70, totalY, 70, 30, 3, 3, "FD");

  doc.setFontSize(12);
  doc.setTextColor(...darkGray);
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", pageWidth - margin - 65, totalY + 12);

  doc.setFontSize(14);
  doc.setTextColor(...brandColor);
  doc.text(
    `Rs. ${paymentDetails.amount}`,
    pageWidth - margin - 65,
    totalY + 25
  );

  // ------------- Payment Status -------------
  const statusY = totalY + 45;
  doc.setFontSize(14);
  doc.setTextColor(...successGreen);
  doc.setFont("helvetica", "bold");
  doc.text("✓ Payment Successful", margin, statusY);

  // ------------- Notes Section -------------
  const notesY = statusY + 15;
  doc.setFontSize(9);
  doc.setTextColor(...darkGray);
  doc.setFont("helvetica", "normal");
  const notes = [
    "• This is an electronically generated receipt and does not require physical signature.",
    "• Please retain this receipt for your records.",
    "• For any queries, please contact our accounts department.",
    "• All payments are non-refundable unless stated otherwise in the school policy.",
  ];
  notes.forEach((note, idx) => {
    doc.text(note, margin, notesY + idx * 5);
  });

  // ------------- Footer -------------
  const footerY = pageHeight - 20;
  doc.setFillColor(...lightGray);
  doc.rect(0, footerY - 10, pageWidth, 30, "F");

  doc.setFontSize(8);
  doc.setTextColor(...darkGray);
  doc.text(
    "Shivam Public School | www.shivampublic.edu.in | Email: info@shivampublic.edu.in",
    pageWidth / 2,
    footerY,
    { align: "center" }
  );
  doc.text(
    `Generated on: ${format(new Date(), "PPP")} at ${format(new Date(), "pp")}`,
    pageWidth / 2,
    footerY + 5,
    { align: "center" }
  );

  const fileName = `SPS_Receipt_${paymentId.slice(-6)}.pdf`;
  doc.save(fileName);
  return fileName;
};

export default downloadReceipt;
