const { name } = require('ejs')
const db = require('../contacts_app_sql/config/database')


exports.getAllContact=(req,res)=>{

    db.query("SELECT * FROM contacts ORDER BY ID ASC",(error,result)=>{
        if(error)
        res.redirect('/contacts')

        
        res.render('index.ejs',{contacts:result})
    })
    
}

exports.getSingleContact=(req,res)=>{
    
    db.query(`SELECT * FROM contacts WHERE id=${req.params.id}`,(error,result)=>{
        if(error)
        throw error

        console.log(result)
        res.json({
            message:result
        })
    })

}

exports.createContact=(req,res)=>{
    var name=req.body.name
    var mobile=req.body.mobile
    var email=req.body.email
    var id=req.body.id

    let Sql="SELECT * FROM contacts WHERE id='"+id+"'"

   
        db.query(Sql,(error,result)=>{
             if(error){
                return res.status(500).send(error)
             }
             if(result.length>0){
                message='Already exists'
                res.redirect('/contacts')
            }
            else{
                db.query("insert into contacts(name,mobile,email) values('"+name+"','"+mobile+"','"+email+"')"
                ,(error,result)=>{
        
                     if(error){
                       console.log(error)
                     }
        
                     res.redirect('/contacts')
                 })
                     
           }
    
        })
            
             
    }
        
exports.updateContact=(req,res)=>{
    
    db.query("UPDATE contacts SET name='"+req.body.name+"',mobile='"+req.body.mobile+"',email='"+req.body.email+"' WHERE id='"+req.params.id+"'"
               ,(error,result)=>{
                    if(error){
                    return res.status(500).send(err)
                    }

            
                    res.redirect('/contacts')
                })

}

exports.deleteContact=(req,res)=>{

    db.query(`DELETE FROM contacts WHERE id=${req.params.id}`,(error,result)=>{
        if(error)
        throw error

        res.redirect('/contacts')
    })

}


