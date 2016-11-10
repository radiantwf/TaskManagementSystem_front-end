import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from './../../model/task';

@Component({
    selector: 'element-record',
    templateUrl: './element-record.component.html',
    styleUrls: ['./element-record.component.css'],
    inputs: ['task', 'detailFlag'],
    outputs: ['detailClicked']

})
export class ElementRecordComponent implements OnInit {
    detailFlag: boolean;
    task: Task = new Task(null, null);
    detailClicked = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onDetailClicked(event) {
        this.detailClicked.emit(event);
    }
}
