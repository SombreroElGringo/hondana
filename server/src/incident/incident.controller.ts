import { Controller, Get, HttpStatus, Query, Response } from "@nestjs/common";
import { IncidentService } from "./incident.service";

@Controller("incidents")
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Get()
  async getAllIncidents(@Response() res, @Query() query): Promise<any> {
    const incidents = await this.incidentService.findAll(query);
    res.status(HttpStatus.OK).json(incidents);
  }
}
