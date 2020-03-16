import { Component, OnInit, Input } from "@angular/core";
import { Task } from "src/app/interfaces/task";

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
  constructor() {}

  ngOnInit(): void {
    console.log("hello", this.tasks);
    this.tasks.forEach((task: Task) => {
      if (!this.categories[task.category]) {
        this.categories[task.category] = {
          totalScore: 0,
          amountOfTasks: 0,
          average: 0,
          averageToString: ""
        };
      }
      console.log(task.category, ": ", this.categories[task.category]);
      this.categories[task.category].totalScore =
        this.categories[task.category].totalScore + task.score;
      this.categories[task.category].amountOfTasks =
        this.categories[task.category].amountOfTasks + 1;
      this.categories[task.category].average =
        this.categories[task.category].totalScore /
        this.categories[task.category].amountOfTasks;
      this.categories[task.category].averageToString = this.categories[
        task.category
      ].average.toFixed(2);
    });
    console.log("result", this.categories);
  }
}
