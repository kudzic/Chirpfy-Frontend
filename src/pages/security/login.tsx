import React, { useState,useRef } from 'react'
import { Link, redirect } from 'react-router-dom'
import Keycloak from 'keycloak-js'
import { useEffect } from 'react'
import axios from 'axios'

const kc= new Keycloak({
  realm: 'Chirpfy',
  url: 'http://localhost:7080/',
  clientId: 'authenticationClientId'
});

const Login =  () => {

   
  const isRun=useRef(false);
  
  useEffect(() => {
 
    if (isRun.current) return;
  
    isRun.current = true;
    kc.init({
      onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
      checkLoginIframe: true,
      
    }).then((auth) => {

      if (!auth) {
        window.location.reload();
      } else {
        
     const userData = {
      url: `http://localhost:8083/api/user/signup`,
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json",
     
      },
      data: {
        id:kc.tokenParsed.sub,
        username: kc.tokenParsed.preferred_username ,
        email: kc.tokenParsed.email,
        userName: kc.tokenParsed.preferred_username,
        firstName : kc.tokenParsed.given_name,
        lastName: kc.tokenParsed.family_name,
        passsword: ''
      },
    };

    const res= axios(userData).then((result) => {
        console.log(result.data);
       }).catch((err) => {
        console.log(err);
       });
        sessionStorage.setItem('id',kc.tokenParsed.sub);
        sessionStorage.setItem('username',kc.tokenParsed.preferred_username);
        sessionStorage.setItem('email',kc.tokenParsed.email)
        sessionStorage.setItem('firstname',kc.tokenParsed.given_name)
        sessionStorage.setItem('lastname',kc.tokenParsed.family_name)
        sessionStorage.setItem('token',kc.token)
        sessionStorage.setItem('refresh',kc.refreshToken)
 
        kc.onTokenExpired = () => {
          console.log('token expired')
        }
       window.location.href="/";
      }
    }, () => {
      /* Notify the user if necessary */
      console.error("Authentication Failed");
    });



  },[]);
 

  return (
    <></>
  )
}

export  {Login as default,kc}; 