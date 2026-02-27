import styles from './AdminButton.module.css';

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  children: React.ReactNode;
}

export function AdminButton({ variant = 'primary', className, children, ...props }: AdminButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
}
