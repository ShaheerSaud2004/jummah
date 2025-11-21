// Admin authentication and password management
const ADMIN_PASSWORD_KEY = 'jummah_admin_password';
const ADMIN_SESSION_KEY = 'jummah_admin_session';
const DEFAULT_PASSWORD = 'jummah2025'; // Change this to your desired password

// Set initial password if not set
export const initializeAdminPassword = () => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  
  if (!localStorage.getItem(ADMIN_PASSWORD_KEY)) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, DEFAULT_PASSWORD);
  }
};

// Check if user is authenticated
export const isAdminAuthenticated = () => {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  
  const session = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!session) return false;
  
  try {
    const sessionData = JSON.parse(session);
    // Check if session is still valid (24 hours)
    const now = new Date().getTime();
    if (now - sessionData.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// Authenticate with password
export const authenticateAdmin = (password) => {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  
  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  
  if (password === storedPassword) {
    const sessionData = {
      timestamp: new Date().getTime(),
      authenticated: true
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
    return true;
  }
  return false;
};

// Logout admin
export const logoutAdmin = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
};

// Change admin password
export const changeAdminPassword = (oldPassword, newPassword) => {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  
  const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  
  if (oldPassword === storedPassword && newPassword && newPassword.length >= 6) {
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
    return true;
  }
  return false;
};

// Initialize on import
initializeAdminPassword();

