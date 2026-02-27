import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string; // Allow extending
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
};
