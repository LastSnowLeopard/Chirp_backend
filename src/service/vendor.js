
const pool = require('../../config/db');

exports.vendorRegistration =async function (vendorData) {
      const sqlQuery = `insert into users (first_name,last_name,user_type,contact_no,user_password,email_address,updated_at,created_at,profile_picture,device_type,user_location,id_card_number) 
      values('${vendorData.first_name}','${vendorData.last_name}','${vendorData.user_type}','${vendorData.contact_no}','${vendorData.user_password}','${vendorData.email_address}','${vendorData.updated_at}','${vendorData.created_at}','${vendorData.profile_picture}','${vendorData.device_type}','${vendorData.user_location}','${vendorData.id_card_number}')`;
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

exports.checkifuserexist =async function (vendorData) {
    const sqlQuery = `select email_address from users where contact_no='${vendorData}' AND user_type='vendor'`;
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


exports.updateVendortoken =async function (vendorData) {
    const sqlQuery = `update users set jwt_token='${vendorData.jwt_token}' where  id='${vendorData.id}'`;
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


exports.searchVendor =async function (contact_no) {
    const sqlQuery = `select * from users where contact_no='${contact_no}' AND user_type='vendor'`;
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



exports.vendorLogout =async function (vendorid) {
    const sqlQuery = `update users set jwt_token=' ' where  id='${vendorid}'`;
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


