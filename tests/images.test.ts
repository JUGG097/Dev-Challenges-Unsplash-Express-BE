import request from 'supertest'
import app from '../app'
import { doesNotMatch } from 'assert'

describe('Tests the image controller through the endpoints', () => {
  it('should return 200 for a get request to fetch images', async () => {
    const resp = await request(app).get("/api/v1/images")

    expect(resp.status).toEqual(200);
  })
})