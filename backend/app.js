const express=require('express');
const mysql=require("mysql2");
const con=require("./connections/connect.js");
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("Running");
})

app.get("/getsection",(req,res)=>{
    let query=`select * from section`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
        res.json({message:result})
    })
})
app.post('/signup', function (req, res) {
    
    let sql=(req.body.role=="student")?`
    begin;
    insert into person (p_role,name,email,unique_password,roll_number) values ("${req.body.role}","${req.body.name}","${req.body.email}","${req.body.password}","${req.body.roll_number}");
    insert into person_section (sec_id,p_id) "${req.body.sec_id}", LAST_INSERT_ID();
    commit;
    `:
    `begin;
    insert into person (p_role,name,email,unique_password) values ("${req.body.role}","${req.body.name}","${req.body.email}","${req.body.password}");
    insert into section (sec_name,session) values  ${req.body.sec_name.map((s,i)=>{
    return `( "${req.body.sec_name[i]}","${req.body.session[i]}")`
    })};
    commit;
    `
    con.query(sql,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
        res.json({message:"entered sucesfuly"})
    })
});

app.post("/login",(req,res)=>{
    let query=`select * from person join person_section ON person_section.p_id=person.p_id where email="${req.body.email}" && unique_password="${req.body.password}"`
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
    let query_1=`select * from timing where start_at="${req.body.start_at}" && on_date="${req.body.on_date}"`;
    let query;
    con.query(query_1,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        else if(result.length==0){
             query=(req.body.event=="quiz")?`begin;
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
        }
        else{
            query=(req.body.event=="quiz")?`begin;
           
            INSERT INTO class_occupied ( t_id, event, class_name, quiz_details, subject_name,sec_id,hold_by_id)
            select "${result[0].t_id}","quiz","${req.body.class_name}","${req.body.quiz_details}","${req.body.subject_name}",sec_id,p_id from section join person 
            where sec_name="${req.body.sec_name}" && session="${req.body.session}" && p_id="${req.body.p_id}";
            commit;`:
            `begin;
           
            INSERT INTO class_occupied ( t_id, event, class_name, subject_name,sec_id,hold_by_id)
            select "${result[0].t_id}","class","${req.body.class_name}","${req.body.subject_name}",sec_id,p_id from section join person 
            where sec_name="${req.body.sec_name}" && session="${req.body.session}" && p_id="${req.body.p_id}";
            commit;`
        }
        con.query(query,(err,result)=>{
            if(err){
                res.status(400);
                res.json({err:err.sqlMessage});
                return;
            }
            res.status(200);
    
            res.json({message:result})
        })
    })
   
  
});

app.get("/getschedule/:id",(req,res)=>{
    let query=`select start_at,end_at,on_date,class_name,sec_name,session,event,quiz_details,subject_name from class_occupied 
    join timing ON class_occupied.t_id=timing.t_id JOIN section ON section.sec_id=class_occupied.sec_id where ${req.query.role=="teacher"?`hold_by_id=${req.params.id}`:`class_occupied.sec_id=${req.params.id}`} ;`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);

        res.json({message:result})
    })
});


app.post("/insertassignment",(req,res)=>{
    let query=`insert into assignment (assigned_by,is_project,details,subject_name,sec_id) values ("${req.body.assigned_by}",${req.body.is_project},"${req.body.details}","${req.body.subject_name}","${req.body.sec_id}")`
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});
app.get("/getasignments/:id",(req,res)=>{
    let query=`select * from assignment where ${req.query.role=="student"?`sec_id=${req.params.id}`:`assigned_by=${req.params.id}`}`;
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});
app.post("/inserttodo",(req,res)=>{
    let query=`insert into todo(p_id,details) values("${req.body.p_id}","${req.body.details}")`;
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});

app.get("/gettodo/:id",(req,res)=>{
    let query=`select details from todo where p_id=${req.params.id}`;
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});

app.post("/uploadresult",(req,res)=>{
    let query=`insert into result(p_id,uploaded_by_id,percentage,subject_name) values("${req.body.student_id}","${req.body.teacher_id}","${req.body.percentage}","${req.body.subject_name}")`;

    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});

app.get("/getresult/:id",(req,res)=>{
    let query=`select * from result where ${req.query.role=="student"?`p_id=${req.params.id}`:`uploaded_by_id=${req.params.id}`}`;
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});

app.get("/getallstudents",(req,res)=>{
    let query=`select * from person where p_role="student"`;
    con.query(query,(err,result)=>{
        if(err){
            res.status(400);
            res.json({err:err.sqlMessage});
            return;
        }
        res.status(200);
      
        res.json({message:result})
    })
});

app.listen(process.env.PORT || 8000,()=>{
    console.log("started succesfuly");
});


  