// MFAPage.js
import React, { useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { verifyMFA } from '../../redux/auth';
import { useNavigate } from 'react-router-dom';

function MFAPage() {
  const dispatch = useDispatch();
  const qrCodeData = useSelector((state) => state.auth.qrCodeData);
  const email = useSelector((state) => state.auth.email) || {};
  const navigate = useNavigate();
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState('');
  


  const handleMFAVerification = async (e) => {
    e.preventDefault();
    const mfaVerificationResult = await dispatch(verifyMFA(mfaCode,email));

    if (mfaVerificationResult && mfaVerificationResult.success) {
      console.log('MFA verification successful');
      navigate('/');
    } else {
      setError('MFA verification failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h2 className="text-center mb-4">MFA Verification</h2>
              {qrCodeData  && (
                <img src={qrCodeData} alt="QR Code" />
              )}

              <form onSubmit={handleMFAVerification}>
                <label htmlFor="mfaCode">Enter MFA Code:</label>
                <input
                  type="text"
                  id="mfaCode"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                />
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">
                  Verify MFA
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MFAPage;
