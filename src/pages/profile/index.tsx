import React from "react";
import Banner from "./banner.jpeg";
import Picture from "./pic.jpg";
import { TrendSidebar } from "../../components";
import  Tweets  from '../profile/tweets'

const Profile = () => {
  return (
    <>
      <main
        className="border border-l border-r "
        style={{ height: "100vh", width: "60%" }}
      >
        
        
        <section
          className="border-l border-r border mb-4"
          style={{ height: "480px" }}
        >
          <div className="ml-2 h-1/2 mr-2  mb-5 border-solid  border-l-1 relative">
            <img
              src={Banner}
              className=" mt-1"
              style={{ height: "100%", width: "100%" }}
            />

            <img
              src={Picture}
              className="h-32 mb-5 rounded-full border-4 border- relative bottom-16 left-5 "
            />
          </div>

          <div className="flex justify-between">
            <div>
              <div className="mt-14 ml-4">
                <div className=" font-bold text-lg mb-1">
                  {sessionStorage.getItem("firstname")}
                  {"  "}
                  {sessionStorage.getItem("lastname")}
                </div>
                <div>@{sessionStorage.getItem("username")}</div>
              </div>
              <div className="flex mx-1 mt-3">
                <div className="mx-10">{} Following</div>
                <div>{} Followers</div>
              </div>
            </div>
            <div className="mr-10 mt-5">
              <button className="border px-3  py-2 rounded-3xl hover:bg-gray-100 border-black text-base font-bold">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="flex mt-7 justify-evenly">
            <button className=" font-bold">Posts</button>
            <button className="font-bold">Replies</button>
          </div>
        </section>
        <div className=" overflow-y-auto">
          <Tweets />
        </div>
      </main>
      <section className="w-1/5">
        <TrendSidebar showTrending={true} showRecomendations={true} />
      </section>
    </>
  );
};

export default Profile;
