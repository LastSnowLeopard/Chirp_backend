
const pool = require('../../config/db');

exports.adminRegistration =async function (adminData) {
      const sqlQuery = `insert into users (first_name,last_name,user_type,contact_no,user_password,email_address,updated_at,created_at,profile_picture,device_type,user_location,id_card_number) 
      values('${adminData.first_name}','${adminData.last_name}','${adminData.user_type}','${adminData.contact_no}','${adminData.user_password}','${adminData.email_address}','${adminData.updated_at}','${adminData.created_at}','${adminData.profile_picture}','${adminData.device_type}','${adminData.user_location}','${adminData.id_card_number}')`;
      console.log(sqlQuery);
      try {
        const res = await pool.query(sqlQuery);
        console.log(res)
              if (res.rowCount>=1) {
                  return "true";
              } else {
                  return "false";
              }
      } catch (error) {
          return "false";
      }
};

exports.checkifuserexist =async function (adminData) {
    const sqlQuery = `select email_address from users where contact_no='${adminData}' AND user_type='admin'`;
   console.log(sqlQuery);
    try {
      const res = await pool.query(sqlQuery);
  
      console.log(res);
    //   console.log(res);
            if (res.rowCount==0) {
                return "true";
            } else {
                return "false";
            }
    } catch (error) {
        return "false";
    }
};


exports.updateadmintoken =async function (adminData) {
    const sqlQuery = `update users set jwt_token='${adminData.jwt_token}' where  id='${adminData.id}'`;
   console.log(sqlQuery);
    try {
      const res = await pool.query(sqlQuery);
    //   await pool.end();
      console.log(res.rows);
    //   console.log(res);
            if (res.rowCount>=1) {
                return "true";
            } else {
                return "false";
            }
    } catch (error) {
        return res;
    }
};


exports.searchadmin =async function (contact_no) {
    const sqlQuery = `select * from users where contact_no='${contact_no}' AND user_type='admin'`;
   console.log(sqlQuery);
    try {
      const res = await pool.query(sqlQuery);
   
            if (res.rowCount==0) {
                return res;
            } else {
                return res;
            }
    } catch (error) {
        return error;
    }
};



exports.adminLogout =async function (adminid) {
    const sqlQuery = `update users set jwt_token=' ' where  id='${adminid}'`;
   console.log(sqlQuery);
    try {
      const res = await pool.query(sqlQuery);
    //   await pool.end();
      console.log(res.rows);
    //   console.log(res);
            if (res.rowCount>=1) {
                return true;
            } else {
                return false;
            }
    } catch (error) {
        return false;
    }
};


