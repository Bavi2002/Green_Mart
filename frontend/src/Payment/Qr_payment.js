import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const QRPaymentScreen = () => {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  
  const [totalAmount, setTotalAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/payment/${paymentId}`);
        const data = await response.json();
        if (data?.payment?.totalAmount != null) {
          setTotalAmount(data.payment.totalAmount);
          // Generate QR code URL (replace with actual API call)
          setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAY_${paymentId}_${data.payment.totalAmount}`);
        }
      } catch (error) {
        console.error('Error fetching total amount:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTotalAmount();
  }, [paymentId]);

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setTimeout(() => {
      navigate(`/confirmation/${paymentId}`);
    }, 2000);
  };

  const formatAmount = (amount) => {
    if (amount == null) return '';
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  return (
    <div className="bg-orange-50 min-h-screen p-4">
      <div className="flex items-center ml-9 mt-3">
        <button
          onClick={() => navigate('/make-payment')}
          className="text-green-700 hover:text-green-800 p-2 rounded-full hover:bg-green-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-green-700 text-xl font-medium ml-2">QR Code Payment</h1>
      </div>

      <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-600 text-white text-center p-4">
          <h2 className="text-2xl font-bold">Green Mart</h2>
          {isLoading ? (
            <div className="animate-pulse h-8 bg-green-500 rounded mt-2"></div>
          ) : (
            <p className="text-3xl font-bold mt-2">{formatAmount(totalAmount)}</p>
          )}
        </div>
        <div className="p-6">
          {isSuccess && (
            <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
              <p className="font-bold">Payment Successful!</p>
              <p>Redirecting to confirmation page...</p>
            </div>
          )}

          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-sm mb-2">SCAN ME</p>
            <div className="bg-white p-2 w-48 h-48 mx-auto">
              {isLoading ? (
                <div className="animate-pulse w-full h-full bg-gray-200"></div>
              ) : (
                <img src={qrCodeUrl} alt="QR Code" className="w-full h-full" />
              )}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <button
              className={`w-full py-2 px-4 rounded ${
                isProcessing || isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
              onClick={handlePaymentSuccess}
              disabled={isProcessing || isLoading}
            >
              {isProcessing ? 'Processing...' : 'Confirm Payment'}
            </button>
            <button
              className="w-full py-2 px-4 rounded border border-gray-300 hover:bg-gray-100"
              onClick={() => navigate('/make-payment')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRPaymentScreen;