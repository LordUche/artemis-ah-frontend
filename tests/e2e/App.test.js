module.exports = {
    'Title is Authors Haven': function (browser) {
        // Browser is the browser that is being controlled
        browser
            .url('http://localhost:8080') // Navigate to the url
            .waitForElementVisible('body', 1000) // Wait until you can see the body element.
            .verify.title('Authors Haven') // Verify that the title is 'Bing'
            .end() // This must be called to close the browser at the end
    }
}
