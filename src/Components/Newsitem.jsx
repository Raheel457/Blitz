import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let {title , discription , imgUrl ,newsUrl ,date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={imgUrl ? imgUrl : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
                {discription}   
            </p>
            <p className="card-text"><small className="text-muted">Published on: {date.slice(0,10)}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
