'use client';

import React, { useState } from 'react';
import jaDict from '../locales/ja.json';
import enDict from '../locales/en.json';

type Language = 'ja' | 'en';

const dict = {
  ja: jaDict,
  en: enDict
};

export default function DPSCalculator() {
  const [lang, setLang] = useState<Language>('ja');
  
  const [attack, setAttack] = useState<number>(100);
  const [interval, setInterval] = useState<number>(1.5);
  const [critRate, setCritRate] = useState<number>(10);
  const [critDamage, setCritDamage] = useState<number>(50);
  const [priestBuff, setPriestBuff] = useState<number>(20);
  const [otherMultipliers, setOtherMultipliers] = useState<number>(0);

  const t = dict[lang];

  const calculateDPS = (): string => {
    if (interval <= 0) return "0.00";
    const baseDPS = attack / interval;
    const critChance = Math.min(Math.max(critRate, 0), 100) / 100;
    const critMultiplier = 1 + (critChance * (critDamage / 100));
    const finalDPS = baseDPS * critMultiplier * (1 + priestBuff / 100) * (1 + otherMultipliers / 100);
    return finalDPS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    // レトロな黒背景、太い白枠、角丸なし、ドロップシャドウをソリッドな灰色で表現
    <div className="max-w-xl mx-auto mt-10 p-6 bg-black text-white border-4 border-white rounded-none shadow-[8px_8px_0_0_#4b5563] font-mono select-none">
      
      {/* ヘッダー部分 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b-4 border-white">
        <h1 className="text-xl md:text-2xl font-bold tracking-widest uppercase">
          {t.title}
        </h1>
        
        {/* 言語切り替え（レトロなタブ風） */}
        <div className="flex border-2 border-white mt-4 sm:mt-0">
          <button 
            onClick={() => setLang('ja')}
            className={`px-4 py-1 text-sm font-bold uppercase transition-none ${lang === 'ja' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            JP
          </button>
          <button 
            onClick={() => setLang('en')}
            className={`px-4 py-1 text-sm font-bold uppercase transition-none border-l-2 border-white ${lang === 'en' ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            EN
          </button>
        </div>
      </div>

      {/* 入力エリア */}
      <div className="space-y-6">
        
        <div className="border-2 border-gray-400 p-4 relative mt-4">
          <span className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold text-gray-300">STATUS</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 uppercase text-gray-300">{t.attack}</label>
              <input 
                type="number" value={attack || ''} onChange={(e) => setAttack(Number(e.target.value))}
                className="w-full p-2 bg-black text-white rounded-none border-2 border-white focus:outline-none focus:border-yellow-400 text-right"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase text-gray-300">{t.interval}</label>
              <input 
                type="number" step="0.1" value={interval || ''} onChange={(e) => setInterval(Number(e.target.value))}
                className="w-full p-2 bg-black text-white rounded-none border-2 border-white focus:outline-none focus:border-yellow-400 text-right"
              />
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-400 p-4 relative mt-6">
          <span className="absolute -top-3 left-4 bg-black px-2 text-xs font-bold text-gray-300">SKILLS & BUFFS</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1 uppercase text-gray-300">{t.critRate}</label>
              <input 
                type="number" value={critRate || ''} onChange={(e) => setCritRate(Number(e.target.value))}
                className="w-full p-2 bg-black text-white rounded-none border-2 border-white focus:outline-none focus:border-red-400 text-right"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase text-gray-300">{t.critDamage}</label>
              <input 
                type="number" value={critDamage || ''} onChange={(e) => setCritDamage(Number(e.target.value))}
                className="w-full p-2 bg-black text-white rounded-none border-2 border-white focus:outline-none focus:border-red-400 text-right"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase text-gray-300">{t.priestBuff}</label>
              <input 
                type="number" value={priestBuff || ''} onChange={(e) => setPriestBuff(Number(e.target.value))}
                className="w-full p-2 bg-black text-white rounded-none border-2 border-white focus:outline-none focus:border-blue-400 text-right"
              />
            </div>
            <div>
              <label className="block text-xs mb-1 uppercase text-gray-300">{t.otherMultipliers}</label>
              <input 
                type="number" value={otherMultipliers || ''} onChange={(e) => setOtherMultipliers(Number(e.target.value))}
                className="w-full p-2 bg-black text-white rounded-none border-2 border-white focus:outline-none focus:border-purple-400 text-right"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 結果表示エリア */}
      <div className="mt-8 border-4 border-white p-4 text-center bg-gray-900">
        <p className="text-sm font-bold uppercase text-gray-300 mb-2">► {t.result}</p>
        <p className="text-4xl font-bold text-yellow-400 tracking-wider">
          {calculateDPS()}
        </p>
      </div>
      
    </div>
  );
}