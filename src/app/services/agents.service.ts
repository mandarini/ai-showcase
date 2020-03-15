import { Injectable } from "@angular/core";
import { AgentsApi } from "src/app/api/fake_api_service";
import { Agent, AgentId } from "../interfaces/agent";

@Injectable({
  providedIn: "root"
})
export class AgentsService {
  constructor(private agentsApi: AgentsApi) {}

  listAgents(): Promise<ReadonlyArray<Agent>> {
    return this.agentsApi.listAgents();
  }

  searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return this.agentsApi.searchAgents(nameSubstr);
  }

  getAgent(id: AgentId): Promise<Agent | undefined> {
    return this.agentsApi.getAgent(id);
  }
}
