import { Module } from "@nestjs/common";
import { HelloModule } from "./hello/hello.module";
import { IncidentModule } from "./incident/incident.module";

@Module({
  imports: [HelloModule, IncidentModule],
})
export class ApplicationModule {}
