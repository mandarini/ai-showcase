import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/interfaces/task";
import { AgentsService } from "src/app/services/agents.service";

@Component({
  selector: "ai-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"]
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[];
  public categories: {
    [key: string]: {
      totalScore: number;
      amountOfTasks: number;
      average: number;
      averageToString: string;
    };
  } = {};
  constructor(private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.categories = this.agentsService.caclulateCategories(this.tasks);
    console.log(this.categories);
  }
}
