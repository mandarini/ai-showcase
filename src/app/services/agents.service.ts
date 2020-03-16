import { Injectable } from "@angular/core";
import { AgentsApi } from "src/app/api/fake_api_service";
import { Agent, AgentId } from "../interfaces/agent";
import { Task } from "../interfaces/task";

@Injectable({
  providedIn: "root"
})
export class AgentsService {
  constructor(private agentsApi: AgentsApi) {}

  listAgents(): Promise<ReadonlyArray<Agent>> {
    return this.agentsApi.listAgents();
  }

  searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return this.agentsApi.searchAgents(nameSubstr);
  }

  getAgent(id: AgentId): Promise<Agent | undefined> {
    return this.agentsApi.getAgent(id);
  }

  caclulateCategories(
    tasks: Task[]
  ): {
    [key: string]: {
      totalScore: number;
      amountOfTasks: number;
      average: number;
      averageToString: string;
      tasks: string[];
    };
  } {
    const categories: {
      [key: string]: {
        totalScore: number;
        amountOfTasks: number;
        average: number;
        averageToString: string;
        tasks: string[];
      };
    } = {};
    tasks.forEach((task: Task) => {
      if (!categories[task.category]) {
        categories[task.category] = {
          totalScore: 0,
          amountOfTasks: 0,
          average: 0,
          averageToString: "",
          tasks: []
        };
      }
      categories[task.category].totalScore =
        categories[task.category].totalScore + task.score;
      categories[task.category].amountOfTasks =
        categories[task.category].amountOfTasks + 1;
      categories[task.category].average =
        categories[task.category].totalScore /
        categories[task.category].amountOfTasks;
      categories[task.category].averageToString = categories[
        task.category
      ].average.toFixed(2);
      categories[task.category].tasks.push(task.name);
    });
    return categories;
  }
}
