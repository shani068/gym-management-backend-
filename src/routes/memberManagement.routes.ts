import { Router } from "express";
import { add_specialization, addRole, deleteRole, deleteSpecialization, getRoleList, getSpecializationList, updateRole, updateSpecialization } from "../controllers/memberManagement.controller";
import { addStaffMember } from "../controllers/staffMember.controller";
import { upload } from "../middlewares/multer.middleware";



const router = Router();


router.route("/add-staff").post(upload.single("image"), addStaffMember)
router.route("/role-list").get(getRoleList)
router.route("/add-role").post(addRole)
router.route("/add-specialization").post(add_specialization)
router.route("/specialization-list").get(getSpecializationList)
router.route("/update-specialization/:id").put(updateSpecialization)
router.route("/update-role/:id").put(updateRole)
router.route("/delete-role/:id").delete(deleteRole)
router.route("/delete-specialization/:id").delete(deleteSpecialization)


export default router;