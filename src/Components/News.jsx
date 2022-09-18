import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - Blitz`;
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  async componentDidMount() {
    this.props.setProgress(20);
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e41981187a674b4db7c63346b5f40515&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  
  fetchMoreData = async () => {
    await this.setState({
      page: this.state.page + 1,
      loading: true,
    });
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=e41981187a674b4db7c63346b5f40515&pageSize=${
      this.props.pageSize
    }&page=${this.state.page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{marginTop:80}} >
          Latest from {this.capitalizeFirstLetter(this.props.category)}
        </h1>

        {
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={
              <h4>
                <Spinner />
              </h4>
            }
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((article) => {
                  return (
                    <div className="col-lg-4 col-md-6 my-2" key={article.url}>
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
                        date={article.publishedAt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        }
      </>
    );
  }
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};
News.defaultProps = {
  country: "us",
  category: "general",
  pageSize: 6,
};
