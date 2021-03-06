import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms'

import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  
  exercises: Exercise[];
  exerciseSubscription : Subscription;
  constructor(private trainingservice: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription= this.trainingservice.exercisesChanged.subscribe(
      exercises=>(this.exercises= exercises));
    this.trainingservice.fetchAvailableExercises();
  }
    
  
    
  onStartTraining(form: NgForm){
  this.trainingservice.startExercise(form.value.exercise);
  }
ngOnDestroy(){
  this.exerciseSubscription.unsubscribe();
}
}
