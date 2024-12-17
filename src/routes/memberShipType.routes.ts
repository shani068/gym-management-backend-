import { Router } from "express";
import { addMemberShip, addMembershipCategory, getMemberShipCategories, getMemberShipList, updateMemberShip, updateMemberShipCategory } from "../controllers/memberShipType.controller";




const router = Router();


router.route("/membership").get(getMemberShipList)
router.route("/category").get(getMemberShipCategories)
router.route("/add-category").post(addMembershipCategory)
router.route("/add-membership").post(addMemberShip)
router.route("/update-category/:id").put(updateMemberShipCategory)
router.route("/update-membership/:id").put(updateMemberShip)


export default router;