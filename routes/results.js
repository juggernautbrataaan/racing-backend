import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// POST /results — сохранить результат игрока
router.post('/', async (req, res) => {
  const { player_name, track, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO results (player_name, track, time) VALUES ($1, $2, $3) RETURNING *',
      [player_name, track, time]
    );
    res.status(201).json({ message: 'Result saved', result: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving result' });
  }
});

// GET /results?track=Track1 — получить топ-10 по трассе
router.get('/', async (req, res) => {
  const { track } = req.query;

  try {
    let result;

    if (track) {
      // Если track передан — фильтруем по треку
      result = await pool.query(
        'SELECT * FROM results WHERE track = $1 ORDER BY time ASC',
        [track]
      );
    } else {
      // Если track не передан — выводим все записи
      result = await pool.query(
        'SELECT * FROM results ORDER BY track, time ASC'
      );
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching results' });
  }
});


export default router;