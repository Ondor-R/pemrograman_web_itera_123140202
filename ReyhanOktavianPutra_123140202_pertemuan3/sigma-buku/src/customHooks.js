import { useState, useEffect, useMemo } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Gagal membaca dari localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Gagal menyimpan ke localStorage", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export const useBookStats = (books) => {
  const stats = useMemo(() => {
    const total = books.length;
    const reading = books.filter(b => b.status === 'baca').length;
    const toBuy = books.filter(b => b.status === 'beli').length;
    return { total, reading, toBuy };
  }, [books]);
  
  return stats;
};