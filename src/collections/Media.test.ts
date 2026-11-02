import { describe, test, expect, afterEach } from 'vitest'
import { HeadObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getPayload } from 'payload'
import config from '../payload.config'

describe('Media Collection - S3 Storage Integration', () => {
  const s3 = new S3Client({ region: 'us-east-2' })
  const bucket = 'iopenservices-com-cdn'

  // Keep track of created resources for teardown
  let createdIds: string[] = []
  let createdFilenames: string[] = []

  afterEach(async () => {
    const payload = await getPayload({ config })

    // Cleanup created documents
    for (const id of createdIds) {
      try {
        await payload.delete({ collection: 'media', id })
      } catch (error) {
        console.error(`Failed to delete media doc ${id}:`, error)
      }
    }
    createdIds = []

    // Cleanup S3 objects
    for (const filename of createdFilenames) {
      try {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: filename,
          }),
        )
      } catch (error) {
        console.error(`Failed to delete S3 object ${filename}:`, error)
      }
    }
    createdFilenames = []
  })

  test('uploads media to S3 bucket root and records correct public URL', async () => {
    const payload = await getPayload({ config })

    // Create 1x1 transparent PNG fixture
    const fileBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    )

    // Create media document
    const doc = await payload.create({
      collection: 'media',
      data: { alt: 'S3 Vitest Contract' },
      file: {
        data: fileBuffer,
        name: 'vitest-contract.png',
        mimetype: 'image/png',
      },
    })

    // Track for cleanup
    createdIds.push(doc.id)
    createdFilenames.push(doc.filename)

    // Assert 1: Correct URL format
    expect(doc.url).toBe(`https://${bucket}.s3.us-east-2.amazonaws.com/${doc.filename}`)

    // Assert 2: Physical object exists in S3
    const headResult = await s3.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: doc.filename,
      }),
    )
    expect(headResult.$metadata.httpStatusCode).toBe(200)
    expect(headResult.ContentType).toBe('image/png')
    expect(headResult.ContentLength).toBeGreaterThan(0)

    // Assert 3: Database row has correct URL
    const dbResult = await payload.db.pool.query('SELECT url FROM "media" WHERE id = $1', [doc.id])
    const row = dbResult.rows[0]
    expect(row.url).toBe(`https://${bucket}.s3.us-east-2.amazonaws.com/${doc.filename}`)

    expect(dbResult.rows[0].url).toBe(
      `https://${bucket}.s3.us-east-2.amazonaws.com/${doc.filename}`,
    )
  })
})
