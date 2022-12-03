const {pool} = require('../../../config/db');
const {report} = require('../../Datahandle/Routes');
const dbpool = pool.promise();

exports.getCompaniesDetail = async function () {

    try {

        const [rows, fields] = await dbpool.query(`select * from targets_licence where deleted=1`)


        if (rows.length >= 1) {
            return rows;
        } else {
            return rows;
        }
    } catch (error) {
        return false;
    }
};

exports.CreateCompanyDetails = async function (data) { // console.log(data)
    const {
        api_url,
        base_url,
        bi_gid,
        company_name,
        db_name,
        status,
        webview_url,
        admin_licence_availed,
        admin_licence_limit,
        regionm_licence_availed,
        regionm_licence_limit,
        aream_licence_availed,
        aream_licence_limit,
        territorym_licence_availed,
        territorym_licence_limit,
        distributor_licence_availed,
        distributor_licence_limit,
        sr_licence_availed,
        sr_licence_limit,
        so_licence_availed,
        so_licence_limit,
        sm_licence_availed,
        sm_licence_limit,
        op_db_host,
        op_db_user,
        op_db_pwd,
        op_db_name,
        lis_id,
        report_url
    } = data;
    // console.log("Client Copmany Services Services<_________>Conttroller");


    var sql = `INSERT INTO targets_licence (api_url,base_url,bi_gid,company_name, db_name,status,webview_url,admin_licence_availed,
        admin_licence_limit, regionm_licence_availed,regionm_licence_limit,aream_licence_availed, aream_licence_limit,
        territorym_licence_availed,territorym_licence_limit,  distributor_licence_availed,distributor_licence_limit,sr_licence_availed,
        sr_licence_limit,so_licence_availed,so_licence_limit,sm_licence_availed,sm_licence_limit,op_db_host,op_db_user,op_db_pwd,op_db_name,
        lis_id,report_url) VALUES
         ('${api_url}', '${base_url}','${bi_gid}','${company_name}','${db_name}','${status}','${webview_url}','${admin_licence_availed}',
        '${admin_licence_limit}','${regionm_licence_availed}','${regionm_licence_limit}',
        '${aream_licence_availed}','${aream_licence_limit}','${territorym_licence_availed}','${territorym_licence_limit}'
        ,'${distributor_licence_availed}','${distributor_licence_limit}','${sr_licence_availed}','${sr_licence_limit}','${so_licence_availed}',
        '${so_licence_limit}','${sm_licence_availed}','${sm_licence_limit}','${op_db_host}','${op_db_user}','${op_db_pwd}','${op_db_name}','${lis_id}',
        '${report_url}')`;


    // console.log(sql)
    try {
        const [fields] = await dbpool.query(sql)


        if (fields.affectedRows >= 1) {
            return fields
        } else {
            return false
        }
    } catch (err) {
        return "System Error";

    }

}


exports.UpdateCompanyDetails = async function (data) {

    const {
        company_uid,
                   api_url,
                          base_url,
                                  bi_gid,
                                         company_name,
                                                     db_name,
                                               status,
                                    webview_url,
               admin_licence_availed,           admin_licence_limit,     
                              regionm_licence_availed,
                                                    regionm_licence_limit,
        aream_licence_availed,
                                                      aream_licence_limit,
        territorym_licence_availed,
                                                     territorym_licence_limit,
        distributor_licence_availed, 
                                                     distributor_licence_limit,
        sr_licence_availed,
                                                     sr_licence_limit,
        so_licence_availed,
                                                    so_licence_limit,
        sm_licence_availed,
                                                     sm_licence_limit,
        op_db_host,
                                                      op_db_user,
        op_db_pwd,
                                                        op_db_name,
        lis_id,
                                 report_url
    } = data;
    // console.log(name)
    console.log("Udate Company Details Services<____>Controller")
    var sql = `UPDATE targets_licence  SET api_url = '${api_url}',base_url= '${base_url}',bi_gid='${bi_gid}',company_name='${company_name}',
     db_name='${db_name}',status='${status}',webview_url='${webview_url}',admin_licence_availed ='${admin_licence_availed}',
     admin_licence_limit='${admin_licence_limit}',regionm_licence_availed='${regionm_licence_availed}',
      regionm_licence_limit='${regionm_licence_limit}', aream_licence_availed ='${aream_licence_availed}',aream_licence_limit=
      '${aream_licence_limit}', territorym_licence_availed = '${territorym_licence_availed}',
      territorym_licence_limit='${territorym_licence_limit}',distributor_licence_availed = '${distributor_licence_availed}',
      distributor_licence_limit = '${distributor_licence_limit}', sr_licence_availed = '${sr_licence_availed}', 
      sr_licence_limit='${sr_licence_limit}',so_licence_availed='${so_licence_availed}',
       so_licence_limit =  '${so_licence_limit}',sm_licence_availed='${sm_licence_availed}',sm_licence_limit='${sm_licence_limit}',
       op_db_host='${op_db_host}',op_db_user='${op_db_user}',op_db_pwd='${op_db_pwd}',op_db_name='${op_db_name}',lis_id='${lis_id}',
     report_url='${report_url}' WHERE company_uid ='${company_uid}'
     `;
    //      console.log(sql)
    try {
        const results = await dbpool.query(sql)

        if (results) { // return true;
            return results
            // console.log("Inserted Successfully")
        } else {
            return results
        }
    } catch (err) {
        res.status(400).send({message: "Bad Connection"})
    }
}

exports.DeleteCompanyDetails = async function (data) {
    const {company_uid} = data;
    console.log(data)

    let sql = `Delete From targets_licence WHERE company_uid ='${company_uid}'`;
    try {
        const results = await dbpool.query(sql)
        if (results) {
            return results
        } else {
            return results
        }
    } catch (err) {
        return "System error"
    }


}

exports.Create_CompanyDetails_licence = async function (dat) { // console.log(data)
    

    const {
        api_url,
        base_url,
        bi_gid,
        company_name,
        db_name,
        status,
        webview_url,
        admin_licence_availed,
        admin_licence_limit,
        regionm_licence_availed,
        regionm_licence_limit,
        aream_licence_availed,
        aream_licence_limit,
        territorym_licence_availed,
        territorym_licence_limit,
        distributor_licence_availed,
        distributor_licence_limit,
        sr_licence_availed,
        sr_licence_limit,
        so_licence_availed,
        so_licence_limit,
        sm_licence_availed,
        sm_licence_limit,
        op_db_host,
        op_db_user,
        op_db_pwd,
        op_db_name,
        // lis_id,
        report_url
    } = dat;

//     let length = 0;
let i = 0;
var result = "";
do{
    try{
var val = Math.floor(1000 + Math.random() * 9000);
var conver = val.toString()
// console.log(typeof(conver))
// console.log(val);
var lis_id_id = "TLK"+conver;


             const sqls = `SELECT lis_id from targets_licence where lis_id='${lis_id_id}' `;
        //    const sqlt = `SELECT lis_id, CASE WHEN lis_id =  '${lis_id_id}' THEN 'TRUE' ELSE 'FALSE' END AS result1 FROM targets_licence WHERE lis_id =  '${lis_id_id}'`

const [rows] = await dbpool.query(sqls)
 result = rows
//  console.log(result)
// console.log(result)
// console.log(sqlt)
  i++;
    }catch(e)
 {
        return e+"Database Connection error"
 }

    }while(result.length!=0);
 
    var sql = `INSERT INTO targets_licence (api_url,base_url,bi_gid,company_name, db_name,status,webview_url,admin_licence_availed,
        admin_licence_limit, regionm_licence_availed,regionm_licence_limit,aream_licence_availed, aream_licence_limit,
        territorym_licence_availed,territorym_licence_limit,  distributor_licence_availed,distributor_licence_limit,sr_licence_availed,
          sr_licence_limit,so_licence_availed,so_licence_limit,sm_licence_availed,sm_licence_limit,op_db_host,op_db_user,op_db_pwd,op_db_name,
        lis_id,report_url) VALUES
         ('${api_url}', '${base_url}','${bi_gid}','${company_name}','${db_name}','${status}','${webview_url}','${admin_licence_availed}',
        '${admin_licence_limit}','${regionm_licence_availed}','${regionm_licence_limit}',
        '${aream_licence_availed}','${aream_licence_limit}','${territorym_licence_availed}','${territorym_licence_limit}'
        ,'${distributor_licence_availed}','${distributor_licence_limit}','${sr_licence_availed}','${sr_licence_limit}','${so_licence_availed}',
        '${so_licence_limit}','${sm_licence_availed}','${sm_licence_limit}','${op_db_host}','${op_db_user}','${op_db_pwd}','${op_db_name}','${lis_id_id}',
        '${report_url}')`;

    // console.log(sql)
    try {
        const [fields] = await dbpool.query(sql)


        if (fields.affectedRows >= 1) {
            return true
        } else {
            return false
        }
    } catch (err) {
        return "System Error";

    }

}





































































































































































































































































