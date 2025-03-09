import { Router } from "express";
import { addMemberShip, addMembershipCategory, deleteCategoryById, getMemberShipAllCategories, getMemberShipCategoryById, getMemberShipList, updateMemberShip, updateMemberShipCategory } from "../controllers/memberShipType.controller";




const router = Router();


router.route("/membership").get(getMemberShipList)
router.route("/category/:id").get(getMemberShipCategoryById)
router.route("/category-list").get(getMemberShipAllCategories)
router.route("/add-category").post(addMembershipCategory)
router.route("/add-membership").post(addMemberShip)
router.route("/update-category/:id").put(updateMemberShipCategory)
router.route("/update-membership/:id").put(updateMemberShip)
router.delete("/delete-category/:id", deleteCategoryById)


export default router;