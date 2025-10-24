
export class Task {
     constructor(
          readonly title: string,
          readonly text: string,
          readonly isCompleted: boolean,
          readonly owner?: string,
          readonly id?: string
     ) {
     }
}