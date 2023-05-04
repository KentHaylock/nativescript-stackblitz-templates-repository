import {
  ObservableArray,
  fromObject,
  Observable,
  Frame,
  confirm,
} from '@nativescript/core';

/* defining a constructor function */
function studentModel() {
  var model = new Observable();
  model.majors = [
    'homework',
    'quiz',
    'test',
    'project',
    'presentation',
    'exam',
  ];

  return model;
}

export function onLoaded(args) {
  var page = args.object;

  // Create a new object from the Observable constructor
  var studentList = new Observable({
    pages: new ObservableArray([new studentModel()]),
  });

  // If there is a navigation context, set the binding context to that
  if (page.navigationContext != null) {
    studentList = page.navigationContext.model;
  }

  page.bindingContext = studentList;
}

export function onItemTap(args) {
  var page = args.object;
  var students = page.bindingContext;

  // Navigate to the assessment detail page and pass the student model and the index of the selected item
  Frame.topmost().navigate({
    moduleName: './assesment_details/assesment-detail-page',
    context: { model: students, index: args.index },
  });
}

export function onAdd(args) {
  var page = args.object;
  var students = page.bindingContext;

  // Push a new student model to the pages array and navigate to the assessment detail page with the new index
  students.pages.push(new studentModel());
  var newIndex = students.pages.length - 1;
  Frame.topmost().navigate({
    moduleName: './assesment_details/assesment-detail-page',
    context: { model: students, index: newIndex },
  });
}

export function Goback(args) {
  var page = args.object;
  var students = page.bindingContext;

  // Navigate back to the main page and pass the student model and the index of the last item in the pages array
  var lastIndex = students.pages.length - 1;
  Frame.topmost().navigate({
    moduleName: 'main-page',
    context: {
      model: students,
      index: lastIndex,
    },
  });
}