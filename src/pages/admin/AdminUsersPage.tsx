import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  CheckCircle,
  XCircle,
  Mail,
  Edit,
  Trash2,
  Lock,
  Sparkles,
  X,
} from 'lucide-react';
import { DEMO_USERS } from '../../data/mockUsers';
import { User, Role } from '../../types';

export const AdminUsersPage: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>(DEMO_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<Role>('Reporter');

  const filteredUsers = usersList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const toggleStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      )
    );
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      status: 'active',
      lastLogin: 'ఇప్పుడే',
      permissions: {
        canView: true,
        canCreate: true,
        canEdit: newRole !== 'Reporter',
        canDelete: newRole === 'Super Admin',
        canApprove: newRole === 'Editor' || newRole === 'Super Admin',
        canPublish: newRole === 'Editor' || newRole === 'Super Admin',
        canManageAds: newRole === 'Super Admin',
        canManageEPaper: newRole === 'Super Admin' || newRole === 'Editor',
        canManageUsers: newRole === 'Super Admin',
        canViewAnalytics: true,
        canChangeSettings: newRole === 'Super Admin',
      },
    };

    setUsersList([newUser, ...usersList]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold font-telugu text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-600" />
            వినియోగదారులు & రోల్స్ (Users & Permissions)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            న్యూస్‌రూమ్ బృందం సభ్యులు మరియు వారి యాక్సెస్ అనుమతుల నిర్వహణ
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>క్రొత్త యూజర్‌ను జోడించండి</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="పేరు లేదా ఈమెయిల్‌తో వెతకండి..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500"
          />
        </div>

        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="All">అన్ని రోల్స్ (All Roles)</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Editor">Editor</option>
            <option value="Reporter">Reporter</option>
            <option value="Social Media Manager">Social Media Manager</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">యూజర్ ప్రొఫైల్</th>
                <th className="py-3.5 px-3">ఈమెయిల్</th>
                <th className="py-3.5 px-3">హోదా (Role)</th>
                <th className="py-3.5 px-3">చివరి లాగిన్</th>
                <th className="py-3.5 px-3">స్థితి (Status)</th>
                <th className="py-3.5 px-4 text-right">చర్యలు</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                        <span className="text-[10px] text-slate-400">ID: {u.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-slate-700">{u.email}</td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        u.role === 'Super Admin'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : u.role === 'Editor'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : u.role === 'Reporter'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">{u.lastLogin}</td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                        u.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {u.status === 'active' ? 'యాక్టివ్' : 'సస్పెండ్'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(u.id)}
                        className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-2 py-1 bg-slate-100 rounded-lg"
                      >
                        {u.status === 'active' ? 'బ్లాక్ చేయి' : 'అన్‌బ్లాక్'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold font-telugu text-slate-900">కొత్త టీమ్ సభ్యుడిని జోడించండి</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">పేరు (Full Name)</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ఉదా: రాకేష్ శర్మ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ఈమెయిల్ అడ్రస్</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="rakesh@janathavaani.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">యాక్సెస్ హోదా (Role)</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as Role)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
                >
                  <option value="Super Admin">Super Admin (అన్ని అధికారాలు)</option>
                  <option value="Editor">Editor (వార్తల రివ్యూ & ప్రచురణ)</option>
                  <option value="Reporter">Reporter (వార్తల రచన)</option>
                  <option value="Social Media Manager">Social Media Manager (నోటిఫికేషన్లు & సోషల్)</option>
                </select>
              </div>

              <div className="pt-3 border-t flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
                >
                  రద్దు చేయి
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-red-500"
                >
                  యూజర్‌ను జోడించు
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
