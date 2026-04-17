import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { TripCard } from '../trip-card/trip-card';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {
  trips: any[] = [];
  showAddForm = false;
  editingTrip: any = null;

  newTrip: any = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private tripService: TripDataService,
    private cdr: ChangeDetectorRef,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.getTrips();
  }

  // Check whether the current user is logged in
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data: any) => {
        console.log('API DATA:', data);
        console.log('IS ARRAY?', Array.isArray(data));

        this.trips = Array.isArray(data) ? [...data] : [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('API ERROR:', err);
        this.trips = [];
      }
    });
  }

  resetForm(): void {
    this.newTrip = {
      code: '',
      name: '',
      length: '',
      start: '',
      resort: '',
      perPerson: '',
      image: '',
      description: ''
    };
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;

    if (this.showAddForm) {
      this.editingTrip = null;
      this.resetForm();
    }
  }

  editTrip(trip: any): void {
    this.editingTrip = trip;
    this.showAddForm = true;
    this.newTrip = { ...trip };
  }

  cancelEdit(): void {
    this.showAddForm = false;
    this.editingTrip = null;
    this.resetForm();
  }

  saveTrip(): void {
    console.log('SAVE BUTTON CLICKED', this.newTrip);

    if (this.editingTrip) {
      this.tripService.updateTrip(this.newTrip).subscribe({
        next: () => {
          console.log('Trip updated:', this.newTrip);
          this.getTrips();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Update ERROR:', err);
        }
      });
    } else {
      this.tripService.addTrip(this.newTrip).subscribe({
        next: () => {
          console.log('Trip added:', this.newTrip);
          this.getTrips();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Add ERROR:', err);
        }
      });
    }
  }

  deleteTrip(tripCode: string): void {
    this.tripService.deleteTrip(tripCode).subscribe({
      next: () => {
        console.log('Deleted trip:', tripCode);
        this.getTrips();
      },
      error: (err) => {
        console.error('Delete ERROR:', err);
      }
    });
  }
}