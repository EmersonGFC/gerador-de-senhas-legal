
import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-center items-center">
      <div className="flex items-center gap-2 text-white">
        <ShieldCheck className="h-6 w-6 text-blue-400" />
        <h1 className="text-xl font-medium">PasswordGuard</h1>
      </div>
    </header>
  );
};

export default Header;
