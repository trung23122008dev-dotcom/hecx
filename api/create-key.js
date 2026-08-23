import {supabase}
from "../lib/supabase.js";



function makeKey(){


return "NTRUNGIOS-"+

Math.random()

.toString(36)

.substring(2,10)

.toUpperCase();


}




export default async function handler(req,res){


const {days}=req.body;



const key=makeKey();



let expire=new Date();


expire.setDate(

expire.getDate()+Number(days)

);



await supabase

.from("keys")

.insert({

key:key,

expire:expire,

active:true

});



res.json({

success:true,

key:key,

expire:expire

});


}