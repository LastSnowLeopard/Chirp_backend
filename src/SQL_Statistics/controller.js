const {Databasestats} = require('./service');
const fs = require('fs')

const Statistics = async (req,res)=>{
    // const company_uid = req.query.id; 
  
      // var respond = "" 
      var match ="";
      var count = 0; 
      const getquery = req.body.query; 
      
     
  
      // console.log(getquery)
      //const Specific_company_licence_ID = req.body.companyName; //all or LicenceID
      const All_Company_Licence_ID_s = req.body.All_Company_Licence_ID_s;
       
          try {
       
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
                          const respond = await Databasestats(host, user, password, database, getquery);
                          if(respond==-1)
                          {   failed.push({dbanme:dbdetailsq[index].company_name})}
                       
                          if(respond.value==1)
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
                    var mtdot ="";
                         for(let i=0;i<dbdetailsq.length;i++)
                         {
                             if(dbdetailsq[i].lis_id == All_Company_Licence_ID_s)
                             { 
                                  mtdot=dbdetailsq[i].lis_id;
                                   
                             }
                             break;
                         }
                    //   console.log(error)
                       if(mtdot==All_Company_Licence_ID_s){
                      for (let index = 0; index < dbdetailsq.length; index++) {
                          if (dbdetailsq[index].lis_id == All_Company_Licence_ID_s) {
                              host = dbdetailsq[index].host;
                              user = dbdetailsq[index].user;
                              password = dbdetailsq[index].pwd,
                              database = dbdetailsq[index].db_name
                              //    const responce =
                              const respond = await Databasestats(host, user, password, database, getquery);

                              // var db = JSON.parse(respond);
                                 if(respond==-1)
                          {   failed.push({dbanme:dbdetailsq[index].company_name})
                          res.status(200).send({ failed: failed })
                          break
                      }
  
                          if(respond.value==1)
                          {success.push({dbanme:dbdetailsq[index].company_name})
                          res.status(200).send({message:respond.fields, success: success })
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
                    else {
                        res.send({message : "Please send Correct Licence id"});
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
           
             
              res.status(500).send({ message: "System Error" })
          }
 }

 module.exports = Statistics