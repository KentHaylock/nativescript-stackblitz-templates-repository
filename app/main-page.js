import { fromObject } from '@nativescript/core/data/observable';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { topmost } from '@nativescript/core/ui/frame';

function createStudent() {
  return fromObject({
    name: `Student ${this.students.length + 1}`,
    date: new Date(),
    assessmentType: 0,
    assessmentTypes: ['', 'Homework', 'Quiz', 'Test', 'Project', 'Presentation', 'Exam']
  });
}

function addStudent() {
  this.students.push(createStudent.call(this));
}

function onLoaded(args) {
  const page = args.object;
  this.students = new ObservableArray();
  this.addStudent();
  page.bindingContext = this;
}

function onNavigatingTo(args) {
  if (args.isBackNavigation) {
    return;
  }
  args.object.page.addCssFile('~/pages/mainpage.css');
}

function onItemTap(args) {
  const page = args.object.page;
  const students = page.bindingContext.students;
  const index = args.index;
  topmost().navigate({
    moduleName: 'detail/detail-page',
    context: { students, index }
  });
}

export { createStudent, addStudent, onLoaded, onNavigatingTo, onItemTap };
