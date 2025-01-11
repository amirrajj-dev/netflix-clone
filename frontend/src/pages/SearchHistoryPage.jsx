import React, { useEffect, useState } from "react";
import Navbar from "../components/home/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import SearchHistoryBox from "../components/SearchHistoryBox";
const SearchHistoryPage = () => {
  const [userSearchHistory, setUserSearchHistory] = useState([]);
  useEffect(() => {
    const getUserSearchHistory = async () => {
      try {
        const { data } = await axios.get("/api/search/history");
        if (data) {
          setUserSearchHistory(data.data);
        }
      } catch (error) {
        toast.error("error getting user search history");
      }
    };
    getUserSearchHistory();
  }, []);

  const deleteSearchHistoryItem = async (searchHistoryId)=>{
    try {
      const { data } = await axios.delete(`/api/search/history/${searchHistoryId}`);
      if (data.success) {
        toast.success("Search history item deleted successfully");
        setUserSearchHistory(userSearchHistory.filter(item => item.id !== searchHistoryId));
      } else {
        toast.error("Error deleting search history item");
      }
    } catch (error) {
      
    }
    
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="text-white pt-28 max-w-6xl mx-auto">
        <h2 className="text-white text-3xl">Search History</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-4 p-4">
          {userSearchHistory.map((item , index) => (
           <SearchHistoryBox key={index + 1} {...item} onDelete={deleteSearchHistoryItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;