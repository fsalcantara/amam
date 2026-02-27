import { ComponentProps } from 'react';
import styles from './AdminInput.module.css';
import { CustomSelect } from './CustomSelect';

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AdminInput({ label, error, className, ...props }: AdminInputProps) {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <input 
        className={`${styles.input} ${error ? styles.hasError : ''}`} 
        {...props} 
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export function AdminSelect(props: ComponentProps<typeof CustomSelect>) {
  return <CustomSelect {...props} />;
}

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function AdminTextarea({ label, error, className, ...props }: AdminTextareaProps) {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <label className={styles.label}>{label}</label>
      <textarea 
        className={`${styles.input} ${styles.textarea} ${error ? styles.hasError : ''}`} 
        {...props} 
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
