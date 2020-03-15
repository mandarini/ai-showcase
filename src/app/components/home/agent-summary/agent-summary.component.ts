import { Component, Input } from "@angular/core";
import { Agent } from "src/app/interfaces/agent";

@Component({
  selector: "ai-agent-summary",
  templateUrl: "./agent-summary.component.html",
  styleUrls: ["./agent-summary.component.scss"]
})
export class AgentSummaryComponent {
  @Input() agent: Agent;
}
