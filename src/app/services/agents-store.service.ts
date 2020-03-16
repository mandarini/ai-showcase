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
  agentsList: BehaviorSubject<Agent[]> = new BehaviorSubject([]);
  agentsListState: BehaviorSubject<LoadingStates> = new BehaviorSubject<
    LoadingStates
  >(LoadingStates.Inactive);
  searchAgentsList: {
    [key: string]: BehaviorSubject<Agent[]>;
  } = {};
  searchAgentsListState: {
    [key: string]: BehaviorSubject<LoadingStates>;
  } = {};
  agentsInStore: { [key: number]: BehaviorSubject<Agent> } = {};
  agentsInStoreStates: { [key: number]: BehaviorSubject<LoadingStates> } = {};

  constructor(private agentsService: AgentsService) {}

  fetchAgentsList(): void {
    this.agentsListState.next(LoadingStates.Loading);
    this.agentsService
      .listAgents()
      .then((agents: Agent[]) => {
        this.agentsListState.next(LoadingStates.LoadedSuccessfully);
        this.agentsList.next(agents.filter(agent => agent));
      })
      .catch(error => {
        this.agentsListState.next(LoadingStates.LoadError);
      });
  }

  getAgent(id: AgentId): Observable<Agent> {
    if (!this.agentsInStore[id]) {
      this.fetchAgent(id);
    }
    return this.agentsInStore[id].asObservable();
  }

  getAgentState(id: AgentId): Observable<LoadingStates> {
    if (!this.agentsInStoreStates[id]) {
      this.fetchAgent(id);
    }
    return this.agentsInStoreStates[id].asObservable();
  }

  fetchAgent(id: AgentId): void {
    if (!this.agentsInStore[id]) {
      this.agentsInStoreStates[id] = new BehaviorSubject<LoadingStates>(
        LoadingStates.Loading
      );
      this.agentsInStoreStates[id].next(LoadingStates.Loading);
      this.agentsInStore[id] = new BehaviorSubject({} as Agent);
      this.agentsService
        .getAgent(id)
        .then((agent: Agent) => {
          console.log(agent);
          this.agentsInStoreStates[id].next(LoadingStates.LoadedSuccessfully);
          this.agentsInStore[id].next(agent);
        })
        .catch(error => {
          console.log(error);
          this.agentsInStoreStates[id].next(LoadingStates.LoadError);
        });
    }
  }

  searchAgentsListFunction(column: string, term: string) {
    if (!this.searchAgentsListState[column]) {
      this.searchAgentsListState[column] = new BehaviorSubject<LoadingStates>(
        LoadingStates.Inactive
      );
      this.searchAgentsList[column] = new BehaviorSubject({} as Agent[]);
    }
    this.searchAgentsListState[column].next(LoadingStates.Loading);
    this.agentsService
      .searchAgents(term)
      .then((result: Agent[]) => {
        this.searchAgentsList[column].next(result);
        this.searchAgentsListState[column].next(
          LoadingStates.LoadedSuccessfully
        );
      })
      .catch(error => {
        this.searchAgentsListState[column].next(LoadingStates.LoadError);
      });
  }

  getSearchAgentList(column: string): Observable<Agent[]> {
    if (!this.searchAgentsList[column]) {
      this.searchAgentsList[column] = new BehaviorSubject({} as Agent[]);
    }
    return this.searchAgentsList[column].asObservable();
  }

  getSearchAgentListState(column: string): Observable<LoadingStates> {
    if (!this.searchAgentsListState[column]) {
      this.searchAgentsListState[column] = new BehaviorSubject<LoadingStates>(
        LoadingStates.Inactive
      );
    }
    return this.searchAgentsListState[column].asObservable();
  }

  getAgentsList(): Observable<Agent[]> {
    return this.agentsList.asObservable();
  }

  getAgentsListState(): Observable<LoadingStates> {
    return this.agentsListState.asObservable();
  }
}
