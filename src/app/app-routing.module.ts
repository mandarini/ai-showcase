import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AgentDetailsComponent } from "./components/agent-details/agent-details.component";
import { AgentComparisonComponent } from "./components/agent-comparison/agent-comparison.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "agent/:id",
    component: AgentDetailsComponent
  },
  {
    path: "compare",
    component: AgentComparisonComponent
  },
  { path: "**", redirectTo: "home" },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
