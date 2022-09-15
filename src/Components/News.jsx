import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e41981187a674b4db7c63346b5f40515&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  HandlePrevious = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=e41981187a674b4db7c63346b5f40515&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false,
    });
  };
  HandleNext = async () => {
    if (
      Math.ceil(this.state.totalResults / this.props.pageSize) >=
      this.state.page + 1
      ) {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${
          this.props.country
        }&category=${
          this.props.category
        }&apiKey=e41981187a674b4db7c63346b5f40515&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false,
      });
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Blitz Latest</h1>

        {this.state.loading && <Spinner />}

        {!this.state.loading && (
          <div className="row">
            {this.state.articles.map((article) => {
              return (
                <div className="col-lg-4 col-md-6" key={article.url}>
                  <Newsitem
                    title={
                      article.title &&
                      (article.title.length < 40
                        ? article.title
                        : article.title.slice(0, 40) + " ...")
                    }
                    discription={
                      article.description &&
                      article.description.slice(0, 80) + " ..."
                    }
                    imgUrl={article.urlToImage}
                    newsUrl={article.url}
                    date = {article.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        )}
        {!this.state.loading && (
          <div className="container d-flex justify-content-between my-4">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-secondary btn-lg"
              onClick={this.HandlePrevious}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                Math.ceil(this.state.totalResults / this.props.pageSize) <
                this.state.page + 1
              }
              className="btn btn-primary btn-lg"
              onClick={this.HandleNext}
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    );
  }
}

News.propTypes = {
  country: PropTypes.string,
  category:PropTypes.string,
  pageSize:PropTypes.number
};
News.defaultProps = {
  country: "us",
  category:"general",
  pageSize:6
};