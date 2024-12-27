import { Router } from "express";
import { add_specialization, addRole, deleteRole, deleteSpecialization, getRoleList, getSpecializationList, updateRole, updateSpecialization } from "../controllers/memberManagement.controller";
import { addStaffMember, deleteStaffMember, updateStaffMember } from "../controllers/staffMember.controller";
import { upload } from "../middlewares/multer.middleware";
import { addMember, deleteMember, updateMember } from "../controllers/member.controller";



const router = Router();


router.route("/add-staff").post(upload.single("image"), addStaffMember)
router.route("/update-staff/:id").put(upload.single("image"), updateStaffMember)
router.route("/delete-staff/:id").delete(deleteStaffMember)
router.route("/add-member").post(upload.single("image"), addMember)
router.route("/update-member/:id").put(upload.single("image"), updateMember)
router.route("/delete-member/:id").delete(deleteMember)
router.route("/role-list").get(getRoleList)
router.route("/add-role").post(addRole)
router.route("/add-specialization").post(add_specialization)
router.route("/specialization-list").get(getSpecializationList)
router.route("/update-specialization/:id").put(updateSpecialization)
router.route("/update-role/:id").put(updateRole)
router.route("/delete-role/:id").delete(deleteRole)
router.route("/delete-specialization/:id").delete(deleteSpecialization)


export default router;