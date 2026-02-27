import styles from './NutritionalTable.module.css';

interface Nutrient {
  label: string;
  amount: string;
  dv: string; // Daily Value percentage
  isSubItem?: boolean;
}

interface NutritionalTableProps {
  servingSize?: string;
  servingsPerContainer?: string;
  calories?: string;
  nutrients?: Nutrient[];
}

const defaultNutrients: Nutrient[] = [
  { label: 'Gorduras Totais', amount: '8g', dv: '10%' },
  { label: 'Gorduras Saturadas', amount: '1g', dv: '5%', isSubItem: true },
  { label: 'Gorduras Trans', amount: '0g', dv: '', isSubItem: true },
  { label: 'Colesterol', amount: '0mg', dv: '0%' },
  { label: 'Sódio', amount: '160mg', dv: '7%' },
  { label: 'Carboidratos Totais', amount: '37g', dv: '13%' },
  { label: 'Fibra Alimentar', amount: '4g', dv: '14%', isSubItem: true },
  { label: 'Açúcares Totais', amount: '12g', dv: '', isSubItem: true },
  { label: 'Açúcares Adicionados', amount: '0g', dv: '', isSubItem: true },
  { label: 'Proteínas', amount: '3g', dv: '' },
];

export const NutritionalTable = ({
  servingSize = "50g (2 fatias)",
  servingsPerContainer = "aprox. 9",
  calories = "126",
  nutrients = defaultNutrients
}: NutritionalTableProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Informação Nutricional</h2>
        <p className={styles.serving}>{servingsPerContainer} porções por embalagem</p>
        <p className={styles.serving}><strong>Porção de {servingSize}</strong></p>
      </header>
      
      <div className={styles.caloriesRow}>
        <span className={styles.caloriesLabel}>Quantidade por porção<br/><strong>Valor Energético</strong></span>
        <span className={styles.caloriesValue}>{calories}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.dailyValue}>% VD*</span>
        </div>
        {nutrients.map((nutrient, index) => (
          <div key={index} className={`${styles.row} ${!nutrient.isSubItem ? styles.bold : ''}`}>
            <span className={nutrient.isSubItem ? styles.indent : ''}>
              {nutrient.label} <strong>{nutrient.amount}</strong>
            </span>
            <span className={styles.dailyValue}>{nutrient.dv}</span>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        * % Valores Diários com base em uma dieta de 2.000 kcal ou 8.400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.
      </footer>
    </div>
  );
};
