import config from "./../config/config.js";
import { Router } from 'express';

const router = Router();

router.get(`/`, async (req, res) => {
    res.json(config.INFO)
})

export default router;
