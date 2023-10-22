import React,{  useEffect, useState } from "react";

import {Route } from "react-router-dom";
import Dashboard from "./dashboard.";

import NetworkError from "./NetworkError";
import notFound from "./notFound";
import history from "../history";
import ImageList from "../pages/Tv_App_Management/TV_Image/ImageList";
import Logo from "../pages/Dekstop_App_Management/Company_Logo_Management/Logo";
import Name from "../pages/Dekstop_App_Management/Company_Name_Management/Name";
import DekstopList from "../pages/Dekstop_App_Management/Dekstop_Name_List/DekstopList";
import UserList from "../pages/User_Management/user/UserList";
import CategoriesList from "../pages/Category_Management/categories/CategoriesList";
import SequenceCategory from "../pages/Category_Management/sequence/SequenceCategory";
import UserDashboard from "./userdashboard";
import DisplayList from "../pages/Display_Management/Display/DisplayList";
import NoticeList from "../pages/Notice_Management/Notice/NoticeList";
import TokenListToday from "../pages/Token_Management/Today_Token/TokenListToday";
import TokenListPrevious from "../pages/Token_Management/Previous_Token/TokenListPrevious";
import TokenDetails from "../pages/Token_Management/Previous_Token/TokenDetailsPrevious";
import TokenDetailsToday from "../pages/Token_Management/Today_Token/TokenDetailsToday";
import TokenDetailsPrevious from "../pages/Token_Management/Previous_Token/TokenDetailsPrevious";
import Sound from "../pages/Sound_Management/Sound/Sound";
import Support from "./Support";

const Switcher = () => {
  const [active, setActive] = useState("");
  const [countername, setCounterName] = useState("");
  const [countercategories, setCounterCategories] = useState("");
    
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      !localStorage.getItem("authtoken") ||
      localStorage.getItem("authtoken") === null
    ) {
      localStorage.clear();
      history.replace("/login");
    }

    setActive(localStorage.getItem("active"));
    setCounterName(localStorage.getItem("countername"));
    setCounterCategories(localStorage.getItem("countertype"));
    
  }, [])
  return (
      <switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/image-list" component={ImageList} />
        <Route path="/dekstop-name-list" component={DekstopList} />
        <Route path="/display-list" component={DisplayList} />
        <Route path="/notice-list" component={NoticeList} />
        <Route path="/user-list" component={UserList} />
        <Route path="/sound" component={Sound} />
        <Route path="/categories-list" component={CategoriesList} />
        <Route path="/sequence-categories" component={SequenceCategory} />
        <Route path="/user-dashboard" component={UserDashboard} />
        <Route path="/company-logo" component={Logo} />
        <Route path="/company-name" component={Name} />
        <Route path="/today-token-list" component={TokenListToday} />
        <Route path="/previous-token-list" component={TokenListPrevious} />
        <Route path="/token-details" component={TokenDetails} />
        <Route path="/token-details-today" component={TokenDetailsToday} />
        <Route path="/token-details-previous" component={TokenDetailsPrevious} />
        <Route path="/support" component={Support} />
        
      
        <Route path="/" exact component={Dashboard}/>
        <Route path="/notFound" exact component={notFound}/>
        <Route path="/networkError" exact component={NetworkError}/>
        {/* MessAGE */}
       
      </switch>
  );
};


export default Switcher;
