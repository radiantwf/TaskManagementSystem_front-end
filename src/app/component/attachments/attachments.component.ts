import { Component, OnInit, Input } from '@angular/core';
import { AttachmentService } from './../../service/attachment.service';
import { Attachment } from '../../model/attachment';
import { AppGlobal } from '../../shared/app-global';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  private attachmentUrl = `${AppGlobal.getInstance().appURL}/attachment/file`;  // URL to web api

  constructor(private attachmentService: AttachmentService) { }
  list: Attachment[] = [];
  @Input() id: string;

  ngOnInit() {
    this.attachmentService.getAttachmentsById(this.id)
      .then(list => this.list = list);
  }

  uploadFile(event) {
    const file = event.srcElement.files[0];
    this.attachmentService.upload(this.id, file)
      .catch(() => alert('上传失败！'))
      .then(() => {
        alert('上传成功！');
        this.attachmentService.getAttachmentsById(this.id)
          .then(list => this.list = list);
      });
  }
  del(fileId) {
    this.attachmentService.delete(fileId)
      .catch(() => alert('删除文件失败'))
      .then(() => {
        this.attachmentService.getAttachmentsById(this.id)
          .then(list => this.list = list);
      });
  }
}
