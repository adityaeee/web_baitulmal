const { Gampong, Admin, Staf } = require("../../../models");
const { dataLayout } = require("../../../utils/index");

const formRegister = async (req, res) => {
	res.render("3_registrasiGampong", dataLayout(req, {}));
};

const register = async (req, res) => {
	try {
		console.log(req.errorValidation);
		if (req.errorValidation) {
			res.render(
				"3_registrasiGampong",
				dataLayout(req, {
					errors: req.errorValidation.errors,
				})
			);
			return;
		}

		let cekKode = await Gampong.findByPk(req.body.kode_gampong);

		if (req.body.kode_gampong == cekKode?.kode_gampong) {
			res.render(
				"3_registrasiGampong",
				dataLayout(req, {
					errors: ["Kode gampong telah terdaftar "],
				})
			);
			return;
		}

		if (req.body.password !== req.body.confirm) {
			res.render(
				"3_registrasiGampong",
				dataLayout(req, {
					errors: ["Konfirmasi password berbeda"],
				})
			);
			return;
		}

		req.flash(
			"msg",
			`Data gampong ${req.body.nama_gampong} berhasil ditambahkan`
		);

		await Gampong.create(req.body);
		// console.log(req.body);
		res.redirect("/auth/login/gampong");
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const formLoginGampong = async (req, res) => {
	if (req.session?.user) {
		res.redirect("/masyarakat");
		return;
	}
	res.render("3_loginGampong", dataLayout(req, {}));
};

const loginGampong = async (req, res) => {
	try {
		const gampong = await Gampong.findByPk(req.body.kode_gampong);
		if (gampong == null) {
			res.render(
				"3_loginGampong",
				dataLayout(req, {
					errors: ["kode gampong atau password salah!"],
				})
			);
			return;
		}
		if (gampong.password != req.body.password) {
			res.render(
				"3_loginGampong",
				dataLayout(req, {
					errors: ["kode gampong atau password salah"],
				})
			);
			return;
		}

		req.flash("msg", `Saleum Teuka ${gampong.nama} Bak Website Pembagian Zaqat`);

		req.session.user = {
			...gampong.dataValues,
			role: req.body.role,
			// kodeG: req.body?.kode_gampong,
		};

		res.redirect("/masyarakat");
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const formLoginAdmin = async (req, res) => {
	if (req.session?.user) {
		res.redirect("/masyarakat");
		return;
	}
	res.render("0_loginAdmin", dataLayout(req, {}));
};

const loginAdmin = async (req, res) => {
	try {
		const admin = await Admin.findOne({
			where: { username: req.body.username },
		});
		if (admin == null) {
			res.render(
				"0_loginAdmin",
				dataLayout(req, {
					errors: ["Username atau password salah!"],
				})
			);
			return;
		}
		if (admin.password != req.body.password) {
			res.render(
				"0_loginAdmin",
				dataLayout(req, {
					errors: ["Username atau password salah"],
				})
			);
			return;
		}

		req.flash("msg", `Saleum Teuka ${admin.nama} Bak Website Pembagian Zaqat`);
		req.session.user = { ...admin.dataValues, role: req.body.role };
		res.redirect("/masyarakat");
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const formLoginStaf = async (req, res) => {
	if (req.session?.user) {
		res.redirect("/masyarakat");
		return;
	}
	res.render("2_loginStaf", dataLayout(req, {}));
};

const loginStaf = async (req, res) => {
	try {
		const staf = await Staf.findOne({
			where: { username: req.body.username },
		});
		if (staf == null) {
			res.render(
				"2_loginStaf",
				dataLayout(req, {
					errors: ["Username atau password salah!"],
				})
			);
			return;
		}
		if (staf.password != req.body.password) {
			res.render(
				"2_loginStaf",
				dataLayout(req, {
					errors: ["Username atau password salah"],
				})
			);
			return;
		}

		req.flash("msg", `Saleum Teuka ${staf.nama} Bak Website Pembagian Zaqat`);

		req.session.user = { ...staf.dataValues, role: req.body.role };

		res.redirect("/masyarakat");
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const logout = async (req, res) => {
	// req.flash("msg", `Terima Kasih`);
	req.session.destroy();
	res.redirect("/masyarakat");
};

module.exports = {
	formLoginGampong,
	formLoginAdmin,
	formLoginStaf,
	formRegister,
	register,
	loginGampong,
	loginAdmin,
	loginStaf,
	logout,
};
