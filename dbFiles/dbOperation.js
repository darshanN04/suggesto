const config                    =  require('./dbConfig'),
        sql                     =  require('mssql');

const getUser = async () => {
    try{
        let pool = await sql.connect(config);
        let user = pool.request().query("SELECT * FROM user_table")
        console.log(user);
        return user;
    }
    catch(error){
        console.log(error);
    }
}

const createUser = async (user) => {
    try{
        let pool = await sql.connect(config);
        let users = pool.request().query(`Insert into user_table (user_name, email, password, age, phone_no)
        values('${user.user_name}', '${user.email}', '${user.password}', ${user.age}, '${user.phone_no}')    
        `)
        return users;
    }
    catch(error){
        console.log(error);
    }
}

module.exports ={
    createUser,
    getUser
}