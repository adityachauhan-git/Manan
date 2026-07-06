import {Router} from 'express';

import {createLog, deleteLog, getLogById, getAllLogs, updateLog} from './logs.controller.js';
import {auth} from '../../common/middleware/authMiddleware.js';

const router = Router();

router.get('/', auth, getAllLogs);
router.get('/:id', auth, getLogById);
router.post('/', auth, createLog);
router.put('/:id', auth, updateLog);
router.delete('/:id', auth, deleteLog);

export default router;