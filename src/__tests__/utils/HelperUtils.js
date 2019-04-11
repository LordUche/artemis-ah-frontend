import HelperUtils from '../../utils/helperUtils';

describe('the verity token utils function', () => {
  it('should return false for invalid token', () => {
    expect(HelperUtils.verifyToken('invalid_token')).toEqual(false);
  });

  it('should return true for valid token', () => {
    const validToken = HelperUtils.generateToken({ valid: 'valid token' });
    const { valid } = HelperUtils.verifyToken(validToken);
    expect(valid).toEqual('valid token');
  });
});
