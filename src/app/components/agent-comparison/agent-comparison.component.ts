import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  AgentsStoreService,
  LoadingStates
} from "src/app/services/agents-store.service";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Agent } from "src/app/interfaces/agent";
import { Task } from "src/app/interfaces/task";
import { AgentsService } from "src/app/services/agents.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "ai-agent-comparison",
  templateUrl: "./agent-comparison.component.html",
  styleUrls: ["./agent-comparison.component.scss"]
})
export class AgentComparisonComponent implements OnInit {
  agentOneSearchResult$: Observable<Agent[]>;
  agentTwoSearchResult$: Observable<Agent[]>;
  agentOneSearchResultLoadState$: Observable<LoadingStates>;
  agentTwoSearchResultLoadState$: Observable<LoadingStates>;

  agentOneSearch: FormControl;
  agentTwoSearch: FormControl;

  agentOne: Agent;
  agentTwo: Agent;

  constructor(
    private agentsStoreService: AgentsStoreService,
    private agentsService: AgentsService
  ) {}

  ngOnInit(): void {
    this.agentOneSearch = new FormControl();
    this.agentTwoSearch = new FormControl();

    this.agentOneSearchResult$ = this.agentsStoreService.getSearchAgentList(
      "agentOne"
    );
    this.agentTwoSearchResult$ = this.agentsStoreService.getSearchAgentList(
      "agentTwo"
    );
    this.agentOneSearchResultLoadState$ = this.agentsStoreService.getSearchAgentListState(
      "agentOne"
    );
    this.agentTwoSearchResultLoadState$ = this.agentsStoreService.getSearchAgentListState(
      "agentTwo"
    );
    this.agentOneSearch.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => {
        this.agentsStoreService.searchAgentsListFunction("agentOne", term);
      });
    this.agentTwoSearch.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => {
        this.agentsStoreService.searchAgentsListFunction("agentTwo", term);
      });
  }

  getCategories(tasks: Task[]) {
    return this.agentsService.caclulateCategories(tasks);
  }
}
