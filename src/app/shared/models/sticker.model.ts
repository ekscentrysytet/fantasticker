export class Sticker {
  _id: string = Date.now().toString();
  _rev: string;
  title?: string = '';
  description?: string = '';
  stickerClass: String;
  position: {
    top: number,
    left: number
  } = {
    top: 0,
    left: 0
  };
}
