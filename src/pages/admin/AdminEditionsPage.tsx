import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Edition } from '../../types';
import { Newspaper, Plus, Edit, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

export const AdminEditionsPage: React.FC = () => {
  const { editions, states, subEditions, addEdition, updateEdition, deleteEdition } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdition, setEditingEdition] = useState<Edition | null>(null);

  const [stateId, setStateId] = useState(states[0]?.id || '');
  const [subEditionId, setSubEditionId] = useState(subEditions[0]?.id || '');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const filteredSubEditions = subEditions.filter(se => se.stateId === stateId);

  const openCreateModal = () => {
    setEditingEdition(null);
    setStateId(states[0]?.id || '');
    setSubEditionId(filteredSubEditions[0]?.id || '');
    setName('');
    setDescription('');
    setStatus('active');
    setIsModalOpen(true);
  };

  const openEditModal = (ed: Edition) => {
    setEditingEdition(ed);
    setStateId(ed.stateId);
    setSubEditionId(ed.subEditionId);
    setName(ed.name);
    setDescription(ed.description);
    setThumbnail(ed.thumbnail);
    setStatus(ed.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stateObj = states.find(s => s.id === stateId);
    const subObj = subEditions.find(se => se.id === subEditionId);

    if (editingEdition) {
      updateEdition(editingEdition.id, {
        stateId,
        subEditionId,
        stateName: stateObj?.name || '',
        subEditionName: subObj?.name || '',
        name,
        description,
        thumbnail,
        status
      });
    } else {
      addEdition({
        stateId,
        subEditionId,
        stateName: stateObj?.name || '',
        subEditionName: subObj?.name || '',
        name,
        description,
        thumbnail,
        status
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black font-serif text-[#0b1d3a]">Edition Management</h1>
          <p className="text-xs text-slate-500">Manage master newspaper editions and publication specs</p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-lg text-xs transition flex items-center gap-2 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Edition</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <th className="p-4">Edition Name</th>
                <th className="p-4">State</th>
                <th className="p-4">Sub Edition</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {editions.map(ed => (
                <tr key={ed.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                    <img src={ed.thumbnail} alt={ed.name} className="w-10 h-10 rounded object-cover border" />
                    <div>
                      <span className="block font-serif text-sm font-extrabold">{ed.name}</span>
                      <span className="text-[10px] text-slate-400">{ed.description}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-blue-700">{ed.stateName}</td>
                  <td className="p-4 font-semibold text-slate-700">{ed.subEditionName}</td>
                  <td className="p-4">
                    <button
                      onClick={() => updateEdition(ed.id, { status: ed.status === 'active' ? 'inactive' : 'active' })}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        ed.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {ed.status === 'active' ? <CheckCircle className="w-3 h-3 text-emerald-600" /> : <XCircle className="w-3 h-3 text-slate-400" />}
                      <span className="uppercase">{ed.status}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(ed)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition"
                      title="Edit Edition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEdition(ed.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                      title="Delete Edition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#0b1d3a]">
                {editingEdition ? 'Edit Edition' : 'Create Edition'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State</label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {states.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sub Edition</label>
                <select
                  value={subEditionId}
                  onChange={(e) => setSubEditionId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {filteredSubEditions.map(se => (
                    <option key={se.id} value={se.id}>{se.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Edition Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad Main Edition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief edition description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#1e40af] hover:bg-[#0b1d3a] text-white rounded-lg shadow-sm"
                >
                  {editingEdition ? 'Save Changes' : 'Create Edition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
