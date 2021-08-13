import {Router} from "express";
import {unknownRouteRequestHandler} from "../controllers/unknown";

const router = Router();

// This should be the last middleware, it handles any route unhandled by the app
router.all('*', unknownRouteRequestHandler);

export default router;