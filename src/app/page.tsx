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
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative" 
      style={{ backgroundImage: "url('/mamba.png')" }}
    >
      <div className="flex flex-col items-center justify-center absolute inset-0 z-10">
        <h1 className="text-9xl font-bold mb-8 text-white text-center">
          Mamba 404 Count
        </h1>
        <h1 className="text-9xl font-bold mb-8 text-white text-center">
            {totalRecords}
        </h1>
        <div className="flex items-center justify-center mb-8">
          <button 
            onClick={incrementCount} 
            className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}