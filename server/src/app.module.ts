import { Module } from "@nestjs/common";
import { HelloModule } from "./hello/hello.module";
import { IncidentModule } from "./incident/incident.module";
import { StationModule } from "./station/station.module";

@Module({
  imports: [HelloModule, IncidentModule, StationModule],
})
export class ApplicationModule {}
