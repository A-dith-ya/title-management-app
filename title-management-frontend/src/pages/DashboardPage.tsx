import { useEffect, useState } from "react";
import AddTitleForm from "../components/Dashboard/AddTitleForm";
import TitleList from "../components/Dashboard/TitleList";
import titlesApi from "../services/titlesApi";

interface Title {
  title: string;
  createdAt: string;
  uuid: string;
}

const Dashboard = () => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const fetchedTitles = await titlesApi.getTitles();
        setTitles(fetchedTitles);
      } catch (err) {
        setError("Failed to load titles");
      }
    };
    fetchTitles();
  }, []);

  const handleAddTitle = async (title: string) => {
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    try {
      const addedTitle = await titlesApi.createTitle(title);
      setTitles([...titles, addedTitle]);
      setError(null);
    } catch (err) {
      setError("Failed to add title");
    }
  };

  return (
    <div className="page-container">
      <h1>Title Dashboard</h1>
      {error && <p className="error">{error}</p>}
      <AddTitleForm onAddTitle={handleAddTitle} />
      <TitleList titles={titles} />
    </div>
  );
};

export default Dashboard;
