import React from "react";
import { Tweets, TrendSidebar } from "../../components";

const Bookmarks = () => {
  return (
    <div className="ml-60">
      <div className="flex ">
       
        <div className="ml-10 border-l border-r" style={{width:'43vw'}}>
        <div>
            <div className=" font-extrabold text-xl ml-4 ">Bookmarks</div>
            <div className=" font-thin text-sm ml-4 mb-2">@{sessionStorage.getItem('email')}</div>
        </div>
        <main className="" style={{height:'100vh'}}>
            <Tweets/>
        </main>
        </div>
        <div className=" ml-5">
            <TrendSidebar showTrending={true} showRecomendations={true} />
        </div>
        
      </div>
    </div>
  );
};

export default Bookmarks;
