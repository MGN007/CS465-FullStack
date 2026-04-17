import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {

  @Input() trip: any;

  @Output() editTripEvent = new EventEmitter<any>();
  @Output() deleteTripEvent = new EventEmitter<string>();

  // Inject authentication service so we can check login status
  constructor(private authenticationService: AuthenticationService) {}

  // Check if user is logged in (used in HTML to show/hide buttons)
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Emit edit event to parent component
  onEdit(): void {
    this.editTripEvent.emit(this.trip);
  }

  // Emit delete event to parent component
  onDelete(): void {
    this.deleteTripEvent.emit(this.trip.code);
  }
}