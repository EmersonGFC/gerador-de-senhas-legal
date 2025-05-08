
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-4 text-center text-blue-400/60 text-sm">
      <p>© {new Date().getFullYear()} PasswordGuard. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;
