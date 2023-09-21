// left out bcrypt, jwt
// commented out register, login, logout due to tokens not incorporated yet

const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  //   getUserByEmail will be used for login/authenticate
  getUserByEmail,
} = require("../db/helpers/users");

// GET - /api/users - get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/:userId - get user by id
router.get("/:id", async (req, res, next) => {
  try {
    console.log("getting userById...");
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// POST - /api/users - create a new user
router.post("/", async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    console.log(req.body);
    res.send(newUser);
  } catch (error) {
    throw error;
  }
});

// REGISTER

// router.post("/register", async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const { username, password } = req.body;
//     // hash
//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

//     const user = await createUser({ username, password: hashedPassword });
//     console.log(user);
//     delete user.password;

//     const token = jwt.sign(user, JWT_SECRET);
//     console.log("token", token);

//     res.cookie("token", token, {
//       sameSite: "strict",
//       httpOnly: true,
//       signed: true,
//     });

//     delete user.password;

//     res.send({ user, token });
//   } catch (error) {
//     throw error;
//   }
// });

// router.post("/login", async (req, res, next) => {
//   try {
//     console.log("req.body", req.body);
//     const { username, password } = req.body;
//     const user = await getUserByEmail(email);
//     console.log("user", user);
//     if (!user) {
//       res.sendStatus(401);
//       return;
//     }
//     const validPassword = await bcrypt.compare(password, user.password);

//     delete user.password;
//     if (validPassword) {
//       //create our token
//       const token = jwt.sign(user, JWT_SECRET);
//       //attach cookie to our response using the token that we created
//       res.cookie("token", token, {
//         sameSite: "strict",
//         httpOnly: true,
//         signed: true,
//       });

//       console.log("token", token);
//       delete user.password;
//       res.send({ user, token });
//       return token;
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/logout", async (req, res, next) => {
//   try {
//     res.clearCookie("token", {
//       sameSite: "strict",
//       httpOnly: true,
//       signed: true,
//     });
//     res.send({
//       loggedIn: false,
//       message: "Logged Out",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
