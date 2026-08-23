import {supabase}
from "../lib/supabase.js";


export default async function handler(req,res){


if(req.method!=="POST")
return res.status(405).json({
success:false
});


const {key}=req.body;



const {data,error}=await supabase

.from("keys")

.select("*")

.eq("key",key)

.single();



if(error || !data){

return res.json({

success:false,

msg:"KEY KHÔNG TỒN TẠI"

});

}



if(!data.active){

return res.json({

success:false,

msg:"KEY ĐÃ KHÓA"

});

}



let now=new Date();

let expire=new Date(data.expire);



if(now>expire){

return res.json({

success:false,

msg:"KEY HẾT HẠN"

});

}



let day=Math.ceil(

(expire-now)

/(1000*60*60*24)

);



await supabase.from("logs")

.insert({

key:key,

action:"LOGIN",

status:"SUCCESS"

});



return res.json({

success:true,

remain:day

});


}