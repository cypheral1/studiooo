import React from 'react';
import { Settings, Wrench, AlertCircle } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden font-body">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full mx-4 p-8 md:p-12 backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl shadow-2xl text-center">
        <div className="flex justify-center mb-8 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
          <div className="relative w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-inner">
            <Settings className="w-12 h-12 text-blue-400 animate-[spin_4s_linear_infinite]" />
            <Wrench className="w-6 h-6 text-purple-400 absolute bottom-4 right-4" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-purple-100 mb-6 font-serif">
          System Maintenance
        </h1>

        <div className="space-y-4 text-gray-400 text-lg max-w-lg mx-auto">
          <p>
            We are currently upgrading the TrueOriginalShop platform to bring you an even better verification experience.
          </p>
          <div className="flex items-start justify-center gap-2 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-200 mt-6 text-sm text-left">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-orange-400" />
            <p>
              Expected downtime is approximately 2 hours. All verification records and ongoing sessions are safely preserved.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce"></span>
          </div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">
            Check back shortly
          </p>
        </div>
      </div>
    </div>
  );
}
