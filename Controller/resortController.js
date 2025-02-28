const {getAllResorts,getResort} = require('../Services/resortService')

const getResorts = async(req, res)=>{
    try{
        const resorts = await getAllResorts()
        // console.log(resorts)
        if (!resorts) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        const allResorts = resorts.map((resort) => ({
            ...resort._doc,
            photos: Array.isArray(resort.photos)
              ? resort.photos.map((photo) => `${process.env.BASE_URL}/uploads/${photo}`)
              : [],
            videos: Array.isArray(resort.videos)
              ? resort.videos.map((video) => `${process.env.BASE_URL}/uploads/${video}`)
              : [],
          }));

        res.status(200 || 201).json({allResorts})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

const getResortDetail = async(req, res)=>{
    try{
        const id = req.params.id
        const resort = await getResort(id)
        if (!resort) {
            return res.status(404).json({ message: 'Resort not found' });
        }

        const photos = resort.photos.map((photo)=>`${process.env.BASE_URL}/uploads/${photo}`)
        const videos = resort.videos.map((video)=>`${process.env.BASE_URL}/uploads/${video}`)

        res.status(201||200).json({...resort._doc, photos, videos})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}


module.exports = {getResorts, getResortDetail}

