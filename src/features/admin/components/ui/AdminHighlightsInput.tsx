"use client";

import { useState, KeyboardEvent } from 'react';
import styles from './AdminHighlightsInput.module.css';

interface AdminHighlightsInputProps {
  label: string;
  value: string; // The joined string "Item 1 - Item 2"
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AdminHighlightsInput({ label, value, onChange, placeholder }: AdminHighlightsInputProps) {
  const [inputValue, setInputValue] = useState('');
  
  // Split the string into items, removing empty ones
  const items = value ? value.split(' - ').filter(item => item.trim() !== '') : [];

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !items.includes(trimmed)) {
      const newItems = [...items, trimmed];
      onChange(newItems.join(' - '));
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems.join(' - '));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Pressione Enter para adicionar..."}
        />
        <button 
          type="button" 
          className={styles.addBtn}
          onClick={addItem}
          disabled={!inputValue.trim()}
        >
          Adicionar
        </button>
      </div>

      <div className={styles.tagsContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.tag}>
            <span>{item}</span>
            <button 
              type="button" 
              className={styles.removeTag} 
              onClick={() => removeItem(index)}
            >
              ×
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <span className={styles.emptyText}>Nenhum destaque adicionado.</span>
        )}
      </div>
    </div>
  );
}
