const data = require("../model/projectModel")

const { generateToken } = require("../controller/jwt")
const productData = require("../model/productModel")
const bcrypt = require("bcrypt")


BASE_URL = "http://localhost:80/"





const hashed = async (password) => {
  return await bcrypt.hash(password, 10)
}
const verify = async (password, oldpassword) => {
  return await bcrypt.compare(password, oldpassword)
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const emailverify = await data.findOne({ email: req.body.email })
    if (emailverify) {
      return res.json({ msg: "email already exist" })
    }
    const hashing = await hashed(password)
    const collectData = new data({
      name: name,
      email: email,
      password: hashing
    })
    await collectData.save()
    if (collectData) {
      res.status(200).json({
        message: "data added",
        collectData: collectData  // to show data 
      })
    } else {
      res.status(404).json({
        message: "data not added"
      })
    }
  } catch (error) {
    console.log(" in register", error)
  }

}

const getData = async (req, res) => {
  try {
    const colllectData = await data.findOne({ _id: req.params._id })
    return res.json({
      message: "data fetch",
      colllectData: colllectData
    })
  } catch (error) {
    console.log("error in getData>>>", error);
  }
}


const login = async (req, res) => {
  try {
    const { email, password, oldpassword } = req.body
    const user = await data.findOne({ email: req.body.email })
    if (!user) {
      return res.json({ msg: "user is not register or may have something wrong with email" })
    }
    const verifypassword = await verify(password, user.password)
    console.log(user.password);
    if (!verifypassword) {
      return res.json({ msg: "password incorrect or may have something wrong with password" })
    }
    const token = await generateToken({
      id: user
    })
    return res.status(200).json({
      status: 200,
      message: "User login successfully",
      token: token,
    });

  } catch (error) {
    console.log("error ocurred>>", error);
  }
}



const addproduct = async (req, res) => {
  try {
    const { productName, description } = req.body;
    // const productImage= req.files.map((value)=>  value.filename)
    const productImage = req.files.productImage
    console.log("productImage is>>", productImage);
    var allimage = []
    for (let value of productImage) {
      // console.log("value is>>",value);
      allimage.push(BASE_URL + value.filename)
    }
    console.log(allimage);


    const pdf = req.files.pdf
    var allpdf = []
    for (let value of pdf) {
      console.log("value is>>", value);
      allpdf.push(BASE_URL + value.filename)
    }

    
    const front_image = req.files.front_image
    console.log("front>>>",front_image);
    var allFrontImage = []
    for (let value of front_image) {
      console.log("value is>>", value);
      allFrontImage.push(BASE_URL + value.filename)
    }

    if (!productName || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }


    const collectData = await new productData({
      productName: productName,
      productImage: allimage,
      description: description,
      pdf: allpdf,
      front_image: allFrontImage
    });

    await collectData.save();
    res.json({ msg: "Data saved", data: collectData });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getallproduct = async (req, res) => {
  try {
    const collectData = await productData.find()
    res.json({ msg: "alldata", data: collectData })
  } catch (error) {
    console.log("error", error);
  }
}

const updateProduct = async (req, res) => {
  try {

    const { id } = req.params.id

    const nn = await productData.findOne({ id: id })
    if (!nn) {
      return res.json({ msg: "data not found" })
    }
    const { productName, description } = req.body;
  //   const productImage = req.files.productImage
  //  var pi =[]
  //   for (const value of productImage ) {
  //     pi.push(value.filename)
  //   }
  //   const front_image = req.files.front_image
  //   var fi =[]
  //   for (const value of front_image) {
  //     fi.push(value.filename)
  //   }
  const productImage = req.files.productImage
  var pi = productImage.forEach((value) => {
    return value.filename
  });
  const front_image = req.files.front_image
  var fi = front_image.forEach((value)=>{
    return value.filename
  })
    const newdata = await productData.updateMany({ _id: req.params.id }, {
      $set: {
        productName: productName,
        productImage: pi,
        description: description,
        front_image :fi
      }
    })
    // await newdata.save()
    const updateddata = await productData.findById(req.params.id)
    return res.json({ msg: "data has been updated", data: updateddata })

  } catch (error) {
    console.log("error>>", error);
  }
}

module.exports = { register, getData, login, getallproduct, addproduct, updateProduct }