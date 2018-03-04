import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  ref: AngularFireList<any>;
  questions: Observable<any>;

  constructor(public database: AngularFireDatabase) {
    this.ref = database.list('questions');
    this.questions = this.ref.snapshotChanges().map(cambios => {
      return cambios.map(change => {
        return {
          key: change.key,
          ...change.payload.val()
        };
      });
    });
  }

  getQuestions(): Observable<any> {
    return this.questions;
  }

  updateNivel(key: string, nuevoNivel: string) {
    this.ref.update(key, {nivel: nuevoNivel})
  }

  addQuestion(descripcionPregunta: string) {
    this.ref.push({description: descripcionPregunta, nivel: 'principiante'});
  }

}
