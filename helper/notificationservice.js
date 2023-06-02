const {pool} = require('../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.createNotification = async function (sql) {

  
    try {
        console.log(sql);
        const [fields] = await dbpool.query(sql);
        
        console.log(fields.insertId);
        return fields.insertId;
            
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};
