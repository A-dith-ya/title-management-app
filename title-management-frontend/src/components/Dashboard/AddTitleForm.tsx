import { useState } from "react";
import styles from "./AddTitleForm.module.css";

interface AddTitleFormProps {
  onAddTitle: (title: string) => void;
}

const AddTitleForm = ({ onAddTitle }: AddTitleFormProps) => {
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = () => {
    onAddTitle(newTitle);
    setNewTitle("");
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Enter new title"
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>
        Add Title
      </button>
    </div>
  );
};

export default AddTitleForm;
