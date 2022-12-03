const mysql = require("mysql2");
const fs = require('fs');


const { getdetails_OF_Database_According_to_Query } = require('./service');
const AlterDetails = async (req, res) => {
    // var respond = "" 
    var match ="";
    var count = 0; 
    const getquery = req.body.query;
   
    const All_Company_Licence_ID_s = req.body.All_Company_Licence_ID_s;
     
        try {
        //     console.log("A")
        //     if(All_Company_Licence_ID_s!="ALL"){
        //     let rawdata = fs.readFileSync('./src/Datahandle/dbconfig.json');
        //     let dbdetailsq = JSON.parse(rawdata);
        //         for (let index = 0; index < dbdetailsq.length; index++) {
        //             if(dbdetailsq[index].lis_id==All_Company_Licence_ID_s)
        //             {
        //                 console.log("! = ALL block")
        //               match=dbdetailsq[index].lis_id;
                    
        //             }
        //             // else {
        //             //   count++;     
        //             // }
        //          break
                 
        //     }
        //     console.log("Please Enter Correct Lis_i")
        //     if ((dbdetailsq.length - 1) == count) {
        //         // res.status(200).send({ message:match })
        //         console.log("Please Enter Correct Lis_i")

        //         res.json({
        //             "Query": "Please Enter Correct Lis_id"
        //         })
        //     }
        // }
        // else{
        //     console.log(match)

            if (getquery != null && All_Company_Licence_ID_s!=null ) {
              
                let rawdata = fs.readFileSync('./src/Datahandle/dbconfig.json');
                let dbdetailsq = JSON.parse(rawdata);

                var host1 = '';
                var user1 = '';
                var password1 = '';
                var database1 = '';
                let final = {};
                let success = [];
                let failed=[];
                if (All_Company_Licence_ID_s == "ALL") {
                    for (let index = 0; index < dbdetailsq.length; index++) {
                        host = dbdetailsq[index].host;
                        user = dbdetailsq[index].user;
                        password = dbdetailsq[index].pwd,
                        database = dbdetailsq[index].db_name
                        //    const responce =
                        const respond = await getdetails_OF_Database_According_to_Query(host, user, password, database, getquery);
                          
                        if(respond==-1)
                        {   failed.push({dbanme:dbdetailsq[index].company_name})}

                        if(respond==1)
                        {success.push({dbanme:dbdetailsq[index].company_name})}
                        // var db = JSON.parse(respond);
                         
                        // final.push({success});
                        // final.push({failed});
                        if ((dbdetailsq.length - 1) == index) {
                            res.status(200).send({ message: respond ,success:success,failed:failed })
                            break
                        }

                    }
                }
                else {
                    let rawdata = fs.readFileSync('./src/Datahandle/dbconfig.json');
                    let dbdetailsq = JSON.parse(rawdata);
                    for (let index = 0; index < dbdetailsq.length; index++) {
                        if (dbdetailsq[index].lis_id == All_Company_Licence_ID_s) {
                            host = dbdetailsq[index].host;
                            user = dbdetailsq[index].user;
                            password = dbdetailsq[index].pwd,
                            database = dbdetailsq[index].db_name
                            //    const responce =
                            const respond = await getdetails_OF_Database_According_to_Query(host, user, password, database, getquery);
                            // var db = JSON.parse(respond);
                               if(respond==-1)
                        {   failed.push({dbanme:dbdetailsq[index].company_name})
                        res.status(200).send({ failed: failed })
                        break
                    }

                        if(respond==1)
                        {success.push({dbanme:dbdetailsq[index].company_name})
                        res.status(200).send({ success: success })
                        break
  
                        } 
                            break
                            }
                        else
                            {
                            res.status(500).send({ message: "Issue in your Licence ID and Query" })
                            }

                    }
                }
                // res.json(respond)
            }


            else
            {
                res.status(400).send({ message: "There is some Some mistake in Your Licence ID and Query " })

            }
        
            }
        catch (e) {
            // res.status(500).send({message:"System Error"})          
            res.status(500).send({ message: "System Error" })
        }
   }

module.exports = { AlterDetails }