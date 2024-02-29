import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const { goto } = btn.dataset;
      handler(+goto);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevPage = this.#generateMarkupButton(curPage, 'prev');
    const nextPage = this.#generateMarkupButton(curPage, 'next');

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return nextPage;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return prevPage;
    }

    // Other page
    if (curPage < numPages) {
      return `
        ${prevPage}
        ${nextPage}
      `;
    }

    // No other page
    return '';
  }

  #generateMarkupButton(curPage, state) {
    const page = state === 'prev' ? curPage - 1 : curPage + 1;
    const nextState = state === 'prev' ? 'left' : 'right';
    return `
        <button data-goto="${page}" class="btn--inline pagination__btn--${state}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${nextState}"></use>
            </svg>
            <span>Page ${page}</span>
        </button>
        `;
  }
}

export default new PaginationView();
