
const pool = require('../../config/db');

exports.addCategoryService =async function (catData) {
      const sqlQuery = `insert into users (cat_name,parent1,cat_description) 
      values('${catData.cat_name}','${catData.parent1}','${catData.cat_description}')`;
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


exports.getCategoryListService =async function (contact_no) {
    const sqlQuery = `select * from categories`;
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

