import {
  createArticleIcon,
  settingsIcon,
  historyIcon,
  bookmarkIcon,
  readingStatsIcon,
  notificationIcon
} from '../../assets/img__func/icons_svg';

describe('test for article svg markups', () => {
  it('should return an svg', () => {
    expect(createArticleIcon()).toBeTruthy();
  });
});

describe('test for setting svg markups', () => {
  it('should return an svg', () => {
    expect(settingsIcon()).toBeTruthy();
  });
});

describe('test for history svg markups', () => {
  it('should return an svg', () => {
    expect(historyIcon()).toBeTruthy();
  });
});

describe('test for bookmark svg markups', () => {
  it('should return an svg', () => {
    expect(bookmarkIcon()).toBeTruthy();
  });
});

describe('test for reading time svg markups', () => {
  it('should return an svg', () => {
    expect(readingStatsIcon()).toBeTruthy();
  });
});

describe('test for notification svg markups', () => {
  it('should return an svg', () => {
    expect(notificationIcon()).toBeTruthy();
  });
});
