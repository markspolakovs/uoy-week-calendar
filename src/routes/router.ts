import {Router} from "express";
import {getCalendar} from "./calendar";
import getIndex from "./root";

const router = Router();

router.get('/', getIndex);
router.get('/calendar', getCalendar);

export default router;
