import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-sampleform",
  templateUrl: "./sampleform.component.html",
  styleUrls: ["./sampleform.component.css"]
})
export class SampleformComponent implements OnInit {
  leagueForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  logToConsole(object: any) {
    console.log(object);
  }

  ngOnInit() {
    this.leagueForm = this.fb.group({
      league_details: this.fb.group({
        name: "",
        founder: ""
      }),
       teams: this.fb.array([])
    });

    this.addTeams()
  }

  get teams(): FormGroup {
    return this.fb.group({
      team_name: "",
      players: this.fb.array([this.players])
    });
  }

  get players(): FormGroup {
    return this.fb.group({
      player_name: "",
      player_number: ""
    });
  }

  addTeam() {

    (this.leagueForm.get("teams") as FormArray).push(this.teams);
    console.log(this.teams)
  }

  deleteTeam(index) {
    (this.leagueForm.get("teams") as FormArray).removeAt(index);
  }

  addPlayer(team) {
    team.get("players").push(this.players);

  }

  deletePlayer(team, index) {
    team.get("players").removeAt(index);
  }


  addTeams(){
    const teams = [{
      name : "brasil",
      players: this.fb.array([this.players])
    },
    {
      name : "Argentina",
      players: this.fb.array([this.players])
    },
    ]

    // console.log(this.leagueForm)

     const time = <FormArray>this.leagueForm.controls.teams
     for(let team of teams){
      time.push(this.fb.group({team_name:team.name,players:team.players}))
     }

     console.log(this.leagueForm)
  }



}