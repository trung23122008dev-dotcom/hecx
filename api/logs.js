import {supabase}
from "../lib/supabase.js";


export default async function handler(req,res){


let {data}=await supabase

.from("logs")

.select("*")

.order(

"time",

{

ascending:false

}

);



res.json(data);


}