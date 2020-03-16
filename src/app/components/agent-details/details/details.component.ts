import { Component, OnInit, Input } from "@angular/core";
import { Agent } from "src/app/interfaces/agent";

@Component({
  selector: "ai-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  @Input() agent: Agent;
  constructor() {}

  ngOnInit(): void {}
}
