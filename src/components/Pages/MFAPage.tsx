// MFAPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyMFA } from '../../redux/authActions';
import { useNavigate } from 'react-router-dom';
import Footer from "../UI/Footer/Footer"
import { Button, TextField } from '@mui/material';

const MFAPage: React.FC = () => {
  const dispatch = useDispatch();
  const qrCodeData = useSelector((state) => state.auth.qrCodeData);
  const email = useSelector((state) => state.auth.email) || {};
  const navigate = useNavigate();
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');



  const handleMFAVerification = async (e) => {
    e.preventDefault();
    const mfaVerificationResult = await dispatch(verifyMFA(mfaCode, email));

    if (mfaVerificationResult && mfaVerificationResult.success) {
      console.log('MFA verification successful');
      navigate('/');
    } else {
      setError('MFA verification failed. Please try again.');
    }
  };

  return (
    <>
      <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div id="content">
          <div className=" mt-5">
            <div className="row justify-content-center">
              <div className="col-md-4">
              <div className="card" style={{ width: '400px', margin: 'auto' }}>
                  <div className="card-body txt">
                    <h2 className="text-center mb-4">MFA Verification</h2>
                    <div className="d-flex justify-content-center mb-3">
                      {qrCodeData && (
                        <img src={qrCodeData} alt="QR Code" />
                      )}
                    </div>

                    <form onSubmit={handleMFAVerification}>
                      <div className="mb-3">
                        <label htmlFor="mfaCode" className="form-label">Enter MFA Code:</label>
                        <TextField
                          type="text"
                          id="mfaCode"
                          value={mfaCode}
                          onChange={(e) => setMfaCode(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <Button type="submit" variant="contained" color="primary" size="medium">
                        Verify MFA
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MFAPage;