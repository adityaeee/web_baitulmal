function dataLayout(req, props) {
  // console.log(req.cookies);
  return {
    layout: "layouts/main-layouts",
    title: "Zaqat",
    msg: req.flash("msg"),
    // user: req.cookies?.user ? JSON.parse(req.cookies?.user) : {},
    // ...props
  };
}

// const findGolongan = (NIK) => {
//   let find = loadFakir(NIK);
//   if (find.length !== 0) {
//     console.log(find.id_fakir);
//   } else {
//     console.log("kosong");
//   }
// };

module.exports = { dataLayout };
