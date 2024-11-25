import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, QrCode } from 'lucide-react';
import { 
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import { motion } from 'framer-motion';
import visaImage from '../Components/assets/visa.png'; // Adjust the path as necessary
import masterimage from '../Components/assets/master.png';
const MakePayment = () => {
  const { paymentId } = useParams();
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleBackClick = () => {
    navigate('/');
  };

  const handlePaymentClick = async (method) => {
    try {
      const response = await fetch(`http://localhost:3000/api/payment/${paymentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod: method }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payment method');
      }

      if (method === 'credit-card') {
        navigate(`/credit-card/${paymentId}`, { state: { totalAmount } });
      } else if (method === 'qr-payment') {
        navigate(`/qr-payment/${paymentId}`, { state: { totalAmount } });
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      setError('Failed to update payment method. Please try again.');
    }
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
      <Box display="flex" ml={9} alignItems="center" mt={3} mb={3}>
        <IconButton 
          onClick={handleBackClick}
          sx={{ 
            color: 'green.700',
            '&:hover': { transform: 'scale(1.1)' },
            transition: 'transform 0.2s'
          }}
        >
          <ArrowLeft />
        </IconButton>
        <Typography variant="h5" color="green.700" fontWeight="500">
          Make Payment
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
            p: 6,
            maxWidth: '600px',
            mx: 'auto',
            borderRadius: '16px'
          }}
        >
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
            Total Amount: {formatAmount(totalAmount)}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center" 
            mb={6}
          >
            Please select the preferred payment method to use on this order.
          </Typography>

          <Stack spacing={4}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                onClick={() => handlePaymentClick('credit-card')}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.50' },
                  transition: 'background-color 0.3s'
                }}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 3
                }}>
                  <Box display="flex" alignItems="center">
                    <CreditCard size={24} style={{ marginRight: '12px' }} />
                    <Typography>Credit card payment</Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                  <img src={visaImage} alt="Visa" style={{ height: '20px' }} />

                    <img src={masterimage} alt="Mastercard" style={{ height: '20px' }} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                onClick={() => handlePaymentClick('qr-payment')}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'grey.50' },
                  transition: 'background-color 0.3s'
                }}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 3
                }}>
                  <Box display="flex" alignItems="center">
                    <QrCode size={24} style={{ marginRight: '12px' }} />
                    <Typography>QR code payment</Typography>
                  </Box>
                  <Typography fontSize="24px">⧉</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Stack>

          <Box mt={6}>
            <Button
              variant="contained"
              onClick={handleBackClick}
              sx={{
                bgcolor: 'white',
                color: 'text.primary',
                '&:hover': { bgcolor: 'grey.100' },
                width: '160px'
              }}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default MakePayment;