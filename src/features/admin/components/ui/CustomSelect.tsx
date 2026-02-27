"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export function CustomSelect({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Selecione...", 
  error, 
  className,
  disabled,
  required,
  name
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (disabled) return;
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.wrapper} ${className || ''}`} ref={containerRef}>
      {label && (
        <label className={styles.label}>
          {label} {required && <span style={{ color: 'var(--color-primary, #E31E24)' }}>*</span>}
        </label>
      )}
      
      {/* Hidden input for native form validation */}
      <input 
        type="text" 
        value={value} 
        required={required} 
        name={name}
        onChange={() => {}} // Suppress React warning
        tabIndex={-1}
        style={{ 
          position: 'absolute', 
          opacity: 0, 
          height: 0, 
          width: 0,
          pointerEvents: 'none',
          bottom: 0
        }}
      />
      
      <div 
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${error ? styles.hasError : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span style={{ color: selectedOption ? 'inherit' : '#999' }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <svg 
          className={styles.arrow} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && !disabled && (
        <div className={styles.optionsContainer}>
          {options.map(option => (
            <div 
              key={option.value} 
              className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
