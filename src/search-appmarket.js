import React from 'react';
import { render } from 'react-dom';
import SearchField from './components/SearchField';
import SearchResults from './components/SearchResults';

class AppmarketSearch extends React.Component {
  constructor(props) {
    super(props);
    this.fieldContainer = document.querySelector(props.fieldContainer);
    this.resultContainer = document.querySelector(props.resultContainer);
    this.allApps = ecwidAppmarket || [];
    this.state = {
      query: '',
      appmarket: [],
      shown: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.renderChildren();
  }

  componentDidUpdate() {
    this.renderChildren();
  }

  /* eventHandlers */
  onChange(e) {
    this.setState({
      query: e.target.value,
      appmarket: this._filterApps(this._escapeRegExp(e.target.value)),
    });
    if (e.target.value !== '') {
      if (!this.state.shown) {
        this.setState({
          shown: true,
        });
        this._hideAppsBlocks();
      }
    } else {
      this.setState({
        shown: false,
      });
      this._showAppsBlocks();
    }
  }

  _hideAppsBlocks() {
    const mainContainer = document.querySelector('.appmarket .appmarket__main');
    [].slice.apply(mainContainer.children).forEach((i) => {
      if (i.id !== 'appmarket-search-result') {
        i.classList.add('appmarket--hidden');
      }
    });
  }

  _showAppsBlocks() {
    [].slice.apply(document.querySelectorAll('.appmarket__main .appmarket--hidden'))
      .forEach(i => i.classList.remove('appmarket--hidden'));
  }

  /* utils */
  _isContains(obj, key, val) {
    const pattern = new RegExp(val, 'i');
    if (key && obj.hasOwnProperty(key)) {
      return pattern.test(obj[key]);
    }
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (pattern.test(obj[i])) {
          return true;
        }
      }
    }
    return false;
  }

  _escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  _filterApps(value, key) {
    return this.allApps.filter(item => this._isContains(item, key || '', value));
  }

  renderChildren() {
    render(<SearchField onChange={this.onChange} query={this.state.query} />, this.fieldContainer);
    render(<SearchResults
      appmarket={this.state.appmarket}
      query={this.state.query}
      onBackClick={() => {
        this.setState({ query: '', appmarket: [] });
        this._showAppsBlocks();
      }}
    />, this.resultContainer);
  }

  render() {
    return null;
  }
}

const appmarket = document.querySelector('.appmarket');
if (appmarket) {
  const navigation = document.querySelector('.appmarket .appmarket__navigation');
  if (navigation) {
    let inputContainer = document.querySelector('.appmarket #appmarket-search-field');
    if (!inputContainer) {
    	inputContainer = document.createElement('div');
    	inputContainer.setAttribute('id', 'appmarket-search-field');
    }

    const mainContainer = document.querySelector('.appmarket .appmarket__main');
    if (mainContainer) {
      const resultContainer = document.createElement('div');
      resultContainer.setAttribute('id', 'appmarket-search-result');
      const amsContainer = document.createElement('div');
      amsContainer.setAttribute('id', 'appmarket-search');

      navigation.insertBefore(inputContainer, navigation.children[0]);
      mainContainer.insertBefore(resultContainer, mainContainer.children[0]);
      appmarket.appendChild(amsContainer);

      render(
        <AppmarketSearch
          fieldContainer="#appmarket-search-field"
          resultContainer="#appmarket-search-result"
        />,
        amsContainer);
    }
  }
}
