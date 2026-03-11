import styles from './SectionDivider.module.css';

interface SectionDividerProps {
  variant: 'white-to-red' | 'red-to-white';
}

export const SectionDivider = ({ variant }: SectionDividerProps) => {
  const isWhiteToRed = variant === 'white-to-red';

  // Fill = the color we're transitioning INTO
  const fillColor = isWhiteToRed ? 'var(--color-primary)' : '#ffffff';
  // Background = the color we're coming FROM
  const bgColor = isWhiteToRed ? '#e8192c' : 'var(--color-primary)';

  return (
    <div
      className={styles.divider}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={styles.wave}
      >
        <path
          d="M0,64 C180,120 360,0 540,48 C720,96 900,16 1080,56 C1200,80 1320,40 1440,64 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
