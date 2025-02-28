const Resort = require('../Model/resort')

const getAllResorts = async()=>{
    try{
        const resort = await Resort.find()
        return resort
    }
    catch(err){
        console.log(err)
        return err
    }
}

const getResort = async(id)=>{
    try{
       const res = await Resort.findById(id)
       return res
    }catch(err){
        return err
    }
}

  



module.exports = {getAllResorts, getResort}