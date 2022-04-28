const express=require('express');
const mysql=require("mysql2");
const con=require("./connections/connect");
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', function (req, res) {
    
    let sql=(req.body.role=="student")?`insert into person (p_role,name,email,unique_password,roll_number) values ("${req.body.role}","${req.body.name}","${req.body.email}","${req.body.password}","${req.body.roll_number}")`:
    `insert into person (p_role,name,email,unique_password) values ("${req.body.role}","${req.body.name}","${req.body.email}","${req.body.password}")`
    con.query(sql,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
        // const res_result={...result[0],destinationsVisited:result.length};
        res.json({message:"entered sucesfuly"})
    })
});

app.post("/login",(req,res)=>{
    let query=`select * from person where email="${req.body.email}" && unique_password="${req.body.password}"`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        else if(result.length==0){
            res.status(404);
            res.json({message:"not found"});
            return;
        }
        res.status(200);
        res.json({message:result}); 
    })
})

app.post("/insertschedule",(req,res)=>{
    let query=(req.body.event=="quiz")?`begin;
    insert into timing (start_at,end_at,on_date)
    values("${req.body.start_at}","${req.body.end_at}","${req.body.on_date}");
    INSERT INTO class_occupied ( t_id, event, class_name, quiz_details, subject_name,sec_id,hold_by_id)
    select LAST_INSERT_ID(),"quiz","${req.body.class_name}","${req.body.quiz_details}","${req.body.subject_name}",sec_id,p_id from section join person 
    where sec_name="${req.body.sec_name}" && session="${req.body.session}" && p_id="${req.body.p_id}";
    commit;`:
    `begin;
    insert into timing (start_at,end_at,on_date)
    values("${req.body.start_at}","${req.body.end_at}","${req.body.on_date}");
    INSERT INTO class_occupied ( t_id, event, class_name, subject_name,sec_id,hold_by_id)
    select LAST_INSERT_ID(),"class","${req.body.class_name}","${req.body.subject_name}",sec_id,p_id from section join person 
    where sec_name="${req.body.sec_name}" && session="${req.body.session}" && p_id="${req.body.p_id}";
    commit;`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
        // const res_result={...result[0],destinationsVisited:result.length};
        res.json({message:result})
    })
});

app.get("getscheduleteacher/:id",(req,res)=>{
    let query=`select start_at,end_at,on_date,class_name,sec_name,session,name,event,quiz_details,subject_name from class_occupied 
    join timing ON class_occupied.t_id=timing.t_id JOIN section ON section.sec_id=class_occupied.sec_id join person ON person.p_id=class_occupied.hold_by_id where hold_by_id="${req.params.id}";`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
        // const res_result={...result[0],destinationsVisited:result.length};
        res.json({message:result})
    })
});
app.get("getstudentschedule/:id",(req,res)=>{
    let query=`select start_at,end_at,on_date,class_name,sec_name,session,event,quiz_details,subject_name from class_occupied 
    join timing ON class_occupied.t_id=timing.t_id JOIN section ON section.sec_id=class_occupied.sec_id join person_section ON person_section.sec_id=class_occupied.sec_id where p_id="${req.params.id}";`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
        // const res_result={...result[0],destinationsVisited:result.length};
        res.json({message:result})
    })
})
app.listen(8000,()=>{
    console.log("started succesfuly");
});


  