import { useState, useEffect } from "react";
import axios from "axios";
import CatCard from "@/components/CatCard";
import "@/styles/globals.css";
import Spinner from "@/components/Spinner";
import { CatInterface } from "@/types/CatInterface";

const HomePage = () => {
  const [catData, setCatData] = useState<CatInterface>();
  const [loading, setLoading] = useState(true);
  const fetchCatData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error("API_URL environment variable is not defined.");
      }

      const response = await axios.get(apiUrl);

      if (response) {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/${response.data[0].id}`
        );
        if (res) {
          const breedData = res.data?.breeds[0];
          setCatData((prevState) => ({
            ...prevState,
            url: res.data.url,
            id: res.data.id,
            breed: breedData,
          }));
        }
      }

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
          <CatCard catData={catData} fetch={fetchCatData} />
        ) : (
          <div>No cat data available</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
