import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await register(name, email, password);
        setLoading(false);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 transition-colors">
            <div className="card-glass w-full max-w-md p-8 rounded-2xl animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-500/20">
                        <Sparkles className="text-emerald-400" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Get Started</h1>
                    <p className="text-slate-400">Create your account instantly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                            <input
                                type="text"
                                className="input-control focus:border-emerald-500 focus:ring-emerald-500/20"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                            <input
                                type="email"
                                className="input-control focus:border-emerald-500 focus:ring-emerald-500/20"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                            <input
                                type="password"
                                className="input-control focus:border-emerald-500 focus:ring-emerald-500/20"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Min 6 characters"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={loading}
                        className="w-full mt-4 !bg-emerald-500 hover:!bg-emerald-600 !shadow-emerald-500/30"
                    >
                        Create Account <ArrowRight size={18} />
                    </Button>
                </form>

                <div className="mt-8 text-center pt-6 border-t border-white/5">
                    <p className="text-slate-400">
                        Already a member? <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
