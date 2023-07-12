import {HttpHeaders} from "@angular/common/http";

export class Request {
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'accept': 'application/json'
  });

  private initialBody = new URLSearchParams({
    'grant_type': '',
    'scope': '',
    'client_id': '',
    'client_secret': ''
  });

  addBodyParams(name : string, value : string){
    this.initialBody.append(name, value);
  }

  getBody(){
    return this.initialBody.toString();
  }

}
