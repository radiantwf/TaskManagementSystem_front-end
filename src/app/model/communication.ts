export class Communication {
    id: string;
    personName: string;
    sentTime: Date;
    content: string;

    constructor(
        id: string,
        personName: string,
        sentTime: Date,
        content: string) {
        this.id = id;
        this.personName = personName;
        this.sentTime = sentTime;
        this.content = content;
    }
}
