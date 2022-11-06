import { Router } from "https://deno.land/x/oak/mod.ts";
import { processLogin, registerUser } from "./controller/authController.js";
import { fetchUserEnergy } from "./controller/energyController.js";
import { uploadFile } from "./controller/fileController.js";
import { fetchPostList, uploadPost } from "./controller/postController.js";

const router = new Router();

router.post("/login", processLogin);
router.post("/register", registerUser);

router.get("/api/posts", fetchPostList);

router.post("/api/upload/text", uploadPost);
router.post("/api/upload/file", uploadFile);

router.get("/api/user/energy", fetchUserEnergy);
router.post("/api/user/decrease/energy", ({ response }) => {
  response.status = 204;
});

export { router };
