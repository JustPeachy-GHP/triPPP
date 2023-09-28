const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_SECRET } = require("../secrets");
const router = require("express").Router();

const SALT_ROUNDS = 10;

const {
  getAllUsers,
  getUserById,
  createUser,
  //   getUserByEmail will be used for login/authenticate
  getUserByEmail,
  updateUserPass,
  getGroupAdminById,
  getGroupMemberById,
  getJournalById,
  getTripsAdminById,
  getTripsMemberById
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

// REGISTER

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password, firstname, lastname } = req.body;
    // NOTE currently bypassing bcrypt - will use the below line when we put bcrypt back in:
    // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser({ email, password, firstname, lastname });
    console.log(user);
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET);
    console.log("token", token);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    console.log("server api token", token);
    console.log("server api user", user)

    res.send({ user, token });
  } catch (error) {
    throw error;
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    console.log("SERVER API returned user:", user);
    if (!email) {
      res.sendStatus(401);
      return;
    }
    // NOTE currently bypassing bcrypt - will use the below line when we put bcrypt back in:
    // const validPassword = await bcrypt.compare(password, user.password);

    password === user.password ? validPassword = true : validPassword = false

    delete user.password;
    if (validPassword) {
      //create our token
      console.log("should have no password", user)
      const token = jwt.sign(user, JWT_SECRET);
      //attach cookie to our response using the token that we created
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });

      console.log("token", token);
      // delete user.password;
      res.send({ user, token });
      return token;
    }
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

// PATCH - /api/users/edit
// change password if email and (old) password match
router.patch('/edit', async(req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email, password, newpass } = req.body;
    const user = await getUserByEmail(email);
    console.log("user", user);
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const validPassword = await bcrypt.compare(password, user.password);

    delete user.password;

    if (validPassword) {
      console.log(req.body);
      const { email, password, newpass } = req.body;
      // hash
      const hashedPassword = await bcrypt.hash(newpass, SALT_ROUNDS);

      const user = await updateUserPass({email, password: hashedPassword})
      console.log(user)
      delete user.password
      res.send(user)
    }
  } catch (error) {
      throw error
  }
})

// GET - /api/users/uadmin/:id - get group_id from groupadmin by id -- groups user is an admin of

router.get("/uadmin/:id", async (req, res, next) => {
  try {
    console.log("getting group from groupadmin by id...");
    const user = await getGroupAdminById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/ugroup/:id - get group_id from groupmembers by id -- groups user is a member of

router.get("/ugroup/:id", async (req, res, next) => {
  try {
    console.log("getting group from groupmembers by id...");
    const user = await getGroupMemberById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/ujournal/:id - get journal_id from journals by id

router.get("/ujournal/:id", async (req, res, next) => {
  try {
    console.log("getting journal_id from journals by id...");
    const user = await getJournalById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/utripadmin/:id - get trips user is admin of

router.get("/utripadmin/:id", async (req, res, next) => {
  try {
    console.log("getting trips by groups that user is admin of by id...");
    const user = await getTripsAdminById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// GET - /api/users/utripadmin/:id - get trips user is admin of

router.get("/utripmemb/:id", async (req, res, next) => {
  try {
    console.log("getting trips by groups that user is member of by id...");
    const user = await getTripsMemberById(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// moved to end so it doesn't match before more specific URLs - ST
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

module.exports = router;
