import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AdminRegisterSchema } from '../../utils/validationSchemas';
import { register } from '../../api/auth';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import uitcIcon from '../../assets/uitc-icon.png';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register: registerField, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AdminRegisterSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await register(data.full_name, data.phone, data.password, data.confirm_password);
      toast.success('Admin created successfully! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded shadow-md w-96 bg-white"
      >
        <div className="flex justify-center mb-4">
          <img src={uitcIcon} alt="UITC Icon" className="w-16 h-16" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Register</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            {...registerField('full_name')}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone"
            {...registerField('phone')}
            className="w-full p-2 mb-2 border rounded"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...registerField('password')}
              className="w-full p-2 mb-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...registerField('confirm_password')}
              className="w-full p-2 mb-2 border rounded pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}