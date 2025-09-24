import React, { useEffect, useState, createContext, useContext } from 'react';
// Mock user data
const mockUsers = [{
  id: 1,
  email: 'admin@farmai.com',
  password: 'admin123',
  name: 'Admin User',
  role: 'admin'
}, {
  id: 2,
  email: 'farmer@farmai.com',
  password: 'farmer123',
  name: 'John Farmer',
  role: 'farmer'
}];
type User = {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'farmer';
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('farmAiUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('farmAiUser');
      }
    }
  }, []);
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const {
        password: _,
        ...userWithoutPassword
      } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('farmAiUser', JSON.stringify(userWithoutPassword));
      // Save user to localStorage for persistence
      saveUserToLocalStorage(userWithoutPassword);
      return true;
    }
    return false;
  };
  // Signup function
  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Check if user already exists
    const userExists = mockUsers.some(u => u.email === email);
    if (userExists) {
      return false;
    }
    // In a real app, this would be an API call
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      name,
      role: 'farmer' as const
    };
    // Add user to mock database
    mockUsers.push(newUser);
    // Remove password before setting user state
    const {
      password: _,
      ...userWithoutPassword
    } = newUser;
    // Set user state and authenticate
    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    // Save user to localStorage for persistence
    saveUserToLocalStorage(userWithoutPassword);
    return true;
  };
  // Helper function to save user to localStorage
  const saveUserToLocalStorage = (user: User) => {
    try {
      localStorage.setItem('farmAiUser', JSON.stringify(user));
      // Also save to a separate users collection for potential admin use
      const allUsers = JSON.parse(localStorage.getItem('farmAiAllUsers') || '[]');
      if (!allUsers.some((u: User) => u.id === user.id)) {
        allUsers.push(user);
        localStorage.setItem('farmAiAllUsers', JSON.stringify(allUsers));
      }
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }
  };
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('farmAiUser');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    signup,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};