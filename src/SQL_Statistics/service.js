const  {getDBcredentials} = require('../../config/dbConections');


exports.Databasestats = async function(host,user,password,database,getquery)
{
//   const {Threads_connected} = data
//   console.log(Threads_connected)

  try{
    const poolreq = await getDBcredentials(host,user,password,database)
      
    const dbpool=poolreq.promise();
        const [fields] = await dbpool.query(getquery)
        // console.log(fields)
        const obj = {
          "value"  : 1,
          "fields" : fields
        }
        // console.log(obj)
        // console.log(obj.value)
        return obj;
             
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