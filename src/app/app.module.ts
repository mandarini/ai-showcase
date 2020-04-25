import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { AgentDetailsComponent } from "./components/agent-details/agent-details.component";
import { AgentSummaryComponent } from "./components/home/agent-summary/agent-summary.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { AgentsApi } from "./api/fake_api_service";
import { TaskComponent } from "./components/agent-comparison/task/task.component";
import { TaskListComponent } from "./components/agent-details/task-list/task-list.component";
import { AgentComparisonComponent } from "./components/agent-comparison/agent-comparison.component";
import { DetailsComponent } from "./components/agent-details/details/details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgentDetailsComponent,
    AgentSummaryComponent,
    TaskComponent,
    TaskListComponent,
    AgentComparisonComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
  ],
  providers: [AgentsApi],
  bootstrap: [AppComponent],
})
export class AppModule {}
