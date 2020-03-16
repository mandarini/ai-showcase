import { Component, Input } from "@angular/core";

@Component({
  selector: "ai-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent {
  @Input() category: {
    totalScore: number;
    amountOfTasks: number;
    average: number;
    averageToString: string;
  };
  @Input() smaller: boolean;
}
