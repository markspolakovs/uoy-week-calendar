import express, {Router} from "express";
import {getCalendar} from "./routes/calendar";
import getWeek from "./routes/api/week";
import getPong from "./routes/api/pong";

const router = Router();

// Static root path
router.get('/', express.static('src/public'));

// Calendar
router.get('/calendar', getCalendar);

// API
router.get('/api/ping', getPong)

export default router;
