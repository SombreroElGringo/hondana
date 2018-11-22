import { Controller, Get, HttpStatus, Query, Response } from "@nestjs/common";
import { StationService } from "./station.service";

@Controller("stations")
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  async getAllStations(@Response() res, @Query() query): Promise<any> {
    const stations = await this.stationService.findAll(query);
    res.status(HttpStatus.OK).json(stations);
  }
}
