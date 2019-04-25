export class Document {
  constructor(
    public id?: number,
    public fileName?: string,
    public fileBase64?: string,
    public fileType?: FileType,
    public title?: string,
    public version?: string

  ) {

    this.id = id;
    this.fileName = fileName;
    this.fileBase64 = fileBase64;
    this.fileType = fileType;
    this.title = title;
    this.version = version;
  }
}

export enum FileType {
  Image = 1,
  Audio = 2,
  Pdf = 3,
  TextFile = 4,
  Others = 5,
  pptx = 6
}
