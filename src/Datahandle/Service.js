const mysql =  require("mysql2");
const express = require("express");

const  {getDBcredentials} = require('../../config/dbConections');
const { response } = require("express");

    exports.getdetails_OF_Database_According_to_Query =async function (host,user,password,database,getquery) {
        
    
        try{
            const poolreq = await getDBcredentials(host,user,password,database)
    
            const dbpool=poolreq.promise();
          
                const responce=await dbpool.query(getquery)
                // console.log(response)
                return 1;
                     
            // if (response>=1) {
            //     return rows;
            // } else {
            //     return rows;
            // }
             }
        catch(e)
        {
            return -1 
        }

}
