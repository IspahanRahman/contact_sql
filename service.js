


// module.exports={
//     create:(data,callBack)=>{
//         pool.query(
//             `insert into contacts(name,mobile,email) values(?,?,?)`,
//             [
//                 data.name,
//                 data.mobile,
//                 data.email
//             ],
//             (error,results)=>{
//                 if(error){
//                     return callBack(error)
//                 }
//                 return callBack(null,results)
//             }

//         );
//     }
// }