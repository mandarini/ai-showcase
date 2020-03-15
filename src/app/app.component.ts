import { Component, OnInit } from "@angular/core";
import { AgentsStoreService } from './services/agents-store.service';

@Component({
  selector: "ai-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private agentsStoreService: AgentsStoreService) {}
  ngOnInit() {
    this.agentsStoreService.fetchAgentsList();
  }
}
