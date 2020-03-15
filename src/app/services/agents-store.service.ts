import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Agent, AgentId } from "../interfaces/agent";
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
  agentsInStore: { [key: number]: BehaviorSubject<Agent> };
  oneAgent: BehaviorSubject<Agent> = new BehaviorSubject({} as Agent);
  oneAgentState: BehaviorSubject<LoadingStates> = new BehaviorSubject<
    LoadingStates
  >(LoadingStates.Inactive);

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

  getAgent(id: AgentId): Observable<Agent | undefined> {
    if (this.agentsInStore[id]) {
      return this.agentsInStore[id].asObservable();
    } else {
      this.fetchAgent(id);
    }
  }

  fetchAgent(id: AgentId): void {
    if (!this.agentsInStore[id]) {
      this.oneAgentState.next(LoadingStates.Loading);
      this.agentsInStore[id] = new BehaviorSubject({} as Agent);
      this.agentsService
        .getAgent(id)
        .then((agent: Agent) => {
          this.oneAgentState.next(LoadingStates.LoadedSuccessfully);
          this.agentsInStore[id].next(agent);
        })
        .catch(error => {
          this.oneAgentState.next(LoadingStates.LoadError);
        });
    }
  }

  getAgentState(): Observable<LoadingStates> {
    return this.oneAgentState.asObservable();
  }

  getAgentsList(): Observable<Agent[]> {
    return this.agentsList.asObservable();
  }

  getAgentsListState(): Observable<LoadingStates> {
    return this.agentsListState.asObservable();
  }
}
