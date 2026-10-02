import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { DEMO_USERS } from '../data/mockUsers';

interface AuthContextType {
  currentUser: User;
  currentRole: Role;
  setRole: (role: Role) => void;
  loginAs: (email: string) => void;
  loginReader: (name: string, emailOrPhone: string, district?: string) => void;
  logout: () => void;
  isSuperAdmin: boolean;
  isEditor: boolean;
  isReporter: boolean;
  isSocialManager: boolean;
  allDemoUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PUBLIC_READER: User = {
  id: 'guest-reader',
  name: 'పాఠకుడు (Reader Guest)',
  email: 'reader@janathavaani.com',
  role: 'Reader',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  status: 'active',
  lastLogin: 'ఇప్పుడే',
  permissions: {
    canView: true,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canApprove: false,
    canPublish: false,
    canManageAds: false,
    canManageEPaper: false,
    canManageUsers: false,
    canViewAnalytics: false,
    canChangeSettings: false,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('jv_current_user_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role && parsed.id) return parsed;
      } catch (e) { /* ignore */ }
    }
    return DEFAULT_PUBLIC_READER; // Clean Public Reader Mode by default
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jv_current_user_v2', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  const setRole = (role: Role) => {
    const found = DEMO_USERS.find(u => u.role === role) || {
      ...currentUser,
      role,
      name: `${role} Demo User`,
      email: `${role.toLowerCase().replace(/\s+/g, '')}@janathavaani.demo`,
    };
    setCurrentUser(found);
  };

  const loginAs = (email: string) => {
    const found = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
    } else {
      // Default to demo reporter or reader
      setCurrentUser({
        ...DEMO_USERS[2],
        email,
        name: email.split('@')[0],
      });
    }
  };
  const loginReader = (name: string, emailOrPhone: string, district = 'Hyderabad') => {
    const readerUser: User = {
      id: `reader-${Date.now()}`,
      name: name.trim() || 'పాఠకుడు (Reader)',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@janathavaani.reader`,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '+91 98480 12345',
      role: 'Reader',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'active',
      lastLogin: 'ఇప్పుడే',
      district,
      permissions: {
        canView: true,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canApprove: false,
        canPublish: false,
        canManageAds: false,
        canManageEPaper: false,
        canManageUsers: false,
        canViewAnalytics: false,
        canChangeSettings: false,
      },
    };
    setCurrentUser(readerUser);
  };

  const logout = () => {
    setCurrentUser({
      id: 'guest-reader',
      name: 'పాఠకుడు (Reader Guest)',
      email: 'reader@janathavaani.com',
      role: 'Reader',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      status: 'active',
      lastLogin: 'ఇప్పుడే',
      permissions: {
        canView: true,
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canApprove: false,
        canPublish: false,
        canManageAds: false,
        canManageEPaper: false,
        canManageUsers: false,
        canViewAnalytics: false,
        canChangeSettings: false,
      },
    });
  };

  const role = currentUser?.role || 'Super Admin';
  const isSuperAdmin = role === 'Super Admin';
  const isEditor = role === 'Editor' || role === 'Editor-in-Chief' || isSuperAdmin;
  const isReporter = role === 'Reporter' || isEditor;
  const isSocialManager = role === 'Social Media Manager' || isSuperAdmin;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: role,
        setRole,
        loginAs,
        loginReader,
        logout,
        isSuperAdmin,
        isEditor,
        isReporter,
        isSocialManager,
        allDemoUsers: DEMO_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
