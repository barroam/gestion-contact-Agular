export class Contact {
  constructor(
    public nom: string,
    public email: string,
    public telephone: string,
    public userId: string, 
    public imageUrl?: string,
    public status?: boolean
  ) {}
}


