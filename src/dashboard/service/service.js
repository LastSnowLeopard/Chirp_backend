const operating_system = require("os");
const {pool} = require('../../../config/db');
const dbpool=pool.promise();

exports.getCompaniesDetail =async function () {

    try {
        const [rows,fields]=await dbpool.query(`select * from targets_licence`)
        console.log("Empty",rows)

            if (rows.length>=1) {
                return rows;
            } else {
                return rows;
            }
    } catch (error) {
        return false;
    }
};

exports.SytemSpecification =async function () {
    const Host_name_of_operation_system = operating_system.hostname();
    const loadAverage = operating_system.loadavg();
    const information_for_each_cpu_logical_core = operating_system.cpus(); 
    var Free_Memory = operating_system.freemem()/1073741824
   
    const Network_Interface = operating_system.networkInterfaces()
    const operating_system_platform = operating_system.platform() 
    const operating_system_release = operating_system.release()
    const Total_Memory = operating_system.totalmem()/1073741824
    
    const operating_system_type = operating_system.type()
    const operating_system_version = operating_system.version()
    const home_directory = operating_system.homedir()
    // console.log(loadAverage)
    // const obj ={};
    // // obj[0] = "Hostname:                  "+Host_name_of_operation_system
    // // obj[1] = "loadAverage:               "+loadAverage
    // // obj[2] = information_for_each_cpu_logical_core
    // obj[3] = "Free Memory of System:     " +Free_Memory
    // // obj[4]= Network_Interface
    // // obj[5] = "Operating System Platform: " + operating_system_platform
    // obj[6] = operating_system_release
    // obj[7] = "Total Memory "+Total_Memory
    // obj[8] = "Operating System type:     " + operating_system_type

       const obj={
        "Free Memory in RAM (unit : GB) " : Free_Memory,
        "Operating system Release "  : operating_system_release,
        "Total Memory of RAM (unit : GB)   "     :Total_Memory,
        "operating System Type"   : operating_system_type

    };
    // obj[9] = "Operating system version   " + operating_system_version
    // obj[10]= "Home Diectory              " + home_directory
      // obj.push(Host_name_of_operation_system)
    try {
          return obj
    
    } catch (error) {
        return false;
    }
};


