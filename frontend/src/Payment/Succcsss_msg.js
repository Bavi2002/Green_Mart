import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { 
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  CircularProgress,
  Fade,
  Grow,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';

const PaymentConfirmationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = useParams();
  
  const [showCheck, setShowCheck] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(
    location.state?.totalAmount || 11655.00
  );

  useEffect(() => {
    const checkTimer = setTimeout(() => setShowCheck(true), 500);
    const alertTimer = setTimeout(() => setShowAlert(true), 1000);

    return () => {
      clearTimeout(checkTimer);
      clearTimeout(alertTimer);
    };
  }, []);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      if (!paymentId) {
        setError('Payment ID is not provided.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/payment/${paymentId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch total amount');
        }
        const data = await response.json();
        if (data?.payment?.totalAmount != null) {
          setTotalAmount(data.payment.totalAmount);
        } else {
          throw new Error('Total amount not found in response');
        }
      } catch (error) {
        console.error('Error fetching total amount:', error);
        setError('Failed to load total amount. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalAmount();
  }, [paymentId]);

  const handleBackClick = () => {
    navigate('/');
  };

  const formatAmount = (amount) => {
    return amount != null
      ? amount.toLocaleString('en-US', { 
          style: 'currency', 
          currency: 'LKR',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      : 'N/A';
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        bgcolor="#FFF7ED"
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        bgcolor="#FFF7ED"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box bgcolor="#FFF7ED" minHeight="100vh" p={4}>
      <Box display="flex" ml={9} mt={3} alignItems="center" mb={3}>
        <IconButton 
          onClick={handleBackClick}
          sx={{ color: 'green.700', '&:hover': { transform: 'scale(1.1)' } }}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5" color="green.700" fontWeight="500">
          Payment Confirmation
        </Typography>
      </Box>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={3}
          sx={{
            bgcolor: '#BBF7D0',
            mt: 3,
            height: '400px',
            borderRadius: '24px',
            p: 4,
            maxWidth: '400px',
            mx: 'auto'
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
            PAID: {formatAmount(totalAmount)}
          </Typography>
          
          <Box display="flex" justifyContent="center" mb={4}>
            <Grow in={showCheck} timeout={500}>
              <Box
                bgcolor="success.main"
                borderRadius="50%"
                p={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Check style={{ color: 'white', width: 48, height: 48 }} />
              </Box>
            </Grow>
          </Box>
          
          <Fade in={showAlert} timeout={1000}>
            <Alert severity="success" sx={{ mb: 4 }}>
              Your payment has been processed successfully!
            </Alert>
          </Fade>
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleBackClick}
            sx={{
              mt: 4,
              bgcolor: 'white',
              color: 'success.main',
              '&:hover': {
                bgcolor: '#F0FDF4'
              }
            }}
          >
            Return to Home
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default PaymentConfirmationScreen;