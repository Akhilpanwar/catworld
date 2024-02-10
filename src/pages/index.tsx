import { useState, useEffect } from "react";
import axios from "axios";
import CatCard from "@/components/CatCard";
import "@/styles/globals.css";
import Spinner from "@/components/Spinner";
export interface CatData {
  url: string;
  id: string;
}

const HomePage = () => {
  const [catData, setCatData] = useState<CatData | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchCatData = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      setCatData(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cat data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCatData();
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto pt-8 bg-white flex  justify-center items-center min-h-screen overflow-hidden">
        {loading ? (
          <Spinner />
        ) : catData ? (
          <CatCard catData={catData} />
        ) : (
          <div>No cat data available</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
