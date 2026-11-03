import { describe, it, expect } from 'vitest'
import { Media } from './Media'

describe('Media Collection', () => {
  it('should have upload configuration', () => {
    expect(Media.upload).toBeDefined()
    expect(typeof Media.upload).toBe('object')
  })

  it('should not have staticDir defined', () => {
    expect(Media.upload).not.toHaveProperty('staticDir')
  })

  it('should have all expected image size variants', () => {
    const expectedSizes = ['thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og']
    const sizeNames = Media.upload.imageSizes.map((size) => size.name)

    expectedSizes.forEach((size) => {
      expect(sizeNames).toContain(size)
    })

    // Verify exact count to catch extra/missing sizes
    expect(Media.upload.imageSizes).toHaveLength(expectedSizes.length)
  })
})
