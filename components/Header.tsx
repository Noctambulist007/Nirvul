
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-rose-800">
            নিরভুল (Nirvul)
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            আপনার বাংলা লেখার AI সহযোগী
          </p>
        </div>
      </div>
    </header>
  );
};
