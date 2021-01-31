import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription: Subscription;

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  

  constructor(private trainingservice: TrainingService) { }

  ngOnInit(): void {
    this.exChangedSubscription= this.trainingservice.finishedExercisesChanged.subscribe((exercises: Exercise[])=>{
      this.dataSource.data = exercises;

    })
      this.trainingservice.fetchCompletedOrCancelledExercises();
  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue:String){
     this.dataSource.filter = filterValue.trim().toLowerCase(); 
  }
ngOnDestroy(){
  this.exChangedSubscription.unsubscribe();
}
}
