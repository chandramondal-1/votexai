import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, User, Mail, Lock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'VOTER'
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Register user in Spring Boot backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const res = await axios.post(`${backendUrl}/api/auth/signup`, formData);
      
      // 2. Register face in AI service
      if (image) {
        const aiUrl = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:5001';
        await axios.post(`${aiUrl}/register-face`, {
          user_id: formData.username,
          image: image
        });
      }

      setSuccess(true);
      setStep(3);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08060d] text-white flex items-center justify-center pt-20 px-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400">Join the secure AI-powered voting platform</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-primary text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              {s < 3 && <div className={`w-16 h-1 mx-2 rounded ${step > s ? 'bg-primary' : 'bg-white/10'}`}></div>}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={(e) => { e.preventDefault(); setStep(2); }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text" name="username" required value={formData.username} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                      placeholder="johndoe123"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="email" name="email" required value={formData.email} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input 
                    type="password" name="password" required value={formData.password} onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-primary transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary rounded-xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Continue to Face Capture <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" />
                ) : (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  {image ? (
                    <button 
                      onClick={() => setImage(null)}
                      className="px-6 py-2 bg-red-500 rounded-full font-bold shadow-lg"
                    >
                      Retake Photo
                    </button>
                  ) : (
                    <button 
                      onClick={capture}
                      className="p-4 bg-primary rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex gap-3 text-sm text-blue-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>Please ensure your face is clearly visible and well-lit. This image will be used to verify your identity during voting.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 text-sm text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-bold"
                >
                  Back
                </button>
                <button 
                  onClick={handleRegister}
                  disabled={!image || loading}
                  className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 ${
                    !image || loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-primary'
                  }`}
                >
                  {loading ? 'Processing...' : 'Complete Registration'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold">Registration Successful!</h3>
              <p className="text-gray-400">Your account has been created and your face identity is secured.</p>
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-12 py-4 bg-primary rounded-xl font-bold inline-block"
              >
                Proceed to Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Register;
