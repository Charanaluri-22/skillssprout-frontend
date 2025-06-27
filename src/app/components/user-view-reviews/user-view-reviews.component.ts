import { Component, OnInit } from '@angular/core';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-view-reviews',
  templateUrl: './user-view-reviews.component.html',
  styleUrls: ['./user-view-reviews.component.css']
})
export class UserViewReviewsComponent implements OnInit {
  reviews: Review[] = [];
  filteredReviews: Review[] = [];
  isLoading: boolean = false;
  searchQuery: string = '';
  sortField: string = 'customerName'; // Default sort field
  sortDirection: string = 'asc'; // Default sort direction
  userId: string;

  constructor(
    private readonly service: ReviewService,
    private readonly userStoreService: UserStoreService
  ) { }

  ngOnInit(): void {
    this.userStoreService.getUser().subscribe(user => {
      this.userId = user.userId;
      this.loadReviews();
    });
  }

  loadReviews() {
    this.isLoading = true;
    this.service.getReviewsByUserId(this.userId).subscribe((data: Review[]) => {
      this.reviews = data;
      this.filteredReviews = data;
      this.isLoading = false;
      this.sortReviews();
    });
  }

  searchReviews() {
    this.filteredReviews = this.reviews.filter(review =>
      review.customer?.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      review.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      review.body.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.sortReviews();
  }

  sortReviews() {
    this.filteredReviews.sort((a, b) => {
      const fieldA = a[this.sortField].toString().toLowerCase();
      const fieldB = b[this.sortField].toString().toLowerCase();
      if (this.sortDirection === 'asc') {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    });
  }

  onSortFieldChange(field: string) {
    this.sortField = field;
    this.sortReviews();
  }

  onSortDirectionChange(direction: string) {
    this.sortDirection = direction;
    this.sortReviews();
  }
}
