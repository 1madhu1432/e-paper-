import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSizeOption = 'small' | 'medium' | 'large';

interface UserPreferencesContextType {
  fontSize: FontSizeOption;
  setFontSize: (size: FontSizeOption) => void;
  preferredDistrict: string;
  setPreferredDistrict: (district: string) => void;
  subscribedCategories: string[];
  toggleCategorySubscription: (catId: string) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (val: boolean) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    return (localStorage.getItem('jv_font_size') as FontSizeOption) || 'medium';
  });

  const [preferredDistrict, setPreferredDistrict] = useState<string>(() => {
    return localStorage.getItem('jv_pref_district') || 'Hyderabad';
  });

  const [subscribedCategories, setSubscribedCategories] = useState<string[]>(() => {
    try {
      const data = localStorage.getItem('jv_sub_categories');
      return data ? JSON.parse(data) : ['telangana', 'andhra-pradesh', 'hyderabad', 'politics', 'jobs'];
    } catch {
      return ['telangana', 'andhra-pradesh', 'hyderabad', 'politics', 'jobs'];
    }
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('jv_notifs_enabled') !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('jv_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('jv_pref_district', preferredDistrict);
  }, [preferredDistrict]);

  useEffect(() => {
    localStorage.setItem('jv_sub_categories', JSON.stringify(subscribedCategories));
  }, [subscribedCategories]);

  useEffect(() => {
    localStorage.setItem('jv_notifs_enabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  const toggleCategorySubscription = (catId: string) => {
    setSubscribedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
  };

  return (
    <UserPreferencesContext.Provider
      value={{
        fontSize,
        setFontSize,
        preferredDistrict,
        setPreferredDistrict,
        subscribedCategories,
        toggleCategorySubscription,
        notificationsEnabled,
        setNotificationsEnabled,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within UserPreferencesProvider');
  }
  return context;
};
