module.exports = {
  'Title is Authors Haven': (browser) => {
    // Browser is the browser that is being controlled
    browser
      .url('http://localhost:8080') // Navigate to the url
      .waitForElementVisible('body', 1000) // Wait until you can see the body element.
      .verify.title('Authors Haven') // Verify that the title is 'Authors Haven'
      .assert.visible('.hero__logo') // Test for logo
      .assert.attributeEquals('.hero__logo > img', 'src', 'http://localhost:8080/assets/img/logo.svg')
      .assert.visible('.hero__nav--links')
      .click('#explore')
      .pause(1000)
      .assert.visible('.dropdown__body')
      .assert.visible('.dropdown__body > li:nth-of-type(5)')
      .resizeWindow(411, 820) // Resize window to test for responsiveness
      .pause(1000)
      .assert.visible('.hamburger')
      .end(); // This must be called to close the browser at the end
  }
};
