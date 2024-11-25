import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  InputAdornment
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CreditCardPaymentForm = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cardHolderName: '',
    securityCode: ''
  });
  const [totalAmount, setTotalAmount] = useState(null);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatAmount = (amount) => {
    if (amount == null) return '';
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/payment/${paymentId}`);
        const data = await response.json();
        if (data?.payment?.totalAmount != null) {
          setTotalAmount(data.payment.totalAmount);
        }
      } catch (error) {
        console.error('Error fetching total amount:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalAmount();
  }, [paymentId]);

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    const monthNum = parseInt(formData.expiryMonth);
    if (!/^\d{2}$/.test(formData.expiryMonth) || monthNum < 1 || monthNum > 12) {
      newErrors.expiryMonth = 'Enter a valid month (01-12)';
    }

    const yearNum = parseInt(formData.expiryYear);
    if (!/^\d{2}$/.test(formData.expiryYear) || yearNum < currentYear) {
      newErrors.expiryYear = 'Enter a valid year';
    } else if (yearNum === currentYear && monthNum < currentMonth) {
      newErrors.expiryMonth = 'Card has expired';
    }

    if (!formData.cardHolderName.trim() || formData.cardHolderName.length < 3) {
      newErrors.cardHolderName = 'Enter a valid cardholder name';
    }

    if (!/^\d{3}$/.test(formData.securityCode)) {
      newErrors.securityCode = 'Security code must be 3 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    let value = event.target.value;
    
    if (field === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate(`/confirmation/${paymentId}`);
      }, 2000);
    }
  };

  return (
    <Box sx={{ bgcolor: '#FFF7ED', minHeight: '100vh', p: 4 }}>
      <Box display="flex" alignItems="center" ml={{ xs: 2, md: 9 }} mt={3}>
        <IconButton 
          onClick={() => navigate('/make-payment/:paymentId')}
          sx={{ 
            color: 'success.main',
            '&:hover': { transform: 'scale(1.1)' },
            transition: 'transform 0.2s'
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5" color="success.main" fontWeight={500}>
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
            maxWidth: 480,
            mx: 'auto',
            mt: 4,
            borderRadius: 4,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              bgcolor: 'success.main',
              color: 'white',
              p: 3,
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={1}>
              Green Mart
            </Typography>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="inherit" size={24} />
              </Box>
            ) : (
              <Typography variant="h4" fontWeight="bold">
                {formatAmount(totalAmount)}
              </Typography>
            )}
          </Box>

          <Box p={4}>
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert 
                    severity="success" 
                    sx={{ mb: 3 }}
                  >
                    Payment Successful! Redirecting to confirmation page...
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange('cardNumber')}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  inputProps={{ maxLength: 19 }}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Month"
                  value={formData.expiryMonth}
                  onChange={handleInputChange('expiryMonth')}
                  error={!!errors.expiryMonth}
                  helperText={errors.expiryMonth}
                  placeholder="MM"
                  inputProps={{ maxLength: 2 }}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Year"
                  value={formData.expiryYear}
                  onChange={handleInputChange('expiryYear')}
                  error={!!errors.expiryYear}
                  helperText={errors.expiryYear}
                  placeholder="YY"
                  inputProps={{ maxLength: 2 }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  value={formData.cardHolderName}
                  onChange={handleInputChange('cardHolderName')}
                  error={!!errors.cardHolderName}
                  helperText={errors.cardHolderName}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Security Code"
                  value={formData.securityCode}
                  onChange={handleInputChange('securityCode')}
                  error={!!errors.securityCode}
                  helperText={errors.securityCode}
                  inputProps={{ maxLength: 3 }}
                  placeholder="CVV"
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.secondary' }}>
                          CVV
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={isProcessing || isLoading}
                  sx={{ 
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem'
                  }}
                >
                  {isProcessing ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={20} color="inherit" />
                      <span>Processing...</span>
                    </Box>
                  ) : (
                    'Submit Payment'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default CreditCardPaymentForm;