jest.mock('nodemailer');

const request = require('supertest');
const app = require('../../app');
const { Subscription } = require('../db/models');

describe('Weather Subscription API', () => {
  it('should subscribe a user with valid data', async () => {
    const response = await request(app)
      .post('/api/subscribe')
      .send({
        email: 'test@example.com',
        city: 'Kyiv',
        frequency: 'daily'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toMatch(/confirmation/i);
  });

  it('should fail with invalid email', async () => {
    const response = await request(app)
      .post('/api/subscribe')
      .send({
        email: 'testexample.com',
        city: 'Kyiv',
        frequency: 'daily'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/invalid email/i);
  });

  it('should fail with missing required fields', async () => {
    const response = await request(app)
      .post('/api/subscribe')
      .send({
        email: 'test@example.com',
        city: '',
        frequency: 'daily'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/Missing required fields/i);
  })

  it('should fail with invalid city', async () => {
    const response = await request(app)
    .post('/api/subscribe')
      .send({
        email: 'test@example.com',
        city: 'K',
        frequency: 'daily'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/The city was not found. Check the title./i);
  })

  afterEach(async () => {
    await Subscription.destroy({ where: { email: 'test@example.com' } });
  });
});