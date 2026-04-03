import React, { useState } from "react";
import { useStore } from "../../store/useStore";
import { User, Mail, Save, CheckCircle2 } from "lucide-react";

export default function SettingsView() {
  const { user, updateUser } = useStore();
  const [formData, setFormData] = useState({ name: user.name, email: user.email });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="mb-8 pl-1">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-gradient">
          Settings
        </h2>
        <p className="mt-2 text-slate-400">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="glass-card w-full text-slate-300">
        <div className="p-6 border-b border-slate-800/60">
          <h3 className="text-xl font-semibold text-white">Profile Information</h3>
          <p className="text-sm text-slate-400 mt-1">Update your account's profile information and email address.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Display Name</label>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 transition-all focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
              <User className="h-5 w-5 text-slate-500 shrink-0" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-600 py-2.5"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 rounded-lg px-4 transition-all focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
              <Mail className="h-5 w-5 text-slate-500 shrink-0" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-600 py-2.5"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-primary-500/20 active:scale-95 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
            
            {isSaved && (
              <span className="text-emerald-400 text-sm font-medium flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2">
                <CheckCircle2 className="h-4 w-4" />
                Profile updated!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
