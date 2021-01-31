import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog, private trainingservice: TrainingService) { }

  ngOnInit(): void {
    const step = this.trainingservice.getRunningExercise().duration/100 *1000;
    this.timer = setInterval(()=>{
      this.progress = this.progress + 1;
      if (this.progress>=100){
        this.trainingservice.completeExercise();
        clearInterval(this.timer);
      }
    },step);
   
  }
  onStop(){
    clearInterval(this.timer);
     const dialogRef =  this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progress
    }
  });
  dialogRef.afterClosed().subscribe(result=>{
    if(result){
      this.trainingservice.cancelExercise(this.progress);
    }
  });
  }

}
