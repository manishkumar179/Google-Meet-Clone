let express = require("express");
const passport = require("passport");
const { generateAccessToken, generateRefreshToken,} = require("../utils/generateToken");
const { logoutController, getAccessTokenController,} = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const ApiResponse = require("../utils/ApiResponse");

let router = express.Router();

router.get("/accessToken", getAccessTokenController);
router.get("/logout", authMiddleware, logoutController);

router.get("/me", authMiddleware, (req, res) => {
  return res.status(200).json(new ApiResponse("User get logged in", req.user));
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);


router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:"/",
    session: false,
  }),
  async (req, res) => {
    let accessToken = generateAccessToken(req.user._id);
    let refreshToken = generateRefreshToken(req.user._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.user.refreshToken = refreshToken;
    await req.user.save();

    return res.redirect("http://localhost:5173/home");
  },
);

module.exports = router;
