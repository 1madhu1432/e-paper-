import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Save, CheckCircle2, Globe, Sliders } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings, states, editions } = useData();

  const [brandName, setBrandName] = useState(settings.brandName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [defaultState, setDefaultState] = useState(settings.defaultState);
  const [defaultEdition, setDefaultEdition] = useState(settings.defaultEdition);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [contactPhone, setContactPhone] = useState(settings.contactPhone);
  const [address, setAddress] = useState(settings.address);
  const [autoFitWidth, setAutoFitWidth] = useState(settings.readerSettings.autoFitWidth);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      brandName,
      tagline,
      defaultState,
      defaultEdition,
      contactEmail,
      contactPhone,
      address,
      readerSettings: { ...settings.readerSettings, autoFitWidth }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-serif text-[#0b1d3a]">System Settings</h1>
          <p className="text-xs text-slate-500">Configure brand defaults, contact info, and reader settings</p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved to LocalStorage!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Section 1: Branding & Identification */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-serif text-[#0b1d3a] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-500" />
            <span>Branding &amp; Identity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Regional Defaults */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-serif text-[#0b1d3a] border-b border-slate-100 pb-2 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>Regional Defaults</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Default State</label>
              <select
                value={defaultState}
                onChange={(e) => setDefaultState(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              >
                {states.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Default Edition</label>
              <select
                value={defaultEdition}
                onChange={(e) => setDefaultEdition(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              >
                {editions.map(ed => (
                  <option key={ed.id} value={ed.id}>{ed.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Contact Details */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-serif text-[#0b1d3a] border-b border-slate-100 pb-2">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone</label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Head Office Address</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
            />
          </div>
        </div>

        {/* Section 4: Reader Controls */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-serif text-[#0b1d3a] border-b border-slate-100 pb-2">
            Reader Controls
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={autoFitWidth}
                onChange={(e) => setAutoFitWidth(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span>Auto-fit E-Paper reader width by default</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="bg-[#1e40af] hover:bg-[#0b1d3a] text-white font-black px-6 py-2.5 rounded-xl text-xs transition shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE ALL SETTINGS</span>
          </button>
        </div>
      </form>
    </div>
  );
};
