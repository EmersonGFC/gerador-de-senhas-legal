
import { useState, useEffect } from 'react';
import PasswordGenerator from '../components/PasswordGenerator';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <PasswordGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
