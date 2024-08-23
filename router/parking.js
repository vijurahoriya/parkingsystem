const express = require('express');
const router =  express.Router();
const Parking = require('../models/parking')

router.get('/',async(req,res)=>{
   const record = await Parking.find();
    res.render('parking.ejs',{record})
})

router.get('/parkinginsert',(req,res)=>{
    res.render('parkingsystem')
})

router.post('/parkingrecords',async(req,res)=>{
    // console.log(req.body)
//for dynamic date    
    let currentDate = new Date();
    const {vno,vtype} = req.body

//    const {vno,vtype,vin} = req.body;
  const record = new Parking({ vtype:vtype,vin:currentDate,vno:vno,vout:'',vamount:0,vStatus:'IN'})
  await record.save();
//   console.log(record)   
res.redirect('/')
})


// for dynamic date this is not required
// router.get('/parkingstatusupdate/:id',(req,res)=>{
//     const id = req.params.id;
//     res.render('parkingstatusupdate.ejs',{id})
// })

// for dynamic date post replace with get

router.get('/parkingstatusrecord/:id',async(req,res)=>{
    const id = req.params.id;
    //  console.log(req.body);
    let outTime = new Date();
    // const {vout} = req.body;
    const record = await Parking.findById(id);
    // console.log(record)
    // let totalTime = vout-record.vin

       let totalTime = (outTime-record.vin)/(1000*60)
    // console.log(totalTime)
    let amount = 0;
    if(record.vtype == '2w'){
        amount = Math.round(totalTime * 30);
    }else if(record.vtype == '3w'){
        amount = Math.round(totalTime * 50);
    }
    else if(record.vtype == '4w'){
        amount = Math.round(totalTime * 70);
    }
    else if(record.vtype == 'hw'){
        amount = totalTime *90;
    }
    else if(record.vtype == 'lw'){
        amount = Math.round(totalTime * 100);
    }
    // await Parking.findByIdAndUpdate(id,{vout:vout,vamount:amount,vStatus:'OUT'})
    await Parking.findByIdAndUpdate(id,{vout:outTime,vamount:amount,vStatus:'OUT'})


    res.redirect('/')
})

router.get('/print/:id',async(req,res)=>{
    const id = req.params.id;
    const record = await Parking.findById(id);
    res.render('printrecipt.ejs',{record})
})
module.exports = router;