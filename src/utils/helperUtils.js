import jwt from 'jsonwebtoken';
import readingTime from 'reading-time';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { post } from 'axios';
import 'regenerator-runtime';

dotenv.config();

const secretKey = process.env.SECRET_KEY;

/**
 * @class HelperUtils
 * @description Specifies reusable helper methods
 * @exports HelperUtils
 */
class HelperUtils {
  /**
   * @method generateToken
   * @description Generate a token from a given payload
   * @param {object} payload The user payload to tokenize
   * @returns {string} JSON Web Token
   */
  static generateToken(payload) {
    return jwt.sign(payload, secretKey);
  }

  /**
   * @method verifyToken
   * @description Verifies a token and decodes it to its subsequent payload
   * @param {string} token The token to decode
   * @returns {object} The resulting payload
   */
  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload;
    } catch (error) {
      return false;
    }
  }

  /**
   * @description Method that estimates the reading time for an article
   * @param {string} articleBody
   * @return {object} estimatedTime
   */
  static estimateReadingTime(articleBody) {
    const estimatedTime = readingTime(articleBody);
    if (estimatedTime.minutes < 1) {
      estimatedTime.text = '< 1 min read';
    }
    return estimatedTime;
  }

  /**
   * @description Method for uploading images to cloudinary
   * @param {string} fileData
   * @return {object} estimatedTime
   */
  static async uploadImage(fileData) {
    const cloudinaryEndpoint = process.env.UPLOAD_URL;
    try {
      const getImage = await post(`${cloudinaryEndpoint}`, fileData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      const { data } = getImage;
      const secureUrl = data.secure_url;
      return secureUrl;
    } catch (error) {
      return 'Image could not be uploaded';
    }
  }

  /**
   * @method hashPasswordOrEmail
   * @description Hashes a users password
   * @param {string} passwordOrEmail The users password
   * @returns {string} The resulting hashed password
   */
  static hashPasswordOrEmail(passwordOrEmail) {
    const hash = bcrypt.hashSync(passwordOrEmail, 8);
    return hash;
  }
}

export default HelperUtils;
