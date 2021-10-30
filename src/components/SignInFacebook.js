import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/userSlice";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import "./SignInFacebook.css";
function SignInFacebook() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.name);
  const [name, setName] = useState();
  const [allInfo, setAllInfo] = useState();

  const responseFacebook = (response) => {
    console.log(response);
    axios.post("http://localhost:3001/user/", { userId: response.userID });
    setAllInfo(response);
    setName(response.name);
  };

  console.log(allInfo);
  useEffect(() => {
    dispatch(update({ name }));
  }, [name]);

  useEffect(() => {
    console.log(`now data => ${name}`);
    console.log(`from store => ${user}`);
  });

  return (
    <div >
      
      <FacebookLogin
        cssClass="btnFacebook"
        appId="384187966594543"
        fields="groups,name"
        autoLoad={false}
        callback={responseFacebook}
        publish_to_groups={true}
        icon={<img className="fa-facebook">
        </img>} textButton = "&nbsp;&nbsp;Sign In with Facebook"    
        // onClick={handleUpdate}
      />
      {/* <p>{JSON.stringify(allInfo)}</p> */}
      
    </div>
  );
}

export default SignInFacebook;