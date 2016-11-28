import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from './../../model/task';

@Component({
    selector: 'element-task',
    templateUrl: './element-task.component.html',
    styleUrls: ['./element-task.component.css']

})
export class ElementTaskComponent implements OnInit {
    @Input() detailFlag: boolean;
    @Input() task: Task = new Task(null, null);
    @Output() detailClicked = new EventEmitter();

    constructor(private router: Router, private route: ActivatedRoute
    ) { }

    ngOnInit() {
    }

    onDetailClicked(event) {
        this.detailClicked.emit(event);
    }
}
