import {Router} from "express";
import {getCalendar} from "./calendar";

const router = Router();

router.get('/calendar', getCalendar);

export default router;
