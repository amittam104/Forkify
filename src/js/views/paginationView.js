import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const btnGoto = +btn.dataset.goto;
      handler(btnGoto);
    });
  }

  _generateMarkup() {
    const data = this._data;
    const numPages = Math.ceil(data.results.length / data.resultPage);
    let currPage = this._data.page;
    // console.log(numPages, currPage);

    // 1. Current Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) return this._forwardBtnMarkup();

    // 2. On other pages
    if (currPage > 1 && currPage < numPages) return this._bothBtnMarkup();

    // 3. On last page and earlier pages are there
    if (currPage === numPages && numPages > 1) return this._backwardBtnMarkup();

    // 4. Only 1 Page
    return '';
  }

  _backwardBtnMarkup() {
    return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.page - 1}</span>
        </button>  
      `;
  }

  _forwardBtnMarkup() {
    return `
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _bothBtnMarkup() {
    return `
      <button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      <button data-goto="${
        this._data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();
