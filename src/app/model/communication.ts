export class Communication {
    id: string;
    personId: string;
    personName: string;
    sentTime: Date;
    content: string;

    constructor(
        id: string,
        personId: string,
        personName: string,
        sentTime: Date,
        content: string) {
        this.id = id;
        this.personId = personId;
        this.personName = personName;
        this.sentTime = sentTime;
        this.content = content;
    }
}
