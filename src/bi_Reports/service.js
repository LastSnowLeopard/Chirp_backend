const {pool} = require('../../config/db');

// const {report} = require('../../Datahandle/Routes');
const dbpool = pool.promise();



exports.CompanyReportDetails = async function (dat, keyarray,valuearray) { 
    const {bi_gid, company_uid} = dat;
    var sql = `UPDATE targets_licence SET bi_gid =  '${bi_gid}' WHERE company_uid = '${company_uid}' `;
    var sql1 = `select * from bi_reports where company_uid='${company_uid}'`;

    try {
        const [rows] = await dbpool.query(sql)
        // console.log(rows)

        if (rows.affectedRows >= 1) {
            const [data] = await dbpool.query(sql1);
            // console.log(data)        
            if (data.length != 0) {
            // console.log(data)
                for (let index1 = 0; index1 < data.length; index1++) { // console.log(data[index1].company_uid, company_uid)
                    if (data[index1].company_uid == company_uid) {
                        // console.log(data[index1])
                          
                        var increment_uid = data[index1].uid-1 ;
                        //  console.log(increment_uid)   
                        for (let index = 0; index < keyarray.length; index++) {
                         let report_name = JSON.stringify(keyarray[index]);
                         const removed_report_name = report_name.split('"').join('');
                         let report_id = JSON.stringify(valuearray[index]);
                         const removed_report_id = report_id.split('"').join('');
                         increment_uid++;
                        //  console.log(increment_uid)
                            var sqlupdate = `UPDATE bi_reports  SET report_id = '${removed_report_id}' , 
                            report_name = '${removed_report_name}' WHERE company_uid = '${company_uid}' AND  uid = ${increment_uid}`;
                            // console.log(sqlupdate)
                           
                            // var sql12 = `INSERT INTO bi_reports (company_uid,report_id,report_name) VALUES ('${company_uid}','${report_id}','${report_name}')`;
                            await dbpool.query(sqlupdate);
                            // console.log(sqlupdate)
                            if ((keyarray.length - 1) == index) {
                                
                                return "Your Data is Successfully Updated ";
                            }
                            
                      
                        }
                     
                        }
                    
                     else {
                        return "Your data is Not Successfully Updated adn Inserted";
                    }
                   break;
                }
            } else {
                // console.log(data)
                       for (let index = 0; index < keyarray.length; index++) {
                        let report_name = JSON.stringify(keyarray[index]);
                        const removed_report_name = report_name.split('"').join('');

                        let report_id = JSON.stringify(valuearray[index]);
                        const removed_report_id = report_id.split('"').join('');

                        // console.log(typeof(report_name))
                            // var sqlupdate = `UPDATE customers SET  SET report_id = '${api_url}' , report_name = '${report_name}' WHERE company_uid = '${company_uid}'`;
                            var sqlupdate = `INSERT INTO bi_reports (company_uid,report_id,report_name) VALUES ('${company_uid}','${report_id}','${report_name}')`;
                            // console.log(sqlupdate)
                            await dbpool.query(sqlupdate);

                            if ((keyarray.length - 1)== index) {
                                return "Your Data is Successfully  Inserted";
                            }
                            
                        }
            }

        } else {
            if (rows.affectedRows == 0) 
                return "Your Data is not Updated ";
            

        }
    } catch (err) {
        return err+"System Error !"
    }
}





































































































































































































































































