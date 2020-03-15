import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Agent } from "src/app/interfaces/agent";
import {
  LoadingStates,
  AgentsStoreService
} from "src/app/services/agents-store.service";

@Component({
  selector: "ai-agent-details",
  templateUrl: "./agent-details.component.html",
  styleUrls: ["./agent-details.component.scss"]
})
export class AgentDetailsComponent implements OnInit {
  agent$: Observable<Agent>;
  agentLoadState$: Observable<LoadingStates>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private agentsStoreService: AgentsStoreService
  ) {}

  ngOnInit(): void {
    this.agent$ = this.agentsStoreService.getAgent(
      this.activatedRoute.snapshot.params["id"]
    );
    this.agentLoadState$ = this.agentsStoreService.getAgentState();
  }
}
