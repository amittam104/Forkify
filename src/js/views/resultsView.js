import View from './View.js';
import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `Could not find the recipes you searched for. Please try again!`;
  _message = ``;

  _generateMarkup() {
    return this._data
      .map(results => PreviewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
