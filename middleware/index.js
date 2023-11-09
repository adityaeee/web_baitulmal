const multer = require("multer");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    req.errorValidation = null;
    return next();
  } catch (error) {
    req.errorValidation = error;
    return next();
  }
};

const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "./public/images");
  //   },
  filename: function (req, file, cb) {
    console.log(file);
    // const unique = file.originalname.split(".");
    // req.fileName = req.body.NIK + "." + unique[unique.length - 1];
    // if (req.body?.gambarLama) {
    //   fs.unlinkSync("./public/images/" + req.body?.gambarLama);
    // }
    cb(null, file.originalname);
  },
});

const uploadFile = (destination) => {
  return multer({ storage, dest: destination });
};

module.exports = { validate, uploadFile };
