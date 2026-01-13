import { motion } from "motion/react";
import { Brain, Check, Laptop, Sparkles, Wind, Zap } from "lucide-react";
import { useAppStore } from "../../store/app";
import { AVAILABLE_MODELS } from "../../data/models";
import styles from "./styles.module.scss";

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles size={20} />,
  brain: <Brain size={20} />,
  zap: <Zap size={20} />,
  laptop: <Laptop size={20} />,
  wind: <Wind size={20} />,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ModelSwitcher() {
  const { currentModel, setModel, setMode } = useAppStore();

  const handleSelect = (modelName: string) => {
    setModel(modelName);
    setMode('off');
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {AVAILABLE_MODELS.map((model) => (
        <motion.div
          key={model.name}
          className={`${styles.modelItem} ${currentModel === model.name ? styles.active : ''}`}
          variants={itemVariants}
          onClick={() => handleSelect(model.name)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className={styles.iconContainer}>
            {iconMap[model.icon] || <Sparkles size={20} />}
          </div>
          <div className={styles.info}>
            <span className={styles.name}>{model.name}</span>
            <span className={styles.description}>{model.description}</span>
          </div>
          {currentModel === model.name && (
            <motion.div
              className={styles.check}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Check size={18} />
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

