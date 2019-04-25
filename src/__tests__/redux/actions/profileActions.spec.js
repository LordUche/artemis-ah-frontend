import { updateUserDetails, saveUserDetails } from '../../../redux/actions/profileActions';

describe('Testing profile action', () => {
  it('should update profile', () => {
    const token = 'token_ghdasdhgddkjashjhjksadhj_token';
    const updatedBio = 'Go on fam again!!! Wooohooo!!!';
    let selectedImage = 'image.jpg';
    const dispatch = jest.fn();
    updateUserDetails(token, updatedBio, selectedImage, dispatch);
    updateUserDetails(token, updatedBio, selectedImage = false, dispatch);
  });

  it('should update profile', () => {
    const token = 'token_ghdasdhgddkjashjhjksadhj_token';
    const updatedBio = 'Go on fam again!!! Wooohooo!!!';
    let uploadedImageUrl = 'image.jpg';
    const dispatch = jest.fn();
    saveUserDetails(token, updatedBio, uploadedImageUrl, dispatch);
    saveUserDetails(token, updatedBio, uploadedImageUrl = false, dispatch);
  });
});
