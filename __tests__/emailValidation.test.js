import { mockValidateEmail } from '../src/utils/emailValidator.js';

test('valid email passes validation', async () => {
  const res = await mockValidateEmail('test@example.com');
  expect(res.valid).toBe(true);
});

test('invalid email fails validation', async () => {
  const res = await mockValidateEmail('invalid-email');
  expect(res.valid).toBe(false);
});