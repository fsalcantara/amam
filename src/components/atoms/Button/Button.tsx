import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  className?: string;
  as?: 'button' | 'a';
  href?: string;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  as = 'button',
  href,
  ...props 
}: ButtonProps) => {
  
  const rootClassName = `${styles.button} ${styles[variant]} ${className}`;

  if (as === 'a' && href) {
    return (
      <a href={href} className={rootClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={rootClassName} {...props}>
      {children}
    </button>
  );
};
