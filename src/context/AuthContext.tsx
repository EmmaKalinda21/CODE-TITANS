import React, { useEffect, useState, createContext, useContext } from 'react';
import { mockUsers } from '../utils/mockData';
interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  location?: string;
  farmName?: string;
  type: 'admin' | 'user';
}
interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & {
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  users: User[];
  deleteUser: (userId: string) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwords, setPasswords] = useState<Record<string, string>>({
    'emmaderek80@gmail.com': 'Emma123'
  });
  useEffect(() => {
    // Initialize with mock data
    setUsers(mockUsers);
    // Check for stored auth data
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    // Load saved users from localStorage if available
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with mock data and save to localStorage
      localStorage.setItem('users', JSON.stringify(mockUsers));
    }
    // Load saved passwords from localStorage if available
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    } else {
      // Initialize with admin password and save to localStorage
      localStorage.setItem('passwords', JSON.stringify({
        'emmaderek80@gmail.com': 'Emma123'
      }));
    }
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if email exists in passwords
    if (passwords[email] === password) {
      const user = users.find(u => u.email === email);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  };
  const signup = async (userData: Omit<User, 'id'> & {
    password: string;
  }): Promise<boolean> => {
    const {
      password,
      ...userWithoutPassword
    } = userData;
    // Check if email already exists
    if (users.some(u => u.email === userData.email)) {
      return false;
    }
    const newUser = {
      ...userWithoutPassword,
      id: Date.now().toString()
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // Save password
    const updatedPasswords = {
      ...passwords,
      [userData.email]: password
    };
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    return true;
  };
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };
  const updateUser = (userData: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      ...userData
    };
    setCurrentUser(updatedUser);
    // Update in users array
    const updatedUsers = users.map(user => user.id === currentUser.id ? updatedUser : user);
    setUsers(updatedUsers);
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    if (!currentUser) return false;
    // Verify old password
    if (passwords[currentUser.email] !== oldPassword) {
      return false;
    }
    // Update password
    const updatedPasswords = {
      ...passwords,
      [currentUser.email]: newPassword
    };
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    return true;
  };
  const deleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    if (!userToDelete) return;
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // Remove password
    const {
      [userToDelete.email]: _,
      ...updatedPasswords
    } = passwords;
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  };
  return <AuthContext.Provider value={{
    currentUser,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
    updatePassword,
    users,
    deleteUser
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};