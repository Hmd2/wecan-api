import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Trip } from './trip.model';
import { TripService } from './trip.service';

@ApiTags('Trip')
@Controller('trip')
export class TripController {
    
    constructor( private readonly luxtrip: TripService) {}

    @Post()
    @ApiOperation({ summary: 'Create trip' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiBody({ type: [Trip] })
     //@ApiProperty({ type: [String] }) trip: string [];
    addtrip(
        @Body('city') city: string,
        @Body('activities') activities: string
    ) {
        const generatedId = this.luxtrip.addTrip(city, activities);
        return { id: generatedId }
    }

    @Get()
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Trip,
      })
    @ApiOperation({ summary: 'get all trips' })
    getTrips() {
        return this.luxtrip.getTrips();
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Trip,
      })
    @ApiOperation({ summary: 'get trip by id' })
    getTrip(
        @Param('id') tripId: string
    ) {
        return this.luxtrip.getTrip(tripId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'update trip by id' })
    @ApiBody({ type: [Trip] })
    updateTrip(
      @Param('id') tripId: string,
      @Body('city') city: string,
      @Body('activities') activities: string
    ) {
      this.luxtrip.updateTrip(tripId, city, activities);
      return null;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete trip by id' })
    deleteTrip(@Param('id') tripId: string) {
        this.luxtrip.deleteTrip(tripId);
        return null;
    }
 }
