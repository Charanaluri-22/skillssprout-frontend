import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  customerId: number;
  showModal: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly reviewService: ReviewService,
    private readonly actRoute: ActivatedRoute,
    private readonly router:Router
  ) {
    this.reviewForm = this.fb.group({
      customerId: [this.customerId, [Validators.required]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.customerId = +this.actRoute.snapshot.paramMap.get('id');
    this.actRoute.queryParams.subscribe(params => {
      if (params['courseType']) {
        this.reviewForm.get('subject').setValue(params['courseDetails']);
      }
    });
  }

  addNewReview(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = this.reviewForm.value;
      newReview.customer = { customerId: this.reviewForm.get('customerId').value } as Customer;
      newReview.dateCreated = new Date().toISOString();
      this.reviewService.addReview(newReview).subscribe(() => {
        this.showModal = true;
        this.reviewForm.reset();
        this.reviewForm.get('subject').setValue('');
        this.ngOnInit();
      });
    } else {
      console.error('All the fields are required');
    }
  }

  confirmAccept(): void {
    this.showModal = false;
    this.router.navigate(['user/view/reviews']);
  }

  get f() {
    return this.reviewForm.controls;
  }
}
