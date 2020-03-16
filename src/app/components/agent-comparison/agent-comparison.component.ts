import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AgentsStoreService } from "src/app/services/agents-store.service";
import { Observable } from "rxjs";
import { Agent } from "src/app/interfaces/agent";

@Component({
  selector: "ai-agent-comparison",
  templateUrl: "./agent-comparison.component.html",
  styleUrls: ["./agent-comparison.component.scss"]
})
export class AgentComparisonComponent implements OnInit {
  agent1$: Observable<Agent>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private agentsStoreService: AgentsStoreService
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params);
    // this.agent1$ = this.agentsStoreService.getAgent(
    //   parseInt(this.activatedRoute.snapshot.params["id1"], 10)
    // );
  }
}
