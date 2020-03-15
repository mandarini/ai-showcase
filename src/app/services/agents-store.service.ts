import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Agent } from "../interfaces/agent";
import { AgentsService } from "./agents.service";
import { Observable } from "rxjs";
export enum LoadingStates {
  Loading = "Loading",
  LoadedSuccessfully = "LoadedSuccessfully",
  LoadError = "LoadError",
  Inactive = "Inactive"
}
@Injectable({
  providedIn: "root"
})
export class AgentsStoreService {
  agentsListState: BehaviorSubject<LoadingStates> = new BehaviorSubject<
    LoadingStates
  >(LoadingStates.Inactive);

  agentsList: BehaviorSubject<Agent[]> = new BehaviorSubject([]);

  constructor(private agentsService: AgentsService) {}

  fetchAgentsList(): void {
    this.agentsListState.next(LoadingStates.Loading);
    this.agentsService
      .listAgents()
      .then((agents: Agent[]) => {
        console.log("hello", agents);
        this.agentsListState.next(LoadingStates.LoadedSuccessfully);
        this.agentsList.next(agents.filter(agent => agent));
      })
      .catch(error => {
        this.agentsListState.next(LoadingStates.LoadError);
      });
  }

  getAgentsList(): Observable<Agent[]> {
    return this.agentsList.asObservable();
  }

  getAgentsListState(): Observable<LoadingStates> {
    return this.agentsListState.asObservable();
  }
}
