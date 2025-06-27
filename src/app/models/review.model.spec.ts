import { Review } from './review.model';

describe('Review Model', () => {

  fit('frontend_review_model_should_create_an_instance', () => {
    // Create a sample user object
    const review: Review = {
        body: 'Sample',
        rating: 2
    };

    expect(review).toBeTruthy();
    expect(review.body).toBe('Sample');
    expect(review.rating).toBe(2);

  });
});
