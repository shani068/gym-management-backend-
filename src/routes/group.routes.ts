import { Router } from "express";
import { addGroup, deleteGroup, getGroupList, updateGroup } from "../controllers/group.controller";



const router = Router();

router.route("/group-list").get(getGroupList)
router.route("/add-group").post(addGroup)
router.route("/update-group/:id").put(updateGroup)
router.route("/delete-group/:id").delete(deleteGroup)


export default router;