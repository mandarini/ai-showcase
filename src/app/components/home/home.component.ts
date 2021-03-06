import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Agent } from "src/app/interfaces/agent";
import {
  AgentsStoreService,
  LoadingStates
} from "src/app/services/agents-store.service";

@Component({
  selector: "ai-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  agentList$: Observable<Agent[]>;
  agentListState$: Observable<LoadingStates>;
  constructor(private agentsStoreService: AgentsStoreService) {}

  ngOnInit(): void {
    this.agentList$ = this.agentsStoreService.getAgentsList();
    this.agentListState$ = this.agentsStoreService.getAgentsListState();
  }
}
