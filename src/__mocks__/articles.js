/**
 * @description Function to return several mocked articles
 * @param {number} number the number of articles to be returned
 * @returns {undefined} - array of 20 articles
 */
const getMockArticles = number => Array(number)
  .fill(undefined)
  .map((val, index) => {
    const i = index;
    return {
      Tag: { name: 'Technology' },
      articleAuthor: 'ayo',
      User: {
        firstname: 'ayo',
        lastname: 'abc',
        username: 'jfbh'
      },
      body: 'Ok, we have, the following;↵1.  Adaeze↵2. Damola↵3. Ayo↵4. Daniel↵5. Chukwuemeka↵6. Christopher',
      coverUrl: 'https://res.cloudinary.com/artemisah/image/upload/v1556142399/kiij6e6pbp6eqmwcursg.png',
      createdAt: '2019-04-24T11:43:50.353Z',
      description: 'This is to confirm all the engineers on Artemis simulation team',
      rating: '0',
      readTime: {
        text: '< 1 min read', minutes: 0.085, time: 5100.000000000001, words: 17
      },
      slug: `try-me-now-49${i}`,
      title: 'Try me now',
      totalClaps: 0,
      userId: 2
    };
  });

export default getMockArticles;
