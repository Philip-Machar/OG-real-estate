// File: src/components/feature/AdminRoute.tsx
import { useState, useEffect } from 'react';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Check if the admin is already authenticated in this session
  useEffect(() => {
    const auth = sessionStorage.getItem('Kevlin_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'password123') {
      sessionStorage.setItem('Kevlin_admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  // If authenticated, render the requested admin page
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, render the secure login screen
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background styling to match the site's cinematic vibe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[40rem] h-[40rem] bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] bg-accent-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <i className="ri-lock-password-line text-3xl text-white" />
        </div>
        
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
          Restricted Access
        </h2>
        <p className="text-sm text-white/60 font-light mb-8">
          Please enter the master password to access the command center.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Enter password..."
              className="w-full pl-6 pr-12 py-4 rounded-full border border-white/10 bg-black/40 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all text-center tracking-widest shadow-inner"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={showPassword ? "ri-eye-off-line text-lg" : "ri-eye-line text-lg"} />
            </button>
          </div>
          
          {error && (
            <div className="text-red-400 text-xs font-bold uppercase tracking-widest animate-[fade-in_0.2s_ease-out]">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full px-8 py-4 rounded-full bg-primary-500 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            Unlock Portal
          </button>
        </form>
        
        <a 
          href="/" 
          className="inline-flex items-center gap-2 mt-8 text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold group"
        >
          <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform" />
          Return to Site
        </a>
      </div>
    </div>
  );
}