
const pool = require('../../config/db');

 
exports.customerRegistration =async function (customerData) {
      const sqlQuery = `insert into users (first_name,last_name,user_type,contact_no,user_password,email_address,updated_at,created_at,profile_picture,device_type,user_location,id_card_number,login_type,app_version,device_name,country_name,country_code ) 
      values('${customerData.first_name}','${customerData.last_name}','${customerData.user_type}','${customerData.contact_no}','${customerData.user_password}','${customerData.email_address}','${customerData.updated_at}','${customerData.created_at}','${customerData.profile_picture}','${customerData.device_type}','${customerData.user_location}','${customerData.id_card_number}','${customerData.login_type}','${customerData.app_version}','${customerData.device_name}','${customerData.country_name}','${customerData.country_code}')`;
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



exports.checkifuserexist =async function (customerData) {
    const sqlQuery = `select email_address from users where contact_no='${customerData}' AND user_type='customer'`;
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


exports.updateCustomertoken =async function (customerData) {
    const sqlQuery = `update users set jwt_token='${customerData.jwt_token}',
    updated_at='${customerData.updated_at}',device_type='${customerData.device_type}',
    user_location='${customerData.user_location}',fcm_token='${customerData.fcm_token}',
    login_type='${customerData.login_type}',app_version='${customerData.app_version}',
    device_name='${customerData.device_name}',device_os='${customerData.device_os}',
    country_name='${customerData.country_name}',
    country_code='${customerData.country_code}'
    where  id='${customerData.id}'`;
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


exports.searchCustomer =async function (contact_no) {
    const sqlQuery = `select * from users where contact_no='${contact_no}' AND user_type='customer'`;
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

exports.getUserProfile =async function (id) {
    const sqlQuery = `select * from users where id='${id}' AND user_type='customer'`;
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



exports.customerLogout =async function (customerid) {
    const sqlQuery = `update users set jwt_token='',fcm_token='' where  id='${customerid}'`;
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


exports.updateOtp =async function (customerData) {

    const sqlQuery = `update users set otp='${customerData.otp}'
    where id='${customerData.user_id}'`;
    try {
      const res = await pool.query(sqlQuery);
    //   await pool.end();
      console.log(res.rows);
      console.log(res);
            if (res.rowCount>=1) {
                return "true";
            } else {
                return "false";
            }
    } catch (error) {
        return res;
    }
};

exports.getcategory =async function () {
    const sqlQuery = `SELECT t1.id AS lev1_id,t1.cat_name AS lev1,t2.id AS lev2_id, t2.cat_name as lev2,t3.id AS lev3_id, t3.cat_name as lev3,t4.id AS lev4_id, t4.cat_name as lev4
    FROM categories AS t1
    LEFT JOIN categories AS t2 ON t2.parent1 = t1.id
    LEFT JOIN categories AS t3 ON t3.parent1 = t2.id
    LEFT JOIN categories AS t4 ON t4.parent1 = t3.id
    WHERE t1.parent1 = 0`;
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

