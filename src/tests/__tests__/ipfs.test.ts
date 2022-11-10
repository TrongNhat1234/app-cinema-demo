import Ipfs from '../../common/services/ipfs'

jest.setTimeout(30000)
describe('Test whether calling upload metadata successfully or not', () => {
  test('Upload metadata', async () => {
    const ipfs = new Ipfs()
    const metadata = {
      name: 'test',
      description: 'test',
      image: 'test',
      metadata: '{}',
    }
    const result = await ipfs.uploadMetadata(metadata)
    expect(result).toMatch(/ipfs.padisea.fun/)
  })

  test('Fail if metadata is not Json stringify type', async () => {
    const ipfs = new Ipfs()
    const metadata = {
      name: 'test',
      description: 'test',
      image: 'test',
      metadata: 'hihi',
    }
    expect(ipfs.uploadMetadata(metadata)).rejects.toThrowError("Can't upload metadata")
  })
})
