export class Education {
    id: number;
    name: string;
  
    public constructor(init?:Partial<Education>) {
      Object.assign(this, init);
    }
  }
  