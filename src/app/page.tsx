'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/count');
        const data = await res.json();
        setTotalRecords(data?.totalRecords ?? 0);
      } catch (error) {
        console.error('Failed to fetch count:', error);
      }
    };

    fetchCount();
  }, []);

  const incrementCount = async () => {
    try {
      const res = await fetch('/api/count', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error('Failed to update count');
      }

      // Update total records after adding new count
      const fetchCount = async () => {
        try {
          const res = await fetch('/api/count');
          const data = await res.json();
          setTotalRecords(data?.totalRecords ?? 0);
        } catch (error) {
          console.error('Failed to fetch count:', error);
        }
      };

      fetchCount();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: "url('/mamba.png')" }}
    >
      <h1 className="text-4xl font-bold mb-4 text-white">Mamba 404 Count</h1>
      <div className="flex items-center space-x-4">
        <button 
          onClick={incrementCount} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
      </div>
      <p className="text-white mt-4">Total records: {totalRecords}</p>
    </div>
  );
}