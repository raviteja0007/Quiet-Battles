import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@quietbattles.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('This portal is restricted to authorized studio administrators.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication rejected. Verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F2EC] flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-[#292929] bg-[#121212] p-8 md:p-12 space-y-8 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border border-[#B49A75]/40 flex items-center justify-center mx-auto text-[#B49A75]">
            <Shield className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-[#B49A75] uppercase block font-semibold">
            SECURE CMS CONSOLE
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-[#F5F2EC]">
            QUIET BATTLES ATELIER
          </h1>
          <p className="text-xs text-[#A5A5A5] leading-relaxed">
            Direct management system for series, narratives, product catalogue, and archival assets.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs tracking-wider text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A5A5A5] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0B0B0B] border border-[#292929] pl-10 pr-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-wider text-[#A5A5A5] uppercase mb-1.5">
              Master Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A5A5A5] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0B0B] border border-[#292929] pl-10 pr-4 py-2.5 text-xs text-[#F5F2EC] focus:border-[#B49A75] focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-[#0B0B0B] border border-[#292929] text-[11px] text-[#A5A5A5] leading-relaxed">
            <span className="text-[#B49A75] font-semibold">Evaluation Credentials:</span>
            <br />
            Email: <code className="text-[#F5F2EC]">admin@quietbattles.com</code>
            <br />
            Pass: <code className="text-[#F5F2EC]">Password123!</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#B49A75] hover:bg-[#F5F2EC] text-[#0B0B0B] text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center space-x-2 transition-colors"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ACCESS CMS CONSOLE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

