import styles from "./TitleList.module.css";

interface Title {
  title: string;
  createdAt: string;
  uuid: string;
}

interface TitleListProps {
  titles: Title[];
}

const TitleList = ({ titles }: TitleListProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Titles List</h3>
      <ul className={styles.list}>
        {titles.map((title) => (
          <li key={title.uuid} className={styles.listItem}>
            <span className={styles.titleText}>{title.title}</span>
            <span className={styles.dateText}>
              {new Date(title.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TitleList;
