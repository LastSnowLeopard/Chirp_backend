
const {pool} = require('../config/db');
const dbpool = pool.promise();


exports.authUser =async function (customerData) {
    var sqlQuery = `select user_id from users where user_id='${customerData.id}'`;

    try {
      const res = await dbpool.query(sqlQuery);
    //   console.log(sqlQuery)
    //   console.log(res)
            if (res.rowCount==0) {
                return false;
            } else {
                return true;
            }
    } catch (error) {
        
        return error;
    }
};

exports.getConfiguration =async function () {

    const sqlQuery = `select * from settings`;
    try {
      const res = await pool.query(sqlQuery);

            if (res.rowCount==0) {
                return res;
            } else {
                return res;
            }
    } catch (error) {
        
        return res;
    }
};
