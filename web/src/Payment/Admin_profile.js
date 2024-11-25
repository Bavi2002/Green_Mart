import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Collapse,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  GetApp,
  Visibility,
  VisibilityOff,
  Search
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import LayoutNew from "../Layout";

// Helper function to generate PDF
const generatePDF = (data, isSingle = false) => {
  const doc = new jsPDF();
  
  if (isSingle) {
    doc.text(`Payment Profile: ${data.firstName} ${data.lastName}`, 20, 20);
    const tableRows = [
      ["Name", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Payment Method", data.paymentMethod],
      ["Discount", data.discount],
      ["Packaging Charges", data.packagingCharge],
      ["Delivery Charge", data.deliveryCharge],
      ["Total Amount", data.totalAmount]
    ];
    doc.autoTable({
      head: [["Field", "Value"]],
      body: tableRows,
      startY: 30,
    });
    doc.save(`payment_profile_${data.firstName}_${data.lastName}.pdf`);
  } else {
    doc.text('Payment Profiles Report', 20, 20);
    const tableRows = data.map((profile, index) => [
      index + 1,
      `${profile.firstName} ${profile.lastName}`,
      profile.email,
      profile.paymentMethod,
      profile.discount,
      profile.packagingCharge,
      profile.deliveryCharge,
      profile.totalAmount
    ]);
    doc.autoTable({
      head: [["No", "Name", "Email", "Payment", "Discount", "Packaging", "Delivery", "Total"]],
      body: tableRows,
      startY: 30,
    });
    doc.save('all_payment_profiles.pdf');
  }
};

// DetailDialog Component
const DetailDialog = ({ open, handleClose, profile }) => {
  if (!profile) return null;
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 2 }}>
          <Typography><strong>Name:</strong> {`${profile.firstName} ${profile.lastName}`}</Typography>
          <Typography><strong>Email:</strong> {profile.email}</Typography>
          <Typography><strong>Payment Method:</strong> {profile.paymentMethod}</Typography>
          <Typography><strong>Discount:</strong> {profile.discount}</Typography>
          <Typography><strong>Packaging:</strong> {profile.packagingCharge}</Typography>
          <Typography><strong>Delivery:</strong> {profile.deliveryCharge}</Typography>
          <Typography><strong>Total:</strong> {profile.totalAmount}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

// PaymentRow Component
const PaymentRow = ({ row, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.paymentMethod}</TableCell>
        <TableCell>{row.discount}</TableCell>
        <TableCell>{row.packagingCharge}</TableCell>
        <TableCell>{row.deliveryCharge}</TableCell>
        <TableCell>{row.totalAmount}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setDialogOpen(true)}
              color="primary"
              title="View Details"
            >
              {dialogOpen ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton
              onClick={() => generatePDF(row, true)}
              color="primary"
              title="Download PDF"
            >
              <GetApp />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">Full Name</TableCell>
                    <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Email</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Payment Method</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DetailDialog 
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        profile={row}
      />
    </>
  );
};


// Main AdminProfile Component
const AdminProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [paymentType, setPaymentType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const paymentTypes = ['All', 'credit-card', 'qr-payment'];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/payments');
        if (!response.ok) throw new Error('Failed to fetch payment profiles');
        const data = await response.json();
        const paymentsArray = Array.isArray(data.payments) ? data.payments : [];
        setProfiles(paymentsArray);
        setFilteredProfiles(paymentsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const filteredResults = profiles.filter(profile => 
      (paymentType === 'All' || profile.paymentMethod === paymentType) &&
      (`${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProfiles(filteredResults);
  }, [paymentType, searchTerm, profiles]);

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <LayoutNew>
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
      <Box maxWidth="lg" mx="auto">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Admin Profile
        </Typography>
        
        <Typography variant="h5" sx={{ mb: 4 }} align="center">
          Monthly / Yearly Report
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Payment Type</InputLabel>
            <Select
              value={paymentType}
              onChange={handlePaymentTypeChange}
              label="Payment Type"
            >
              {paymentTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Search by Name"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              ),
            }}
          />

          <Button
            variant="contained"
            onClick={() => generatePDF(filteredProfiles)}
            startIcon={<GetApp />}
          >
            Download All
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Packaging</TableCell>
                <TableCell>Delivery</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProfiles.map((profile, index) => (
                <PaymentRow
                  key={profile.paymentId || index}
                  row={profile}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      
      
    </Box>
    </LayoutNew>
  );
};

export default AdminProfile;