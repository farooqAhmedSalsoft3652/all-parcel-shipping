import { decode, encode } from 'base-64';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [role, setRole] = useState({});

  useEffect(() => {
    let user = localStorage.getItem('_user');
    if (user) {
      setRole(JSON.parse(decode(user)));
    }
  }, []);

  const setRoleData = (newRole) => {
    localStorage.setItem('_user', encode(JSON.stringify({ role: newRole })));
    setRole(newRole);
  };

  const clearRole = () => {
    localStorage.removeItem('_user');
    setRole(null);
  };

  return {
    role,
    setRole: setRoleData,
    clearRole,
  };
}

export default useAuth;