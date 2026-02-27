import styles from './AdminToggle.module.css';

interface AdminToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function AdminToggle({ label, checked, onChange, disabled }: AdminToggleProps) {
  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.toggleContainer}>
        <input 
          type="checkbox" 
          className={styles.input} 
          checked={checked} 
          onChange={(e) => onChange(e.target.checked)} 
          disabled={disabled}
        />
        <div className={styles.slider}></div>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
}
