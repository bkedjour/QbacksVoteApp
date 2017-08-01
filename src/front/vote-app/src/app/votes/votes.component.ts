import { Component, OnInit } from '@angular/core';
import { VotesService } from "../votes.service";

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  battle: Battle;
  isLoading: boolean = true;
  errorOccured: boolean = false;

  fighterOneVote: number;
  fighterTwoVote: number;

  constructor(private _votesService: VotesService) { }

  ngOnInit() {
    this._votesService.getBattle()
      .then(r => this.battle = r)
      .then(r => this.getVotes())
      .catch(e => this.handleErrors(e));
  }

  getVotes() {
    var fighterOne = this._votesService.getVote(this.battle.fighterOne);
    var fighterTwo = this._votesService.getVote(this.battle.fighterTwo);
    Promise.all([fighterOne, fighterTwo]).then(votes => {
      this.fighterOneVote = votes[0];
      this.fighterTwoVote = votes[1];
      this.isLoading = false;
    }).catch(e => this.handleErrors(e));
  }

  onVote(fighter: string) {
    this._votesService.addVote(fighter, 1)
      .then(r => this.getVotes())
      .catch(e => this.handleErrors(e));
  }

  private handleErrors(error: any) {
    this.errorOccured = true;
  }
}
