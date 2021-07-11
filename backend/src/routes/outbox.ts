import {Router} from 'express';
import {OUTBOX_ENDPOINT} from 'config';
import {getOutboxController, getOutboxMessageByIdController, saveOutboxMessageController} from 'controllers/outbox';

const router = Router();


router.get(OUTBOX_ENDPOINT, getOutboxController);
router.get(`${OUTBOX_ENDPOINT}/:id`, getOutboxMessageByIdController);
router.post(OUTBOX_ENDPOINT, saveOutboxMessageController);

export default router;
