import fs from 'fs';
import csv from 'csv-parser';
import { v4 as uuidv4 } from 'uuid';
import pLimit from 'p-limit';
import logger from '../config/logger.js';
import { mockValidateEmail } from '../utils/emailValidator.js';

export const uploadStatus = new Map();

export const handleUpload = (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const uploadId = uuidv4();
  uploadStatus.set(uploadId, { total: 0, processed: 0 });

  const results = [];
  const failedRecords = [];
  const limit = pLimit(5);

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      uploadStatus.get(uploadId).total++;
      results.push(row);
    })
    .on('end', async () => {
      const tasks = results.map((record) =>
        limit(async () => {
          try {
            const { name, email } = record;
            const validation = await mockValidateEmail(email);

            logger.info(`Validating: ${email} - ${validation.valid}`);
            uploadStatus.get(uploadId).processed++;

            if (!validation.valid) {
              failedRecords.push({
                name,
                email,
                error: 'Invalid email format',
              });
            }
          } catch (err) {
            logger.error(`Error validating ${record.email}: ${err.message}`);
          }
        })
      );

      await Promise.all(tasks);
      uploadStatus.delete(uploadId);

      res.json({
        uploadId,
        totalRecords: results.length,
        processedRecords: results.length - failedRecords.length,
        failedRecords: failedRecords.length,
        details: failedRecords,
      });
    });
};

export const checkStatus = (req, res) => {
  const status = uploadStatus.get(req.params.uploadId);
  if (!status) return res.status(404).json({ error: 'Upload not found or complete' });

  const progress = status.total
    ? `${Math.round((status.processed / status.total) * 100)}%`
    : '0%';

  res.json({ uploadId: req.params.uploadId, progress });
};