import { Frame, Observable, ObservableArray } from '@nativescript/core';

var book;

export function onLoaded(args) {
  var page = args.object;
  var index = page.navigationContext.index;

  book = page.navigationContext.model;

  page.bindingContext = book.pages.getItem(index);

  if (book.maxPoints) {
    page.bindingContext.set('maxPoints', book.maxPoints);
  }

  if (book.score) {
    page.bindingContext.set('score', book.score);
  }
}

export function onTap(args) {
  let page = args.object;
  var info = page.bindingContext;

  if (info.score > info.maxPoints) {
    alert('Score cannot be greater than max points.');
    return;
  }

  console.log(`Date Assigned: ${info.dateAssigned}`);
  console.log(`Date Due: ${info.dateDue}`);
  console.log(`Max Points: ${info.maxPoints}`);
  console.log(`Score: ${info.score}`);

  Frame.topmost().navigate({
    moduleName: './detail/detail-page',
    context: { model: book },
  });
}

export function onDelete(args) {
  try {
    console.log('Delete button tapped');

    var page = args.object.page;

    if (!page.navigationContext) {
      console.log('Error: navigationContext is undefined');
      return;
    }

    var index = page.navigationContext.index;
    var students = page.navigationContext.model;

    if (!students || !students.pages) {
      console.log('Error: students or students.pages is undefined');
      return;
    }

    var result = confirm('Are you sure you want to delete this assessment?');

    if (result) {
      students.pages.splice(index, 1);
      console.log('Assessment deleted');
      frameModule.topmost().navigate({
        moduleName: 'detail-page',
        clearHistory: true,
      });
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

function onScroll(args) {
  const scrollView = args.object;
  var info = scrollView.bindingContext;

  console.log(`scrollX: ${args.scrollX}`);
  console.log(`scrollY: ${args.scrollY}`);
  console.log(`Max points Acquirable: ${info.maxPoints}`);
  console.log(`Score for student: ${info.score}`);
}

exports.onScroll = onScroll;
