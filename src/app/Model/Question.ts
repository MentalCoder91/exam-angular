import { options } from './Options';

export class Question {
  public qid: string;
  public qname: string;
  public options: options[] = [];
}
