import { Controller, Get, HttpStatus, Query, Response } from "@nestjs/common";
import { ClientProxy, Client, Transport } from "@nestjs/microservices";
import { IncidentService } from "./incident.service";

@Controller("incident")
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get()
  async getAllIncidents(@Response() res, @Query() query): Promise<any> {
    const incidents = await this.incidentService.findAll(query);
    res.status(HttpStatus.OK).json(incidents);
  }
}
