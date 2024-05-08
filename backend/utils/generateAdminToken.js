import jwt from 'jsonwebtoken'

const generateAdminToken = (res, adminId)=>{
      
    const token = jwt.sign({adminId}, process.env.ADMIN_JWT_SECRET , {
        expiresIn:'3d'
    })

    res.cookie('adminAccessToken' , token, {
        httpOnly:true,
        sameSite:'strict',
        maxAge : 3 * 24 * 60 * 60 * 1000
    })
}

export default generateAdminToken