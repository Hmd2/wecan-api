import { Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from './trip.model';

@Injectable()
export class TripService {

    trips: Trip[] = [];

    addTrip(city: string, activities: string): string {
        const tripId = (Math.floor(Math.random() * 100) + 1).toString();
        const newTrip = new Trip(tripId, city, activities);
        this.trips.push(newTrip);
        // console.log('TRIPID: ', tripId )
        return tripId;
    }

    getTrips(): Trip[] {
        // console.log('TRIPS : ', [... this.trips])
        return [... this.trips]
    }

    getTrip(tripId: string) {
        const trip = this.findTrip(tripId)[0];
        return { ...trip}
    }

    updateTrip(tripId: string, city: string, activities: string) {
        const [trip, index] = this.findTrip(tripId);
        const updatedTrip = { ...trip };
        if (city) {
            updatedTrip.city = city;
        }
        if (activities) {
            updatedTrip.activities = activities;
        }
        this.trips[index] = updatedTrip;
    }

    deleteTrip(tripId: string) {
        const index = this.findTrip(tripId)[1];
        this.trips.splice(index, 1);
    }

    private findTrip(id: string): [Trip, number] {
        const tripIndex = this.trips.findIndex(prod => prod.id === id);
        const trip = this.trips[tripIndex];
        if (!trip) {
          throw new NotFoundException('Could not find product.');
        }
        return [trip, tripIndex];
      }

}
