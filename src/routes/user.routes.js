import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  registerUser,
  reloadAccessToken,
  updateAccountDetails,
  updateAvatarImage,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwtToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJwtToken, logoutUser);
router.route("/reload-token").post(reloadAccessToken);
router.route("/change-password").post(verifyJwtToken, changeCurrentPassword);
router.route("/current-user").get(verifyJwtToken, getCurrentUser);
router.route("/update-account").patch(verifyJwtToken, updateAccountDetails);
router
  .route("/upddate-avater")
  .patch(verifyJwtToken, upload.single("avatar"), updateAvatarImage);
router
  .route("/upddate-cover")
  .patch(verifyJwtToken, upload.single("coverImage"), updateCoverImage);

router.route("/c/:username".get(verifyJwtToken, getUserChannelProfile));
router.route("history").get(verifyJwtToken, getWatchHistory);

export default router;
