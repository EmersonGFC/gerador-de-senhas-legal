
import React, { useState, useEffect } from 'react';
import { Check, Circle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });
  const [strength, setStrength] = useState('média');

  const generatePassword = () => {
    let charset = '';
    let newPassword = '';

    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+{}[]|:;<>,.?/~`';

    if (charset === '') {
      toast.error('Selecione pelo menos uma opção para gerar a senha');
      return;
    }

    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const calculateStrength = () => {
    let score = 0;
    
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    
    if (options.uppercase) score += 1;
    if (options.lowercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 2;

    if (score >= 6) return 'forte';
    if (score >= 4) return 'média';
    return 'fraca';
  };

  const copyToClipboard = () => {
    if (!password) {
      toast.error('Gere uma senha primeiro');
      return;
    }
    
    navigator.clipboard.writeText(password);
    toast.success('Senha copiada para a área de transferência');
  };

  useEffect(() => {
    if (password) {
      setStrength(calculateStrength());
    }
  }, [password, options]);

  useEffect(() => {
    generatePassword();
  }, []);

  const handleOptionChange = (option) => {
    setOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const strengthColors = {
    fraca: 'bg-red-500',
    média: 'bg-yellow-500',
    forte: 'bg-green-500'
  };

  return (
    <Card className="w-full max-w-md bg-blue-950/50 border-blue-900/50 text-white backdrop-blur-sm shadow-lg shadow-blue-900/30">
      <CardHeader className="border-b border-blue-900/50 pb-4">
        <CardTitle className="text-center text-2xl">Gerador de Senhas</CardTitle>
        <CardDescription className="text-center text-blue-200/70">
          Gere instantaneamente uma senha aleatória e segura
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="relative mb-6">
          <div className="bg-blue-900/30 p-4 rounded-md flex items-center justify-between overflow-x-auto">
            <span className="text-xl font-mono tracking-wider">{password}</span>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-2 text-blue-300 hover:text-blue-100 hover:bg-blue-800/50">
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-blue-200 mb-2 block">Comprimento da senha: {length}</label>
          <input 
            type="range" 
            min="4" 
            max="32" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-900/50 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-blue-200 mb-3">Características da senha</h3>
          <div className="grid grid-cols-2 gap-3">
            <div 
              className={`flex items-center gap-2 p-3 rounded-md cursor-pointer ${options.uppercase ? 'bg-blue-800/50' : 'bg-blue-900/20'}`} 
              onClick={() => handleOptionChange('uppercase')}
            >
              {options.uppercase ? <Check className="h-4 w-4 text-blue-400" /> : <Circle className="h-4 w-4 text-blue-600" />}
              <span>Letras maiúsculas</span>
            </div>
            <div 
              className={`flex items-center gap-2 p-3 rounded-md cursor-pointer ${options.lowercase ? 'bg-blue-800/50' : 'bg-blue-900/20'}`} 
              onClick={() => handleOptionChange('lowercase')}
            >
              {options.lowercase ? <Check className="h-4 w-4 text-blue-400" /> : <Circle className="h-4 w-4 text-blue-600" />}
              <span>Letras minúsculas</span>
            </div>
            <div 
              className={`flex items-center gap-2 p-3 rounded-md cursor-pointer ${options.numbers ? 'bg-blue-800/50' : 'bg-blue-900/20'}`} 
              onClick={() => handleOptionChange('numbers')}
            >
              {options.numbers ? <Check className="h-4 w-4 text-blue-400" /> : <Circle className="h-4 w-4 text-blue-600" />}
              <span>Números</span>
            </div>
            <div 
              className={`flex items-center gap-2 p-3 rounded-md cursor-pointer ${options.symbols ? 'bg-blue-800/50' : 'bg-blue-900/20'}`} 
              onClick={() => handleOptionChange('symbols')}
            >
              {options.symbols ? <Check className="h-4 w-4 text-blue-400" /> : <Circle className="h-4 w-4 text-blue-600" />}
              <span>Símbolos</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm text-blue-200 mb-3">Força da senha</h3>
          <div className="relative h-8 bg-blue-900/30 rounded-md overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full transition-all duration-500 ${strengthColors[strength]}`} 
              style={{ 
                width: strength === 'fraca' ? '33%' : strength === 'média' ? '66%' : '100%' 
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <span className="text-white text-sm opacity-70">Fraca</span>
              <span className="text-white text-sm opacity-70">Média</span>
              <span className="text-white text-sm opacity-70">Forte</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 transition-all"
          onClick={generatePassword}
        >
          Gerar Nova Senha
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;
