import { Router } from "express";
import { addMemberShip, addMembershipCategory, deleteCategoryById, deleteMemberShip, getMemberShipAllCategories, getMemberShipCategoryById, getMemberShipDetailById, getMemberShipList, updateMemberShip, updateMemberShipCategory } from "../controllers/memberShipType.controller";
import { verifyJwt } from "../middlewares/auth.middleware";




const router = Router();


router.route("/membership").get(getMemberShipList)
router.route("/category/:id").get(getMemberShipCategoryById)
router.route("/category-list").get(getMemberShipAllCategories)
router.route("/add-category").post(addMembershipCategory)
router.route("/add-membership").post(addMemberShip)
router.route("/update-category/:id").put(updateMemberShipCategory)
router.route("/update-membership/:id").put(updateMemberShip)
router.delete("/delete-category/:id", deleteCategoryById)
router.delete("/delete-memberShip/:id",deleteMemberShip)
router.get("/memberShip-detail/:id",getMemberShipDetailById)


export default router;