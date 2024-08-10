'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { TOKEN_LIST } from '@/config';
import TokenItem from '@/components/swap/TokenItem';

export default function TokenSelect() {
  const [showMenu, setShowMenu] = useState(false);
  const newRef = useRef<HTMLDivElement>(null); // Typing the ref correctly

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | Event) => {
      if (newRef.current && !newRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []); // Ensure the effect has an empty dependency array to prevent it from running on every render

  const toggleSelect = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="relative w-[110px] h-12" ref={newRef}>
      <button
        className="flex justify-between h-full items-center gap-2 border border-black text-white bg-green-950 py-1 px-3 hover:shadow-2xl shadow-blue-400"
        onClick={toggleSelect}
      >
        Select Token
        <ChevronDown className="mt-1" size={15} />
      </button>
      {showMenu && (
        <div className="absolute w-[110px] top-[110%] left-0 h-[200px] bg-primary-gray-200/30 shadow shadow-blue-400 backdrop-blur rounded p-1 z-50 overflow-auto">
          {TOKEN_LIST.map((item, index) => (
            <TokenItem key={index} token={item} />
          ))}
        </div>
      )}
    </div>
  );
}
