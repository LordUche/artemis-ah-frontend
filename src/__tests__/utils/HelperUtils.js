import moxios from 'moxios';
import HelperUtils from '../../utils/helperUtils';

describe('the verify token utils function', () => {
  it('should return false for invalid token', () => {
    expect(HelperUtils.verifyToken('invalid_token')).toEqual(false);
  });

  it('should return true for valid token', () => {
    const validToken = HelperUtils.generateToken({ valid: 'valid token' });
    const { valid } = HelperUtils.verifyToken(validToken);
    expect(valid).toEqual('valid token');
  });
});

describe('the reading time of a particular text', () => {
  it('should return 0 if no text is entered', () => {
    expect(HelperUtils.estimateReadingTime('').minutes).toEqual(0);
  });
  it('should return < 1 min read if reading time is less than a minute', () => {
    expect(Math.floor(HelperUtils.estimateReadingTime('Some random text').minutes)).toEqual(0);
    expect(HelperUtils.estimateReadingTime('Some random text').text).toEqual('< 1 min read');
  });
  it('should return the correct reading time', () => {
    expect(HelperUtils.estimateReadingTime('Some random text '.repeat(5000)).minutes).toEqual(75);
  });
});

describe('Test for cloudinary image uplaod', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should mock successful cloudinary upload', async () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent(mockImageData);
      request.respondWith({
        status: 200,
        response: { url: 'http://url.to/image.png', secure_url: 'https://url.to/image.png' }
      });
    });

    const response = await HelperUtils.uploadImage(mockImageData);
    expect(response).toEqual('https://url.to/image.png');
  });

  it('should mock failing cloudinary upload', async () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent(mockImageData);
      request.respondWith({
        status: 400,
        response: { error: 'Image could not be uploaded' }
      });
    });

    const response = await HelperUtils.uploadImage(mockImageData);
    expect(response).toEqual('Image could not be uploaded');
  });
});
