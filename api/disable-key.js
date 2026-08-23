import {supabase}
from "../lib/supabase.js";


export default async function handler(req,res){


await supabase

.from("keys")

.update({

active:false

})

.eq(

"key",

req.body.key

);



res.json({

success:true

});


}