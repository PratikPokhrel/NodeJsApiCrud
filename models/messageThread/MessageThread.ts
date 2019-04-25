export class Thread {
  constructor(public userId?: string, public message?: string,
    public fullName?: string, public image_url?: string, public createdTime?: Date
   ) {
    this.userId = userId;
    this.message = message;
    this.fullName = fullName;
    this.image_url = image_url;
    this.createdTime = createdTime;
  }
}

export class MessageThread {
  constructor(public id?: string, public processId?: string, public thread?: Thread) {
    this.id = id; this.processId = processId; this.thread = thread; this.thread = new Thread();
  }
}
